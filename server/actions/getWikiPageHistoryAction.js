const commands = require('../commands')
const queries = require('../queries')

module.exports = async function getWikiPageHistoryAction({ logger, sessionId, path }){
  await commands.verifyAndRefreshSession({ logger, sessionId })
  return await queries.getWikiPageHistory({ logger, path })
}
