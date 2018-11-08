const commands = require('../commands')

module.exports = async function deleteWikiPageAction({ logger, path }){
  await commands.verifyAndRefreshSession({ logger, sessionId })
  return await commands.deleteWikiPage({ logger, path })
}
