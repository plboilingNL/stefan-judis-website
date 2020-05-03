module.exports = ({ config, eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(filterName, collection => {
    return collection.filter(
      entry => entry.sys.contentType.sys.id === 'tilPost'
    );
  });
};
