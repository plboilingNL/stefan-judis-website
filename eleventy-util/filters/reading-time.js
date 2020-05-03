const WORDS_PER_MIN = 275;

module.exports = ({ eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(filterName, value => {
    count = value.match(/\w+/g).length;
    return `${Math.ceil(count / WORDS_PER_MIN)}min`;
  });
};
