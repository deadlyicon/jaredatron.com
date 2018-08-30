const {
  NODE_ENV,
  BROWSER_PATH,
  BROWSER_BUILD_PATH,
  // ROOT_PATH,
  // PUBLIC_PATH,
  INDEX_HTML_PATH,
} = require('./environment')

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: NODE_ENV,
  context: BROWSER_PATH,
  entry: './index.js',
  output: {
    path: BROWSER_BUILD_PATH,
    filename: 'bundle.js'
  },

  devtool: NODE_ENV === 'development' ? 'sourcemap' : undefined,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  // devServer: {
  //   port: 3000,
  //   open: true,
  //   proxy: {
  //     '/api': 'http://localhost:8080'
  //   }
  // },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin([BROWSER_BUILD_PATH]),
    new HtmlWebpackPlugin({
      inject: true,
      template: INDEX_HTML_PATH,
      // template: './public/index.html',
      // favicon: './public/favicon.ico'
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
}
