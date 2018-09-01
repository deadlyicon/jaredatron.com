const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')
// const compiler = webpack({ .. webpack options .. })

module.exports = server => {
  server.use(webpackDevMiddleware(webpack(webpackConfig),{
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: true,

  }))
}
