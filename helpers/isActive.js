module.exports = function (slug, expected) {
  return slug === expected ? 'is-active' : '';
}
