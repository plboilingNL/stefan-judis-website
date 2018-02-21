exports.handler = (event, context, callback) => {
  if (event.body) {
    console.log(context)
    const apiKey = 'key-XXXXXXXXXXXXXXXXXXXXXXX'
    // const domain = 'www.mydomain.com'
    const mailgun = require('mailgun-js')({apiKey})
    const report = JSON.stringify(JSON.parse(event.body), null, 2)

    var data = {
      from: 'CSP Report Bot <csp@stefanjudis.com>',
      to: 'stefanjudis@gmail.com',
      subject: 'CSP Report',
      text: report
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
