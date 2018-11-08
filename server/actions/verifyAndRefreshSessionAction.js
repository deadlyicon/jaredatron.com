const commands = require('../commands')
module.exports = async function({ logger, sessionId }){
  return await commands.verifyAndRefreshSession({ logger, sessionId })
}
