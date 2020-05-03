const { DateTime } = require('luxon');

// had to overwrite the eleventy RSS date
// because it expects a date object
// i only have a string available
module.exports = ({ config, eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(filterName, (entry) => {
    return DateTime.fromJSDate(new Date(entry)).toISO({
      includeOffset: true,
      suppressMilliseconds: true,
    });
  });
};
