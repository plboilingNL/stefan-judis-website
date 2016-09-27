const http = require('http')
const exec = require('child_process').exec

const server = http.createServer((req, res) => {
  res.end('ok')

  setTimeout(() => {
    exec( 'npm start', { env: process.env }, (error) => {
      if ( error ) {
        return console.log(error)
      }

      console.log('Rebuilt success')
    })
  }, 1000 * 120 )
})

server.listen(8000);