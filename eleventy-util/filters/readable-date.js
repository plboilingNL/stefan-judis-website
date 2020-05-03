module.exports = ({ eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(filterName, value => {
    const [, year, month, day] = value.match(/(\d{4})-(\d{2})-(\d{2})/);
    return new Date(year, +month - 1, day).toDateString().substring(4);
  });
};
