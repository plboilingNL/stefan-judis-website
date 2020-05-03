require('dotenv').config();

const camelCase = require('camelcase');
const chunk = require('lodash.chunk');

const config = require('./site/_data/config');

/**
 * Load all the filters from `eleventy-util/filters
 *
 * @param   {Object}  eleventyConfig
 * @param   {String}  name
 */
function addFilter(config, eleventyConfig, fileName) {
  require(`./eleventy-util/filters/${fileName}`)({
    config,
    eleventyConfig,
    filterName: camelCase(fileName)
  });
}

function getDoublePaginatedTopics(collection) {
  // more info
  // https://github.com/11ty/eleventy/issues/332
  const contentfulData = collection.getAll()[0].data.contentful;
  const { allEntriesGroupedByTopic, topics } = contentfulData;

  const PAGINATION_SIZE = 5;

  return topics.reduce((acc, cur) => {
    const entries = allEntriesGroupedByTopic[cur.fields.slug];
    const pages = chunk(entries, PAGINATION_SIZE);

    for (
      let pageNumber = 0, max = pages.length;
      pageNumber < max;
      pageNumber++
    ) {
      acc.push({
        fields: cur.fields,
        pagination: {
          href: {
            pageNumber,
            ...(pageNumber > 0 && {
              previous: `/topics/${cur.fields.slug}/${
                pageNumber === 1 ? '' : `page-${pageNumber}/`
              }`
            }),
            ...(pageNumber + 1 < max && {
              next: `/topics/${cur.fields.slug}/page-${pageNumber + 2}/`
            })
          },
          items: pages[pageNumber],
          pageNumber: pageNumber
        }
      });
    }

    return acc;
  }, []);
}

module.exports = function(eleventyConfig) {
  // FYI CSS is done via data to only process it once 🙈
  addFilter(config, eleventyConfig, 'content-type-url');
  addFilter(config, eleventyConfig, 'overwrite-content-type');
  addFilter(config, eleventyConfig, 'domain');
  addFilter(config, eleventyConfig, 'entry-url');
  addFilter(config, eleventyConfig, 'only-til-posts');
  addFilter(config, eleventyConfig, 'markdown');
  addFilter(config, eleventyConfig, 'reading-time');
  addFilter(config, eleventyConfig, 'readable-date');
  addFilter(config, eleventyConfig, 'sorted-by-date');

  eleventyConfig.addCollection('paginatedTopics', getDoublePaginatedTopics);
  eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'));
  eleventyConfig.addPassthroughCopy('assets/fonts');

  return {
    dir: {
      input: 'site',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',

      output: 'dist'
    }
  };
};