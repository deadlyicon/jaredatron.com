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

const loadSession = (req, res, next) => {
  const sessionId = req.header('Session-Id')
  logger.debug('loadSession', { sessionId })
  if (!sessionId) return next()
  executeCommand({
    logger,
    commandName: 'verifyAndRefreshSession',
    options: { sessionId },
  }).then(
    () => {
      req.loggedIn = true
      next()
    },
    next
  )
}

server.get('/queries', loadSession, (req, res, next) => {
  console.log('_$$$$', req.query)
  const { loggedIn } = req
  const { queryName } = req.query
  const options = { loggedIn, ...JSON.parse(req.query.options) }
  executeQuery({ logger, queryName, options }).then(
    result => { res.json(result) },
    error => { renderErrorAsJson(res, error) },
  )
})

server.post('/commands', bodyParser.json(), loadSession, (req, res, next) => {
  const { loggedIn } = req
  const { commandName } = req.body
  const options = { loggedIn, ...req.body.options }
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
