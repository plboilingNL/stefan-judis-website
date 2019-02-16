function getValidConfig(configEnv, keys) {
  let { config, missingKeys } = keys.reduce(
    (acc, key) => {
      if (!configEnv[key]) {
        acc.missingKeys.push(key);
      } else {
        acc.config[key] = configEnv[key];
      }

      return acc;
    },
    { config: {}, missingKeys: [] }
  );

  if (missingKeys.length) {
    throw new Error(
      'Please provide needed configs:\n' +
        `\nMissing values: ${missingKeys.join(', ')}\n\n` +
        'There are two way to do so:\n' +
        '- define a .env.json file (similar to .env.sample.json) in the root of this directory\n' +
        `- define all environment variables ${keys.join(', ')}`
    );
  }

  return config;
}

const neccesaryKeys = [
  'CTF_SPACE_ID',
  'CTF_ENVIRONMENT_ID',
  'CTF_CDA_TOKEN',
  'CTF_CPA_TOKEN',
  'CTF_ME_ID',
  'CTF_POST_ID',
  'CTF_TALK_ID',
  'CTF_PROJECT_ID',
  'CTF_EVENT_ID',
  'CTF_TIL_ID',
  'CTF_SCREENCAST_ID',
  'CTF_LANDING_PAGE_ID',
  'CTF_TOPIC_ID',
  'GOOGLE_CLIENT_EMAIL',
  'GOOGLE_PRIVATE_KEY'
];

module.exports = {
  getConfig() {
    return getConfigForKeys(neccesaryKeys);
  }
};

function getConfigForKeys(keys) {
  let configEnv;

  try {
    configEnv = require('../.env.json');
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      configEnv = process.env;

      return getValidConfig(configEnv, keys);
    } else {
      throw error;
    }
  }

  return getValidConfig(configEnv, keys);
}
