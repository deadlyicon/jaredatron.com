'use strict';

const requireAll = require('require-all');

module.exports = function requireAllMethods(wrappedMethods, suffix, dirname){
  const methods = requireAll({
    dirname,
    filter: new RegExp(`.+${suffix}\.js$`),
  })
  const regexp = new RegExp(`${suffix}.js$`)
  Object.entries(methods).forEach(([filename, method]) => {
    if (typeof method !== 'function')
      throw new Error(`${dirname}/${filename} did not export a function`)
    const methodName = filename.replace(regexp, '');
    wrappedMethods[methodName] = function({ logger, ...args }){
      if (!logger) throw new Error(`logger is required\n${dirname}/${filename}`)
      logger = logger.prefix(`${suffix}:${methodName}`)
      logger.info({ ...args })
      return method({ logger, ...args }).catch(error => {
        logger.error(error);
        throw error;
      })
    }
  })
  return wrappedMethods
}
