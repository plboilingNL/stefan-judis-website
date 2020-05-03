module.exports = ({ config, eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(filterName, entry => {
    return new URL(entry).host;
  });
};
