const commands = require('../commands')

module.exports = async function updateWikiPageAction({ logger, sessionId, path, content }){
  await commands.verifyAndRefreshSession({ logger, sessionId })
  return await commands.updateWikiPage({ logger, path, content })
}
