// require('./environment');
var Webpack = require('webpack');
var path = require('path');
var publicPath = path.resolve(__dirname, 'public');
var clientPath = path.resolve(__dirname, 'client');
var sharedPath = path.resolve(__dirname, 'shared');

module.exports = {
  // Makes sure errors in console map to the correct file
  // and line number
  // devtool: 'eval',

  entry: [
    clientPath,
    sharedPath
  ],

  output: {
    path: publicPath,
    filename: 'client.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" },
    ]
  },

  resolve: {
    extensions: [".coffee", ".js"]
  },

  plugins: [
    new Webpack.DefinePlugin({
      "process.env": process.env
    }),
  ]
};
