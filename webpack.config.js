// require('./environment');
var Webpack = require('webpack');
var path = require('path');


var processEnv = {};
for (var key in process.env){
  processEnv[key] = JSON.stringify(process.env[key]);
}
module.exports = {
  // Makes sure errors in console map to the correct file
  // and line number
  // devtool: 'eval',

  context: __dirname,

  entry: './client',

  output: {
    path: 'public',
    filename: 'client.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" },
    ]
  },

  resolve: {
    extensions: ["", ".coffee", ".js"]
  },

  plugins: [
    new Webpack.DefinePlugin({
      "process.env": processEnv
    }),
  ]
};
