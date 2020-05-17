const { encode } = require('html-entities').XmlEntities;
const md = require('markdown-it')({
  html: true,
  linkify: false,
});
const SQIP_DATA = require('../../site/_data/_sqip.json');

md.renderer.rules.hr = function () {
  return '<hr aria-hidden="true">';
};

md.renderer.rules.image = function (tokens, idx, options, env, self) {
  // https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer
  const token = tokens[idx];
  const aIndex = token.attrIndex('src');
  const src = token.attrs[aIndex][1];
  const alt = token.content;

  const [, assetId] = src.match(
    /(?:\/\/|https:\/\/)(?:images|videos).(?:ctfassets|contentful).(?:net|com)\/.*?\/(.*?)\/.*/
  );

  const assetData = SQIP_DATA[assetId] || {};
  const { svg, details } = assetData;

  // Contentful-orgin articles are currently not sqiped.
  // because getAssets is only called on this space
  return details
    ? `
    <figure class="sqip-image" style="padding-top: ${details.ratio}%;">
      ${svg}
      <img width="${1000} height="${(1000 * details.ratio) / 100}"
      srcset="
        ${src}?fm=jpg&fit=scale&q=75&w=300&h=${Math.floor(
        (300 * details.ratio) / 100
      )} 300w,
        ${src}?fm=jpg&fit=scale&q=75&w=500&h=${Math.floor(
        (500 * details.ratio) / 100
      )} 500w,
        ${src}?fm=jpg&fit=scale&q=75&w=700&h=${Math.floor(
        (700 * details.ratio) / 100
      )} 700w,
        ${src}?fm=jpg&fit=scale&q=75&w=900&h=${Math.floor(
        (900 * details.ratio) / 100
      )} 900w,
        ${src}?fm=jpg&fit=scale&q=75&w=1100&h=${Math.floor(
        (1100 * details.ratio) / 100
      )} 1100w
      "
      sizes="
        (max-width: 50em) 98vw,
        700px"
      src="${src}" alt="${encode(alt)}" loading="lazy">
    </figure>
  `
    : `<img src="${src}" alt="${encode(alt)}" loading="lazy" />`;
};

md.use(require('markdown-it-prism'));
md.use(require('markdown-it-toc-and-anchor').default);

module.exports = ({ eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(
    filterName,
    (value) => `<div class="markdown">${md.render(value)}</div>`
  );
};
