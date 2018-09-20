const { pg } = require('../../database')

module.exports = async function getJournalEntriesQuery({ logger }){
  const journalEntries = await pg
    .select('*')
    .from('journal_entries')
    .orderBy('created_at', 'DESC')
  return { journalEntries }
}
