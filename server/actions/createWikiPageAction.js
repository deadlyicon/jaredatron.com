const commands = require('../commands')

module.exports = async function createWikiPageAction({ logger, sessionId, path, content }){
  await commands.verifyAndRefreshSession({ logger, sessionId })
  return await commands.createWikiPage({ logger, path, content })
}
