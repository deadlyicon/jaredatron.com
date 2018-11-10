process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')
if (process.env.NODE_ENV === 'development') require('dotenv').config()

const ROOT_PATH = path.resolve(__dirname)
const BROWSER_PATH = path.resolve(ROOT_PATH, 'browser')
const ASSETS_PATH = path.resolve(ROOT_PATH, 'assets')
const PUBLIC_PATH = path.resolve(ROOT_PATH, 'public')

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  ROOT_PATH,
  BROWSER_PATH,
  ASSETS_PATH,
  PUBLIC_PATH,
}
