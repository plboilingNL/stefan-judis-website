const { default: getShareImage } = require('@jlengstorf/get-share-image');

module.exports = ({ eleventyConfig, filterName }) => {
  eleventyConfig.addNunjucksFilter(filterName, (entry) => {
    return getShareImage({
      title: entry.fields.title,
      tagline: '#tilPost',
      cloudName: 'dfcwuxv3l',
      imagePublicID: 'stefan-judis-website/social-image',
      font: 'oswald',
      textColor: '232129',
    });
  });
};
