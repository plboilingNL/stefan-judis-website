const { encode } = require('html-entities').XmlEntities;
const SQIP_DATA = require('../../site/_data/_sqip.json');
const md = require('markdown-it')({
  html: true,
  linkify: false,
});

md.renderer.rules.image = function (tokens, idx, options, env, self) {
  // https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer
  const token = tokens[idx];
  const aIndex = token.attrIndex('src');
  const src = token.attrs[aIndex][1];
  const alt = token.content;

  const [, assetId] = src.match(
    /(?:\/\/|https:\/\/)(?:images|videos).(?:ctfassets|contentful).(?:net|com)\/.*?\/(.*?)\/.*/
  );

  let svg = SQIP_DATA[assetId] || '';

  return `
    <figure class="sqip-image">
      ${svg}
      <img src="${src}" alt="${encode(alt)}" loading="lazy">
    </figure>
  `;
};

md.use(require('markdown-it-prism'));
md.use(require('markdown-it-toc-and-anchor').default);

module.exports = ({ eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(
    filterName,
    (value) => `<div class="markdown">${md.render(value)}</div>`
  );
};
