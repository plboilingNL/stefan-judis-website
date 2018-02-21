exports.handler = (event, context, callback) => {
  const mg = new Mailgun('api-key')
  console.log(event)
  console.log(context)
  try {
    const report = JSON.stringify(JSON.parse(event.bosy), null, 2)


  } catch(e) {
    callback(e)
  }
}
