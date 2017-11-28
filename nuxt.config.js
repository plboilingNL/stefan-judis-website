const {getConfigForKeys} = require('./lib/config.js')
const ctfConfig = getConfigForKeys([
  'CTF_SPACE_ID',
  'CTF_CDA_TOKEN',
  'CTF_CPA_TOKEN',
  'CTF_CMA_TOKEN',
  'CTF_ME_ID',
  'CTF_POST_ID',
  'CTF_TALK_ID',
  'CTF_PROJECT_ID',
  'CTF_EVENT_ID',
  'CTF_TIL_ID',
  'CTF_LANDING_PAGE_ID'
])

const {createClient} = require('./plugins/contentful')
const cdaClient = createClient(ctfConfig)
const cmaContentful = require('contentful-management')
const cmaClient = cmaContentful.createClient({
  accessToken: ctfConfig.CTF_CMA_TOKEN
})

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
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { name: 'theme-color', content: '#fefff4' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: 'https://cdn.contentful.com' },
      { rel: 'dns-prefetch', href: 'https://videos.contentful.com' },
      { rel: 'dns-prefetch', href: 'https://images.contentful.com' },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
      { rel: 'alternate', type: 'application/rss+xml', title: 'Stefan Judis Web Development (everything)', href: 'https://www.stefanjudis.com/rss.xml' },
      { rel: 'alternate', type: 'application/rss+xml', title: 'Stefan Judis Web Development (only blog posts)', href: 'https://www.stefanjudis.com/blog.xml' },
      { rel: 'alternate', type: 'application/rss+xml', title: 'Stefan Judis Web Development (only TIL)', href: 'https://www.stefanjudis.com/til.xml' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fefff4' },

  /*
  ** Router configuration
  */
  router: {
    linkActiveClass: 'is-almost-active',
    linkExactActiveClass: 'is-active'
  },

  transition: {
    afterEnter (el) {
      const h1 = el.querySelector('h1')

      if (!h1) {
        return console.error('No h1 on', el)
      }

      h1.focus()
    }
  },

  /*
  ** Plugin configuration
  */
  plugins: [
    '~plugins/filters.js',
    '~plugins/transition.js'
  ],

  /*
  ** Nuxt modules
  */
  modules: [
    '@nuxtjs/sitemap',
    ['@nuxtjs/pwa', {
      manifest: {
        name: 'Stefan Judis Web Development',
        lang: 'en',
        short_name: 'SJ Web Dev'
      }
    }],
    ['@nuxtjs/google-analytics', { ua: 'UA-104150131-1' }]
  ],

  /*
  ** Build configuration
  */
  build: {
    analyze: false,

    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.module.rules.forEach(rule => {
        // overwrite nuxt defaults
        // they inline svg's base64
        if (rule.loader === 'url-loader') {
          rule.test = /\.(png|jpe?g|gif)$/
        }

        // get CSS out of the JS
        if (rule.loader === 'vue-loader') {
          rule.options.extractCSS = true
        }
      })

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      })
    },

    postcss: [
      require('autoprefixer')({
        browsers: ['> 5%']
      })
    ],

    vendor: ['wicg-focus-ring']
  },

  // related to
  // '@nuxtjs/sitemap'
  sitemap: {
    generate: true,
    hostname: 'https://www.stefanjudis.com',
    routes: getAllRoutes,
    exclude: ['/404']
  },

  generate: {
    routes: getAllRoutes
  },

  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_TOKEN: ctfConfig.CTF_CDA_TOKEN,
    CTF_CPA_TOKEN: ctfConfig.CTF_CPA_TOKEN,
    CTF_PERSON_ID: ctfConfig.CTF_PERSON_ID,
    CTF_ME_ID: ctfConfig.CTF_ME_ID,
    CTF_POST_ID: ctfConfig.CTF_POST_ID,
    CTF_TALK_ID: ctfConfig.CTF_TALK_ID,
    CTF_PROJECT_ID: ctfConfig.CTF_PROJECT_ID,
    CTF_EVENT_ID: ctfConfig.CTF_EVENT_ID,
    CTF_TIL_ID: ctfConfig.CTF_TIL_ID,
    CTF_LANDING_PAGE_ID: ctfConfig.CTF_LANDING_PAGE_ID
  }
}

function getAllRoutes () {
  return Promise.all([
    cdaClient.getEntries({
      content_type: '2wKn6yEnZewu2SCCkus4as',
      order: '-fields.date'
    }),
    cdaClient.getEntries({
      content_type: 'tilPost',
      order: '-fields.date'
    }),
    cmaClient
      .getSpace(ctfConfig.CTF_SPACE_ID)
      .then(space => space.getContentType('2wKn6yEnZewu2SCCkus4as'))
  ]).then(([blogPosts, tilPosts, postType]) => {
    const postPages = blogPosts.items.reduce((pages, entry, index) => {
      // the external posts don't need do be rendered
      if (!entry.fields.externalUrl) {
        pages.push(`/blog/${entry.fields.slug}`)
      }

      if (index % 5 === 0 && index !== 0) {
        pages.push(`/blog/page/${Math.floor(index / 5)}`)
      }

      return pages
    }, [])

    const tilPages = tilPosts.items.reduce((pages, entry, index) => {
      pages.push(`/today-i-learned/${entry.fields.slug}`)

      if (index % 5 === 0 && index !== 0) {
        pages.push(`/today-i-learned/page/${Math.floor(index / 5)}`)
      }

      return pages
    }, [])

    const tags = postType.fields
      .find(field => field.id === 'tags')
      .items.validations[0].in.map(category => `/blog/tag/${category}`)

    return [...postPages, ...tilPages, ...tags, '/i-would-love-to-speak', '/staying-up-to-date', '404']
  })
}

if (process.env.NODE_ENV !== 'production') {
  config.css = [{ src: '~/node_modules/a11y.css/css/a11y-en.css' }]
}

module.exports = config
