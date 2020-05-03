const { readFileSync } = require('fs');
const { join } = require('path');
const postcss = require('postcss');

module.exports = async () => {
  const code = readFileSync(
    join(__dirname, '..', '_includes', 'css', 'index.css'),
    'utf8'
  );

  const result = await postcss([
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('cssnano')
  ]).process(code, { from: 'site/_includes/css/index.css' });

  return result.css;
};
