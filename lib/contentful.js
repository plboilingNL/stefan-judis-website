const contentful = require('contentful');

// TODO bring in CPA in non prod environment
const client = contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_TOKEN
});

module.exports = {
  client
};
