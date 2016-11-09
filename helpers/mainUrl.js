const url = require('url');

module.exports = function (urlString) {
  const parsedUrl = url.parse(urlString);

  return parsedUrl.hostname;
}
