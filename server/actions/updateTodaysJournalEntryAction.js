const commands = require('../commands')

module.exports = async function updateTodaysJournalEntry({ logger, sessionId, id, body }){
  await commands.verifyAndRefreshSession({ logger, sessionId })
  return await commands.updateTodaysJournalEntry({ logger, id, body })
}
