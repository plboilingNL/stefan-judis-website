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
        srcset="${[300, 500, 700, 900, 1100]
          .map(
            (size) =>
              `${src}?fm=jpg&fit=scale&q=75&w=${size}&h=${Math.floor(
                (size * details.ratio) / 100
              )} ${size}w`
          )
          .join(', ')}"
        sizes="(max-width: 50em) 98vw, 700px"
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
