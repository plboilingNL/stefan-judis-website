module.exports = ({ config, eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(filterName, (articles, topics) => {
    const topicIds = topics.map(({ sys }) => sys.id);

    return articles.filter(({ fields }) =>
      fields.topics.some(({ sys }) => topicIds.includes(sys.id))
    );
  });
};
