const path = require('path');
const isNetlify = _ => !!process.env.DEPLOY_URL;

module.exports = {
  isCodeUpdate: process.env.WEBHOOK_TITLE === 'CODE_UPDATE',
  // DO YOU NEED THIS? IT'S CURRENTLY NOT USED!
  isContentUpdate: process.env.WEBHOOK_TITLE === 'CONTENTFUL_UPDATE',
  getCachePath: name =>
    isNetlify()
      ? path.join('/', 'opt', 'build', 'cache', 'dist', name)
      : path.resolve(__dirname, '..', '..', `.${name}`),
  shouldClearCache: process.env.WEBHOOK_TITLE === 'CLEAR_CUSTOM_CACHE'
};
