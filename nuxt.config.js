const cdaContentful = require('contentful');
const { getConfig } = require('./lib/config.js');
const ctfConfig = getConfig();
const cdaClient = cdaContentful.createClient({
  accessToken: ctfConfig.CTF_CDA_TOKEN,
  host: 'cdn.contentful.com',
  space: ctfConfig.CTF_SPACE_ID
});

const config = {
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Stefan Judis Web Development',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#fefff4' },
      {
        property: 'og:image',
        content: 'https://www.stefanjudis.com/og-card-logo.jpg'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://cdn.contentful.com' },
      { rel: 'preconnect', href: 'https://videos.contentful.com' },
      { rel: 'preconnect', href: 'https://images.contentful.com' },
      { rel: 'preconnect', href: 'https://www.google-analytics.com' },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Stefan Judis Web Development (everything)',
        href: 'https://www.stefanjudis.com/rss.xml'
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Stefan Judis Web Development (only blog posts)',
        href: 'https://www.stefanjudis.com/blog.xml'
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Stefan Judis Web Development (only TIL)',
        href: 'https://www.stefanjudis.com/til.xml'
      }
    ],
    script: [{ src: 'https://just-comments.com/auth.js', defer: '' }]
  },

  /*
   ** Custom heart loader
   */
  loading: '~/components/Loading.vue',

  svgSprite: {
    input: '~/assets/icons/',
    output: '~/assets/'
  },

  /*
   ** Router configuration
   */
  router: {
    linkActiveClass: 'is-almost-active',
    linkExactActiveClass: 'is-active'
  },

  transition: {
    afterEnter(el) {
      const h1 = el.querySelector('h1');

      if (!h1) {
        return console.error('No h1 on', el);
      }

      h1.focus();
    }
  },

  /*
   ** Plugin configuration
   */
  plugins: [
    '~plugins/contentful.js',
    '~plugins/filters.js',
    '~plugins/transition.js'
  ],

  modern: 'client',

  /*
   ** Nuxt modules
   */
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/svg-sprite',
    [
      '@nuxtjs/pwa',
      {
        manifest: {
          name: 'Stefan Judis Web Development',
          lang: 'en',
          short_name: 'SJ Web Dev',
          theme_color: '#fefff4'
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: 'https://cdn.contentful.com/.*'
            }
          ]
        }
      }
    ],
    [
      '@nuxtjs/google-analytics',
      {
        ua: 'UA-104150131-1'
      }
    ]
  ],

  /*
   ** Build configuration
   */
  build: {
    analyze: false,

    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-nested': {},
        autoprefixer: {
          browsers: ['> 5%']
        }
      }
    },

    // https://github.com/nuxt-community/svg-sprite-module/issues/8
    extend(config) {
      const urlLoader = config.module.rules.find(rule =>
        String(rule.test).includes('svg')
      );
      urlLoader.test = /\.(png|jpe?g|gif)$/;
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 12
            }
          }
        ]
      });
    }
  },

  // related to
  // '@nuxtjs/sitemap'
  sitemap: {
    generate: true,
    hostname: 'https://www.stefanjudis.com',
    routes: async () => {
      return await getAllRoutes().then(routes =>
        routes.filter(({ noIndex }) => !noIndex).map(({ path }) => path)
      );
    },
    exclude: ['/404']
  },

  generate: {
    routes: async () => {
      return await getAllRoutes().then(routes =>
        routes.map(({ path }) => path)
      );
    }
  },

  env: {
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    ...ctfConfig
  }
};

function getAllRoutes() {
  return Promise.all([
    cdaClient.getEntries({
      content_type: '2wKn6yEnZewu2SCCkus4as',
      order: '-fields.date'
    }),
    cdaClient.getEntries({
      content_type: 'tilPost',
      order: '-fields.date'
    }),
    cdaClient.getEntries({
      content_type: 'landingPage'
    }),
    cdaClient.getEntries({
      content_type: 'topic'
    })
  ]).then(([blogPosts, tilPosts, landingPages, topics]) => {
    const postPages = blogPosts.items.reduce((pages, entry, index) => {
      pages.push({
        path: `/blog/${entry.fields.slug}`,
        noIndex: !!entry.fields.externalUrl
      });

      if (index % 5 === 0 && index !== 0) {
        pages.push({ path: `/blog/page/${Math.floor(index / 5) + 1}` });
      }

      return pages;
    }, []);

    const tilPages = tilPosts.items.map(item => ({
      path: `/today-i-learned/${item.fields.slug}`
    }));

    const landingPageSlugs = landingPages.items.map(item => ({
      path: `/${item.fields.slug}`
    }));

    const topicSlugs = topics.items
      .filter(item => item.fields.title !== 'Newsletter')
      .map(item => ({ path: `/topics/${item.fields.slug}` }));

    return [...postPages, ...tilPages, ...landingPageSlugs, ...topicSlugs];
  });
}

module.exports = config;
