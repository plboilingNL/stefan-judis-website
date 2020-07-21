const contentful = require('contentful');
const { post } = require('got');
const { CTF_SPACE_ID, CTF_CDA_TOKEN } = process.env;

// TODO bring in CPA in non prod environment
const client = contentful.createClient({
  space: CTF_SPACE_ID,
  accessToken: CTF_CDA_TOKEN,
});

async function query(query) {
  const { body } = await post(
    `https://graphql.contentful.com/content/v1/spaces/${CTF_SPACE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${CTF_CDA_TOKEN}`,
      },
      json: {
        query,
      },
      responseType: 'json',
    }
  );

  return body;
}

module.exports = {
  client,
  query,
};
