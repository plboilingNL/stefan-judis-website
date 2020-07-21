module.exports = ({ config, eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(filterName, (articles, entry) => {
    const { topics } = entry.fields;
    const topicIds = topics.map(({ sys }) => sys.id);

    return articles.filter(
      ({ sys, fields }) =>
        sys.id !== entry.sys.id &&
        fields.topics.some(({ sys }) => topicIds.includes(sys.id))
    );
  });
};
