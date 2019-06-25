const fetch = require('isomorphic-unfetch');
let resolveResponse = require('contentful-resolve-response');

// there's something wrong with the package :/ ... investigating...
if (process.browser) {
  resolveResponse = resolveResponse.default;
}

const normalizeEntry = entry => {
  return typeof entry === 'object'
    ? Object.entries(entry.fields).reduce(
        (acc, [key, value]) => {
          if (value.map) {
            acc[key] = value.map(normalizeEntry);
          } else if (!!value.sys) {
            acc[key] = normalizeEntry(value);
          } else {
            acc[key] = value;
          }

          return acc;
        },
        {
          _id: entry.sys.id,
          ...(entry.sys.contentType
            ? { _ctId: entry.sys.contentType.sys.id }
            : {}),
          _updatedAt: entry.sys.updatedAt,
          _revision: entry.sys.revision
        }
      )
    : entry;
};

const myFetch = async (url, query) => {
  return resolveResponse(await fetch(url).then(res => res.json())).map(
    normalizeEntry
  );
};

export default ({ app, env, store }) => {
  const space = env.CTF_SPACE_ID;

  let host = 'preview.contentful.com';
  let accessToken = env.CTF_CPA_TOKEN;
  let environment = env.CTF_ENVIRONMENT_ID || 'master';

  if (env.IS_PRODUCTION) {
    host = 'cdn.contentful.com';
    accessToken = env.CTF_CDA_TOKEN;
    environment = 'master';
  }

  const getEntries = query => {
    return myFetch(
      `https://${host}/spaces/${space}/environments/${environment}/entries?${query}&access_token=${accessToken}`
    );
  };

  const {
    events,
    me,
    landingpages,
    posts,
    projects,
    resources,
    screencasts,
    talks,
    til
  } = store.state;

  app.contentful = {
    async getMe() {
      if (!me.entry._id) {
        return getEntries(`sys.id=${env.CTF_ME_ID}`)
          .then(items => {
            store.commit('me/setMe', items[0]);
            return items[0];
          })
          .catch(err => console.log(err));
      }

      return me.entry;
    },

    async getFutureEvents() {
      if (!events.futureList.length) {
        return getEntries(
          `content_type=${
            env.CTF_EVENT_ID
          }&order=fields.start&fields.state[in]=attending,accepted,teaching&fields.end[gte]=${new Date(
            +new Date() - 1000 * 60 * 60 * 24
          ).toISOString()}`
        )
          .then(items => {
            store.commit('events/setFutureList', items);
            return items;
          })
          .catch(err => console.log(err));
      }

      return events.futureList;
    },

    async getPastEvents() {
      if (!events.pastList.length) {
        return getEntries(
          `content_type=${
            env.CTF_EVENT_ID
          }&order=-fields.end&fields.state[in]=attending,accepted,teaching&fields.end[lte]=${new Date().toISOString()}&fields.state=accepted`
        )
          .then(items => {
            store.commit('events/setPastList', items);
            return items;
          })
          .catch(err => console.log(err));
      }

      return events.pastList;
    },

    async getLandingpages() {
      if (!landingpages.list.length) {
        return getEntries(`content_type=${env.CTF_LANDING_PAGE_ID}`)
          .then(items => {
            store.commit('landingpages/setList', items);
            return items;
          })
          .catch(err => console.log(err));
      }

      return landingpages.list;
    },

    async getPost(slug) {
      const post = posts.list.find(post => post.slug === slug && post.body);

      if (!post) {
        return getEntries(`content_type=${env.CTF_POST_ID}&fields.slug=${slug}`)
          .then(items => {
            store.commit('posts/setItem', items[0]);
            store.commit('posts/setActiveWithSlug', slug);
            return items;
          })
          .catch(err => console.log(err));
      }

      return posts.list;
    },

    async getPosts() {
      if (!posts.fullyLoaded) {
        return getEntries(
          `content_type=${
            env.CTF_POST_ID
          }&order=-fields.date&select=fields.date,fields.slug,fields.title,fields.excerpt,fields.topics,sys`
        )
          .then(items => {
            store.commit('posts/setList', items);
            store.commit('posts/setFullyLoaded', true);
            return items;
          })
          .catch(err => console.log(err));
      }

      return posts.list;
    },

    async getProjects() {
      if (!projects.list.length) {
        return getEntries(
          `content_type=${
            env.CTF_PROJECT_ID
          }&select=fields.title,fields.description,fields.topics,fields.url,sys`
        )
          .then(items => {
            store.commit('projects/setList', items);
            // store.commit('posts/setAllFetched', true);
            return items;
          })
          .catch(err => console.log(err));
      }

      return posts.list;
    },

    async getResources() {
      if (!resources.list.length) {
        return getEntries(
          `content_type=${
            env.CTF_LANDING_PAGE_ID
          }&fields.isResource=true&order=fields.title`
        )
          .then(items => {
            store.commit('resources/setList', items);
            return items;
          })
          .catch(err => console.log(err));
      }

      return resources.list;
    },

    async getScreencasts() {
      if (!screencasts.list.length) {
        return getEntries(
          `content_type=${env.CTF_SCREENCAST_ID}&order=-fields.publishDate`
        )
          .then(items => {
            store.commit('screencasts/setList', items);
            return items;
          })
          .catch(err => console.log(err));
      }

      return screencasts.list;
    },

    async getTalks() {
      if (!talks.list.length) {
        return getEntries(`content_type=${env.CTF_TALK_ID}&order=-fields.date`)
          .then(items => {
            store.commit('talks/setList', items);
            return items;
          })
          .catch(err => console.log(err));
      }

      return talks.list;
    },

    async getTil() {
      if (!til.list.length) {
        return getEntries(`content_type=${env.CTF_TIL_ID}&order=-fields.date`)
          .then(items => {
            store.commit('til/setList', items);
            return items;
          })
          .catch(err => console.log(err));
      }

      return til.list;
    }
  };
};
