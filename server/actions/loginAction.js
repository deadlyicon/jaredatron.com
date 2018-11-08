const uuid = require('uuid')
const commands = require('../commands')

module.exports = async function loginAction({ logger, password }){
  if (password !== process.env.PASSWORD)
    throw new Error('nope')

  return commands.createSession({ logger })
}
