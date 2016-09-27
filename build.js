const glob = require('glob')
const path = require('path')
const Metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')
const assets = require('metalsmith-assets')
const sass = require('metalsmith-sass')
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
const spaceId = process.env.SPACE_ID
const token = process.env.TOKEN
const destination = process.env.DESTINATION || 'build'

if ( ! spaceId && ! token ) {
  throw new Error(`
    Please define space id and access token via environment variables:

    SPACE_ID=YOUR_ID TOKEN=YOUR_ACCESS_TOKEN npm start
  `)
}

// 'f20lfrunubsq'
// '0f72dc3f46a2fd76a80145a476ef0f9daf5adce19462787499c1b0f4f2d1c98e'

Metalsmith(__dirname)
  .source('src')
  .destination(path.resolve(destination))
  .use(contentful({
    space_id: spaceId,
    access_token: token,
    common: {
      me: {
        filter: {
          'sys.id': '5JQ715oDQW68k8EiEuKOk8'
        }
      },

      recent_posts: {
        content_type: '2wKn6yEnZewu2SCCkus4as',
        order: 'sys.createdAt'
      },

      recent_talks: {
        content_type: 'talk',
        order: '-fields.date'
      }
    }
  }))
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
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
