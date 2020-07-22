const { post } = require('got');

const { GITHUB_TOKEN } = process.env;

async function query(query) {
  const { body } = await post(`https://api.github.com/graphql`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    json: {
      query,
    },
    responseType: 'json',
  });

  return body;
}

module.exports = {
  query,
};
