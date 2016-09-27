const http = require('http')
const exec = require('child_process').exec

const server = http.createServer((req, res) => {
  exec( 'npm start', { env: process.env }, (error) => {
    if ( error ) {
      res.end('error')
      return console.log(error)
    }

    res.end('ok')
    console.log('Page rebuilt')
  })
})

server.listen(8000);