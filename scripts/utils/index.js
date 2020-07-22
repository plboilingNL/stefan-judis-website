const path = require('path');
const { writeFile } = require('fs-extra');
const isNetlify = (_) => !!process.env.DEPLOY_URL;
const chalk = require('chalk');

const DATA_PATH = path.resolve(__dirname, '..', '..', 'site', '_data');

module.exports = {
  getCachePath: (name) =>
    isNetlify()
      ? path.join('/', 'opt', 'build', 'cache', name)
      : path.resolve(__dirname, '..', '..', `.${name}`),
  logError: (text) => console.log(chalk.red(`!!! ${text}\n`)),
  logSuccess: (text) => console.log(chalk.green(`✔ ${text}\n`)),
  logSeparator: (text) => console.log(chalk.yellow(`↻ ${text}...`)),
  shouldClearCache: process.env.WEBHOOK_TITLE === 'CLEAR_CUSTOM_CACHE',
  writeDataFile: (fileName, content) =>
    writeFile(path.join(DATA_PATH, fileName), content),
};
