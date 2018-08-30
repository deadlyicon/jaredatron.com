const {
  ROOT_PATH,
  PUBLIC_PATH,
  INDEX_HTML_PATH,
} = require('../environment')

const express = require('express')

const server = express()

if (process.env.NODE_ENV === 'development'){
  require('./development')(server)
  server.use(express.static(PUBLIC_PATH))
}else{
  server.use(express.static(PUBLIC_PATH))
  server.get('*', (req, res) => {
    res.sendFile(INDEX_HTML_PATH)
  })
}



module.exports = server
