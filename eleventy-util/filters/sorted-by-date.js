module.exports = ({ config, eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(filterName, (collection, dateType) => {
    if (dateType === 'sys.updatedAt') {
      return collection.sort((a, b) =>
        new Date(a.sys.updatedAt) > new Date(b.sys.updatedAt) ? -1 : 1
      );
    }

    if (dateType === 'fields.date') {
      return collection.sort((a, b) =>
        new Date(a.fields.date) > new Date(b.fields.date) ? -1 : 1
      );
    }
  });
};
