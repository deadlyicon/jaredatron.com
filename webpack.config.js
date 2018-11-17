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
const WebpackPwaManifest = require('webpack-pwa-manifest')


const outputPath = PUBLIC_PATH

const development = NODE_ENV === 'development'

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
  devtool: development ? 'sourcemap' : undefined,
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
        loader: 'url-loader?limit=100000',
        exclude: /ios-icon/,
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
      favicon: `${BROWSER_PATH}/favicon.ico`,
      minify: {
        removeComments: !development,
        collapseWhitespace: !development,
        removeRedundantAttributes: !development,
        useShortDoctype: !development,
        removeEmptyAttributes: !development,
        removeStyleLinkTypeAttributes: !development,
        keepClosingSlash: !development,
        minifyJS: !development,
        minifyCSS: !development,
        minifyURLs: !development,
      }
    }),
    new WebpackPwaManifest({
      name: 'jaredatron',
      short_name: 'jaredatron',
      version: '1.0',
      description: 'jaredatron.com',
      background_color: '#c50900',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: `${BROWSER_PATH}/ios-icon.png`,
          sizes: [96, 128, 144, 192, 256, 384, 512]
        }
      ],
      permissions: [
        'storage',
        'unlimitedStorage',
        'privacy',
        'clipboardRead',
        'clipboardWrite',
      ],
    }),
  ],
}
