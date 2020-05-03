const md = require('markdown-it')({
  html: true,
  linkify: false
});

md.use(require('markdown-it-prism'));
md.use(require('markdown-it-toc-and-anchor').default);

module.exports = ({ eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(
    filterName,
    value => `<div class="markdown">${md.render(value)}</div>`
  );
};
