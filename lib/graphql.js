const { post } = require('got');
const { CTF_SPACE_ID, CTF_CDA_TOKEN, GITHUB_TOKEN } = process.env;

function getQueryFn({ endpoint, token }) {
  return async function (query) {
    const { body } = await post(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        query,
      },
      responseType: 'json',
    });

    return body;
  };
}

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
  queryContentful: getQueryFn({
    endpoint: `https://graphql.contentful.com/content/v1/spaces/${CTF_SPACE_ID}`,
    token: CTF_CDA_TOKEN,
  }),
  queryGithub: getQueryFn({
    endpoint: 'https://api.github.com/graphql',
    token: GITHUB_TOKEN,
  }),
};
