const commands = require('../commands')

module.exports = async function moveWikiPageAction({ logger, sessionId, path, newPath }){
  await commands.verifyAndRefreshSession({ logger, sessionId })
  return await commands.moveWikiPage({ logger, path, newPath })
}
