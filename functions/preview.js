exports.handler = (event, context, callback) => {
  const { Nuxt, Builder } = require('nuxt-edge');

  const config = require('../nuxt.config.js');
  config.dev = false;

  const nuxt = new Nuxt(config);

  new Builder(nuxt)
    .build()
    .then(() => nuxt.renderRoute(event.queryStringParameters.path))
    .then(({ html, error, redirected }) => {
      callback(null, {
        statusCode: 400,
        body: html
      });
    });
};
