process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')
require('dotenv').config()

const ROOT_PATH = path.resolve(__dirname)
const BROWSER_PATH = path.resolve(ROOT_PATH, 'browser')
const BROWSER_BUILD_PATH = path.resolve(ROOT_PATH, 'browser-build')
const PUBLIC_PATH = path.resolve(ROOT_PATH, 'public')
const INDEX_HTML_PATH = path.resolve(PUBLIC_PATH, 'index.html')

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  ROOT_PATH,
  BROWSER_PATH,
  BROWSER_BUILD_PATH,
  PUBLIC_PATH,
  INDEX_HTML_PATH,
}
