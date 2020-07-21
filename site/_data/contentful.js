const { client } = require('../../lib/contentful');

const {
  CTF_POST_ID,
  CTF_TIL_ID,
  CTF_PROJECT_ID,
  CTF_SCREENCAST_ID,
  CTF_TALK_ID,
  CTF_LANDING_PAGE_ID,
  CTF_SHELL_COMMAND_ID,
  CTF_ME_ID,
  CTF_NOTE_ID,
  CTF_TOPIC_ID,
  CTF_NEWSLETTER_ID,
} = process.env;

const isNotNewsletter = (entry) => entry.sys.id !== CTF_NEWSLETTER_ID;
const sortByDate = (a, b) =>
  new Date(a.fields.date) > new Date(b.fields.date) ? -1 : 1;

module.exports = async function () {
  const [
    posts,
    tilPosts,
    projects,
    screencasts,
    talks,
    resources,
    shellCommands,
    me,
    notes,
    topics,
  ] = await Promise.all([
    client.getEntries({
      content_type: CTF_POST_ID,
      limit: 1000,
      order: '-fields.date',
    }),
    client.getEntries({
      content_type: CTF_TIL_ID,
      limit: 1000,
      order: '-fields.date',
    }),
    client.getEntries({
      content_type: CTF_PROJECT_ID,
      limit: 1000,
    }),
    client.getEntries({
      content_type: CTF_SCREENCAST_ID,
      limit: 1000,
      order: '-fields.date',
    }),
    client.getEntries({
      content_type: CTF_TALK_ID,
      limit: 1000,
      order: '-fields.date',
    }),
    client.getEntries({
      content_type: CTF_LANDING_PAGE_ID,
      limit: 1000,
      order: 'fields.title',
    }),
    client.getEntries({
      content_type: CTF_SHELL_COMMAND_ID,
      limit: 1000,
      order: '-fields.date',
    }),
    client.getEntries({
      'sys.id': CTF_ME_ID,
      limit: 1000,
    }),
    client.getEntries({
      content_type: CTF_NOTE_ID,
      limit: 1000,
    }),
    client.getEntries({
      content_type: CTF_TOPIC_ID,
      limit: 1000,
      order: 'fields.title',
    }),
  ]);

  // TODO do this for all calls
  if (posts.total > posts.limit) {
    throw new Errors(
      "After several years it's time for paginating contentful calls"
    );
  }

  const allEntriesGroupedByTopic = (
    await Promise.all(
      topics.items.map((topic) =>
        client.getEntries({
          links_to_entry: topic.sys.id,
          limit: 1000,
        })
      )
    )
  ).reduce((acc, cur, index) => {
    acc[topics.items[index].fields.slug] = cur.items.sort(sortByDate);
    return acc;
  }, {});

  return {
    articles: [
      ...posts.items,
      ...tilPosts.items,
      ...notes.items,
      ...shellCommands.items,
    ].sort(sortByDate),
    posts: posts.items,
    tilPosts: tilPosts.items,
    projects: projects.items,
    screencasts: screencasts.items,
    talks: talks.items,
    resources: resources.items,
    shellCommands: shellCommands.items,
    me: me.items[0],
    notes: notes.items,
    topics: topics.items.filter(isNotNewsletter),
    allEntriesGroupedByTopic,
  };
};
