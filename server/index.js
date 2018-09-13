const {
  ROOT_PATH,
  PUBLIC_PATH,
} = require('../environment')

const INDEX_HTML_PATH = `${PUBLIC_PATH}/index.html`

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const logger = require('./logger')('express')
logger.info('EXPRESS','IS','STARTING!')
logger._logger.info('?? EXPRESS','IS','STARTING!')
const { executeCommand } = require('./commands')
const { executeQuery } = require('./queries')

const server = express()

server.use(
  morgan('tiny', {
    stream: {
      write: function(message){
        logger.info(message.toString().replace(/\n+$/,''));
      }
    }
  })
);


if (process.env.NODE_ENV === 'development'){
  require('./development')(server)
}
server.use(express.static(PUBLIC_PATH))

server.get('/queries', (req, res, next) => {
  console.log('_$$$$', req.query)
  const { queryName } = req.query
  const options = JSON.parse(req.query.options)
  executeQuery({ logger, queryName, options }).then(
    result => { res.json(result) },
    error => { renderErrorAsJson(res, error) },
  )
})

server.post('/commands', bodyParser.json(), (req, res, next) => {
  const { commandName, options } = req.body
  executeCommand({ logger, commandName, options }).then(
    result => { res.json(result) },
    error => { renderErrorAsJson(res, error) },
  )
})

server.get('*', (req, res, next) => {
  res.sendFile(INDEX_HTML_PATH)
})

const renderErrorAsJson = function(res, error){
  res.json({
    error: {
      message: error.message,
      stack: error.stack,
    }
  })
}

module.exports = server
