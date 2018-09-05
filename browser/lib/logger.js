import { inspect } from 'util'

const logLevels = [
  'trace',
  'debug',
  'info',
  'warn',
  'error',
  'silent',
]

const defaultLogLevel = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ? 1 : 3
let logLevel = Number(window.localStorage.logLevel || defaultLogLevel)

const logger = {

  set logLevel(newLogLevel){
    if (typeof newLogLevel === 'string'){
      if (!logLevels.includes(newLogLevel))
        throw new Error(`invalid log level ${newLogLevel}`)
      newLogLevel = logLevels.indexOf(newLogLevel.toLowerCase())
    }
    window.localStorage.logLevel = logLevel = newLogLevel
  },

  get logLevel(){
    return logLevels[logLevel]
  },

}

const CONSOLE_METHODS = {
  trace: console.log.bind(console),
  debug: console.log.bind(console),
  info: console.info.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
}

logLevels.forEach(level => {

  if (level === 'silent') return

  const consoleMethod = CONSOLE_METHODS[level]

  logger[level] = function(...messages){
    if (logLevel > logLevels.indexOf(level)) return
    consoleMethod(...messages)
  }

  logger[`${level}WithObjectCollapsed`] = function(groupName, object){
    if (logLevel > logLevels.indexOf(level)) return
    console.groupCollapsed(groupName)
    consoleMethod(
      inspect(object, { showHidden: true, depth: null })
    )
    // consoleMethod(JSON.stringify(
    //   object,
    //   replaceUndefinedWithUndefinedString,
    //   2
    // ))
    console.groupEnd(groupName)
  }

})

const replaceUndefinedWithUndefinedString = (k, v) => v === undefined ? '[undefined]' : v

export default logger
window.DEBUG = window.DEBUG || {}
window.DEBUG.logger = logger
