const path = require('path');
const isNetlify = _ => !!process.env.DEPLOY_URL;

module.exports = {
  isCodeUpdate: process.env.WEBHOOK_TITLE === 'CODE_UPDATE',
  isContentUpdate: process.env.WEBHOOK_TITLE === 'CONTENT_UPDATE',
  getCachePath: name =>
    isNetlify()
      ? path.join('/', 'opt', 'build', 'cache', 'dist')
      : path.resolve(__dirname, '..', '..', `.${name}`),
  shouldClearCache: process.env.WEBHOOK_TITLE === 'CLEAR_CUSTOM_CACHE'
};
