const {
  NODE_ENV,
  ROOT_PATH,
  BROWSER_PATH,
  PUBLIC_PATH,
} = require('./environment')

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const outputPath = PUBLIC_PATH

module.exports = {
  mode: NODE_ENV,
  context: BROWSER_PATH,
  entry: [
    './polyfills.js',
    './index.js',
  ],
  output: {
    path: outputPath,
    filename: 'assets/[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      lib: `${BROWSER_PATH}/lib`,
      components: `${BROWSER_PATH}/components`,
      // style: `${srcPath}/style`,
      // actions: `${srcPath}/${packageName}/actions`,
    }
  },
  devtool: NODE_ENV === 'development' ? 'sourcemap' : undefined,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: `${ROOT_PATH}/tmp/webpack_cache`
        }
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|otf|webp)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[name].[hash].[ext]'
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
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin([outputPath]),
    new HtmlWebpackPlugin({
      inject: true,
      template: `${BROWSER_PATH}/index.html`,
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
