exports.handler = (event, context, callback) => {
  if (event.body) {
    const apiKey = process.env.MG_TOKEN
    const domain = process.env.MG_DOMAIN
    const mailgun = require('mailgun-js')({apiKey, domain})
    const report = JSON.parse(event.body)['csp-report']

    if (report['blocked-uri'] === 'data') {
      return callback(null, {
        statusCode: 200,
        body: 'Didnt send report, "data" as blocked URI is not helpful'
      })
    }

    var data = {
      from: 'CSP Report Bot <csp@stefanjudis.com>',
      to: 'stefanjudis@gmail.com',
      subject: `Blocked resource (${report['blocked-uri']}) on ${report['document-uri']}`,
      text: JSON.stringify(report, null, 2)
    }

    mailgun.messages().send(data, (error, body) => {
      if (error) {
        return callback(error)
      }

      callback(null, {
        statusCode: 200,
        body: 'Sent'
      })
    })
  } else {
    callback(null, {
      statusCode: 400,
      body: 'No report, hmm?'
    })
  }
}
