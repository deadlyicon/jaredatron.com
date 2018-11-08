const {
  ROOT_PATH,
  PUBLIC_PATH,
} = require('../environment')

const INDEX_HTML_PATH = `${PUBLIC_PATH}/index.html`

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const logger = require('./logger')('express')
const actions = require('./actions')

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

server.post('/action/:actionName', bodyParser.json(), (req, res, next) => {
  const { actionName } = req.params
  const args = req.body
  if (!(actionName in actions)){
    res.status(400)
    renderErrorAsJson(res, new Error(`unknown action ${actionName}`))
    return
  }
  const sessionId = req.header('Session-Id')
  actions[actionName]({ ...args, logger, sessionId, actionName }).then(
    result => { res.json({ ...result }) },
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
