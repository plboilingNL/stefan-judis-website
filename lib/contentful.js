const contentful = require('contentful');
const { CTF_SPACE_ID, CTF_CDA_TOKEN } = process.env;

// TODO bring in CPA in non prod environment
const client = contentful.createClient({
  space: CTF_SPACE_ID,
  accessToken: CTF_CDA_TOKEN,
});

module.exports = {
  client,
};
