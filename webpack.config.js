var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// require('./config/environment')

// if (process.env.NODE_ENV === 'development'){
//   require('dotenv').load();
// }

let paths = {}
paths.root = __dirname
paths.src  = paths.root+'/src'
paths.dist = paths.root+'/dist'
paths.public = paths.dist+'/public'
paths.nodeModules = paths.root+'/node_modules'

var processDotEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV:  JSON.stringify(process.env.NODE_ENV),
    PORT:      JSON.stringify(process.env.PORT),
    // APP_ROOT:  JSON.stringify(process.env.APP_ROOT),
    // DIST_PATH: JSON.stringify(process.env.DIST_PATH),
  }
})


// this lists all node_modules as external so they dont
// get packaged and the requires stay as is.
// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var nodeModulesExtenals = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModulesExtenals[mod] = 'commonjs ' + mod;
  });


var sourceMapSupperBannerPlugin = new webpack.BannerPlugin(
  'require("source-map-support").install();',
  { raw: true, entryOnly: false }
)


var babelConfig = {
  babelrc: false,
  presets: [
    'babel-preset-es2015',
    'babel-preset-es2016',
    'babel-preset-react'
  ],
  plugins: [
    'babel-plugin-syntax-trailing-function-commas',
    'babel-plugin-transform-class-properties',
    'babel-plugin-transform-object-rest-spread',
    'babel-plugin-transform-react-constant-elements',
    [
      'babel-plugin-transform-runtime',
      {
        helpers: false,
        polyfill: false,
        regenerator: true
      }
    ]
  ]
};


var tests = {
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  console: true,
  process: true,
  context: paths.src+'/test',
  entry: paths.src+'/test/index.js',
  resolve: {
    alias: {
      lib: paths.src+'/lib',
    },
    root: [
      paths.src
    ]
  },
  output: {
    path: paths.dist,
    pathinfo: true,
    filename: 'test.js',
  },
  devtool: 'sourcemap',
  externals: nodeModulesExtenals, // dont bundle any node_modules
  plugins:  [
    sourceMapSupperBannerPlugin,
    new webpack.IgnorePlugin(/\.(css|less)$/)
  ],
  module: {
    loaders: [
      {
        test: /.js$/,
        include: [
          paths.src
        ],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: babelConfig
      }
    ]
  },
}

var server = {
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  console: true,
  process: true,
  context: paths.src+'/server',
  entry: paths.src+'/server/index.js',
  resolve: {
    alias: {
      lib: paths.src+'/lib',
    },
    root: [
      paths.src+'/server',
      paths.src+'/lib'
    ]
  },
  output: {
    path: paths.dist,
    filename: 'server.js',
  },
  devtool: 'sourcemap',
  externals: nodeModulesExtenals, // dont bundle any node_modules
  plugins:  [
    sourceMapSupperBannerPlugin,
    new webpack.IgnorePlugin(/\.(css|less)$/)
  ],
  module: {
    loaders: [
      {
        test: /.js$/,
        include: [
          paths.src+'/server',
          paths.src+'/lib'
        ],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: babelConfig
      },
      {
        test: /.pug$/,
        loader: 'pug',
      }
    ]
  },
}

var browser = {
  context: paths.src+'/browser',
  entry: {
    browser: paths.src+'/browser/index.js'
  },
  output: {
    path: paths.dist+'/public',
    filename: "[name].js",
    chunkFilename: "[id].js",
    publicPath: '/'
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devtool: 'sourcemap',
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    // preLoaders: [
    //   {
    //     test: /\.json$/,
    //     include: [paths.src, paths.nodeModules],
    //     // exclude: /(node_modules|bower_components)/,
    //     loader: 'json'
    //   },
    // ],
    loaders: [
      {
        test: /\.jsx?$/,
        include: paths.src,
        loader: 'babel',
        query: babelConfig,
      },
      {
        test: /\.css$/,
        include: [paths.src, paths.nodeModules],
        loader: 'style!css!postcss'
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract("style", "css!sass?sourceMap")
      },
      {
        test: /\.json$/,
        include: [paths.src, paths.nodeModules],
        // exclude: /(node_modules|bower_components)/,
        loader: 'json'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        include: [paths.src, paths.nodeModules],
        loader: 'file',
        query: {
          name: 'assets/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm)(\?.*)?$/,
        include: [paths.src, paths.nodeModules],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'assets/[name].[ext]'
        }
      }
    ]
  },
};

module.exports = [
  tests,
  server,
  browser,
]
