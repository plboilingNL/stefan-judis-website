const fetch = require('node-fetch');
const { BUTTON_DOWN_TOKEN } = process.env;
exports.handler = async (event) => {
  const email = JSON.parse(event.body).payload.email;
  console.log(`Recieved a submission: ${email}`);
  return fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${BUTTON_DOWN_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(`Submitted to Buttondown:\n ${JSON.stringify(data)}`);
      return {
        statusCode: 200,
        body: 'Hello, World',
      };
    })
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
