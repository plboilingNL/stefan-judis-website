module.exports = ({ config, eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(filterName, entry => {
    const { contentTypeSlugs } = config;
    const contentTypeSlug = contentTypeSlugs[entry.sys.contentType.sys.id];
    return `/${contentTypeSlug}/`;
  });
};
