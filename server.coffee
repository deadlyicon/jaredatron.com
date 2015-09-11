require '../environment'

fs         = require('fs')
express    = require('express')
app        = express()
publicDir  = process.env.ROOT_PATH + '/public'

if 'development' == process.env.NODE_ENV
  Webpack = require('webpack')
  webpackConfig = require('./webpack.config')
  compiler = Webpack(webpackConfig)
  app.get '/client.js', (request, response) ->
    compiler.run ->
      response.sendFile publicDir + '/client.js'

app.set 'port', process.env.PORT or 3001

app.use express.static(publicDir)

app.get '/*', (request, response) ->
  response.sendFile publicDir + '/index.html'

app.listen app.get('port')

if app.get('port') == 3001
  console.log 'Node app is running at http://jaredatron.dev'

