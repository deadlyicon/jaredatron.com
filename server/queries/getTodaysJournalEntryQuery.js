const { pg } = require('../../database')

module.exports = async function getTodaysJournalEntryQuery({ logger }){
  let todaysJournalEntry = await pg
    .select('*')
    .from('journal_entries')
    .whereRaw(`created_at > (NOW() - INTERVAL '1 DAY')`)
    .orderBy('created_at', 'DESC')
    .first()

  if (!todaysJournalEntry) todaysJournalEntry = { body: '' }
  return { todaysJournalEntry }
}
