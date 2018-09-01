const {
  ROOT_PATH,
  ASSETS_PATH,
  PUBLIC_PATH,
} = require('../environment')

const INDEX_HTML_PATH = `${PUBLIC_PATH}/index.html`

const express = require('express')

const server = express()

if (process.env.NODE_ENV === 'development'){
  require('./development')(server)
}else{
  server.use(express.static(ASSETS_PATH))
}
server.use('/assets', express.static(ASSETS_PATH))

server.get('*', (req, res, next) => {
  res.sendFile(INDEX_HTML_PATH)
})

module.exports = server
