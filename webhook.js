const http = require('http')
const exec = require('child_process').exec
const config = require('./config.json')


const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end('ok')

  setTimeout(() => {
    exec( 'npm start', { env: Object.assign( {}, process.env, config ), cwd: __dirname }, (error) => {
      if ( error ) {
        return console.log(error)
      }

      console.log('Rebuilt success')
    })
  }, 1000 * 120 )
})

console.log('Started server at 8000')
server.listen(8000);