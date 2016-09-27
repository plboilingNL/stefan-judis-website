module.exports = function (platform, url, options) {
  if((new RegExp(platform)).test(url)) {
    return options.fn(this);
  }
};
