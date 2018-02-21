const Mailgun = require('mailgun')

exports.handler = (event, context, callback) => {
  const mg = new Mailgun('api-key')
  console.log(event)
  console.log(context)
  try {
    const report = JSON.stringify(JSON.parse(event.body), null, 2)

    mg.sendText(
      'csp@stefanjudis.com',
      'stefanjudis@gmail.com',
      'CSP Violation Repot',
      report,
      (error) => {
        if (error) {
          return callback(error)
        }

        callback(null, {
          statusCode: 200,
          body: 'Sent'
        })
      }
    )
  } catch(e) {
    callback(e)
  }
}
