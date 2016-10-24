const glob = require('glob')
const path = require('path')
const Metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')
const assets = require('metalsmith-assets')
const sass = require('metalsmith-sass')
const replace = require('metalsmith-text-replace')
const contentful = require('contentful-metalsmith')
const handlebars = require('handlebars')

// add custom helpers to handlebars
// https://github.com/superwolff/metalsmith-layouts/issues/63
//
// using the global handlebars instance
glob.sync('helpers/*.js').forEach((fileName) => {
  const helper = fileName.split('/').pop().replace('.js', '')

  handlebars.registerHelper(
    helper,
    require(`./${fileName}`)
  )
})

// Environment variable handling
const config = require('./config.json')
const mode = process.env.MODE || 'DELIVERY'

if ( ! config[mode].SPACE_ID && ! config[mode].TOKEN ) {
  throw new Error(`
    Please define SPACE_ID and TOKEN in your config.json
  `)
}

Metalsmith(__dirname)
  .source('src')
  .destination(path.resolve(config[mode].DESTINATION))
  .use(contentful({
    space_id: config[mode].SPACE_ID,
    access_token: config[mode].TOKEN,
    host: mode === 'PREVIEW' ? 'preview.contentful.com' : 'cdn.contentful.com',
    common: {
      me: {
        filter: {
          'sys.id': '5JQ715oDQW68k8EiEuKOk8'
        }
      },

      recent_posts: {
        content_type: '2wKn6yEnZewu2SCCkus4as',
        order: '-fields.date'
      },

      recent_talks: {
        content_type: 'talk',
        order: '-fields.date'
      },

      recent_projects: {
        content_type: 'project'
      }
    }
  }))
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
  }))
  .use(replace({
    '**/*.html': {
      find: '__DISCUSS_URL__',
      replace: config.DISCUSS.URL
    }
  }))
  .use(assets({
    source: 'assets/',
    destination: 'assets/'
  }))
  .use(sass({
    outputStyle: 'compressed'
  }))
  .build(function (err) {
    if (err) throw err

    console.log('Successfully build metalsmith')
  })
