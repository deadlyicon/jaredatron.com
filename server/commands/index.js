'use strict';

const requireAll = require('require-all');

const commandFilenames = requireAll({
  dirname: __dirname,
  filter: /(.+Command)\.js$/,
});

const commands = {}

Object.entries(commandFilenames).forEach(([commandFilename, command]) => {
  const commandName = commandFilename.replace(/Command$/,'');
  commands[commandName] = function({ logger, ...args }){
    logger = logger.prefix(`Command:${commandName}`);
    logger.info({ ...args })
    return command({ logger, ...args }).catch(error => {
      logger.error(error);
      throw error;
    });
  };
});

const executeCommand = async function({ logger, commandName, options }) {
  if (!(commandName in commands))
    throw new Error(`command ${commandName} is not found`)
  return await commands[commandName]({ logger, ...options })
}

module.exports  = {
  executeCommand,
  ...commands,
}
