const commands = require('../commands')
const queries = require('../queries')

module.exports = async function getTodaysJournalEntryAction({ logger, sessionId }){
  await commands.verifyAndRefreshSession({ logger, sessionId })
  return await queries.getTodaysJournalEntry({ logger })
}
