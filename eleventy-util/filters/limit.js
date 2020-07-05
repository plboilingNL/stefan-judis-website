module.exports = ({ config, eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(filterName, (collection, limit) =>
    collection.slice(0, limit)
  );
};
