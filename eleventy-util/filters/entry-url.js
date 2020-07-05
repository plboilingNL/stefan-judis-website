module.exports = ({ config, eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(filterName, (entry) => {
    const entryIsLandingPage =
      entry.sys.contentType.sys.id === process.env.CTF_LANDING_PAGE_ID;

    // special treatment for landing pages
    // they're served under root
    if (entryIsLandingPage) {
      return `/${entry.fields.slug}/`;
    }

    const { contentTypeSlugs } = config;
    const contentTypeSlug = contentTypeSlugs[entry.sys.contentType.sys.id];
    return `/${contentTypeSlug}/${entry.fields.slug}/`;
  });
};
