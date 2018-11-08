const commands = require('../commands')
const queries = require('../queries')

module.exports = async function getJournalEntriesAction({ logger, sessionId }){
  await commands.verifyAndRefreshSession({ logger, sessionId })
  return await queries.getJournalEntries({ logger })
}
