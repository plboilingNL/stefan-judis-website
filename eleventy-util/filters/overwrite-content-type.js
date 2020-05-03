module.exports = ({ config, eleventyConfig, filterName }) => {
  const { contentTypeNames } = config;
  eleventyConfig.addNunjucksFilter(filterName, value => {
    return contentTypeNames[value] || value;
  });
};
