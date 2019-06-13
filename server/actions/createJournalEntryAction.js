const commands = require('../commands')

module.exports = async function createJournalEntry({ logger, sessionId, id, body }){
  await commands.verifyAndRefreshSession({ logger, sessionId })
  return await commands.createJournalEntry({ logger, id, body })
}
