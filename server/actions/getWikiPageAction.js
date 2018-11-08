const commands = require('../commands')
const queries = require('../queries')

module.exports = async function getWikiPageAction({ logger, sessionId, path }){
  await commands.verifyAndRefreshSession({ logger, sessionId })
  return await queries.getWikiPage({ logger, path })
}
