'use strict'

const objectInspect = require('object-inspect')
const winston = require('winston')

const {
  NODE_ENV,
  LOGS_PATH,
} = require('../environment')

const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
const transports = []

const inspect = object => objectInspect(object, { depth: 9999, indent: 2 })

const formatArgs = args =>
  args.map(arg =>
    arg.toString() === '[object Object]'
      ? inspect(arg)
      : arg
  ).join(' ')

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf((parts) => {
    const {
      level,
      message,
      timestamp,
      [Symbol.for('splat')]: args,
    } = parts;
    const ts = timestamp.slice(0, 19).replace('T', ' ');
    return `${ts} [${level}]: ${message} ${formatArgs(args)}`;
  }),
);

if (NODE_ENV === 'production'){
  transports.push(
    new winston.transports.File({
      level: LOG_LEVEL,
      filename: `${LOGS_PATH}/production.log`,
      handleExceptions: true,
      showLevel: true,
      timestamp: true,
      prettyPrint: inspect,
    })
  )
}

if (NODE_ENV === 'development'){
  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
      level: LOG_LEVEL,
      handleExceptions: false,
      json: false,
    })
  )
}

if (NODE_ENV === 'test'){
  transports.push(
    new winston.transports.File({
      level: LOG_LEVEL,
      filename: `${LOGS_PATH}/test.log`,
      handleExceptions: false,
    })
  )

  if (process.env.LOG_TO_CONSOLE){
    transports.push(
      new winston.transports.Console({
        level: LOG_LEVEL,
        handleExceptions: false,
        format: consoleFormat,
      })
    )
  }
}

const logger = winston.createLogger({
  level: LOG_LEVEL,
  exitOnError: false,
  transports,
})


class Logger {
  constructor(superlogger, prefix){
    this._logger = superlogger
    this._prefix = `[${prefix}]`
  }

  prefix(prefix){
    return new Logger(this, prefix)
  }
}

'error warn info verbose debug silly'.split(' ').forEach(method => {
  Logger.prototype[method] = function(...args){
    return this._logger[method](this._prefix, ...args)
  }
})

module.exports = function(prefix){
  return new Logger(logger, prefix)
}
