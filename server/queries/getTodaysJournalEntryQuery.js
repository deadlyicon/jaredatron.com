const { pg } = require('../../database')

module.exports = async function getTodaysJournalEntryQuery({ logger }){
  let todaysJournalEntry = await pg
    .select('*')
    .from('journal_entries')
    .whereRaw(`created_at > (NOW()::date + INTERVAL '1h')`)
    .orderBy('created_at', 'DESC')
    .first()

  if (!todaysJournalEntry) todaysJournalEntry = { body: '' }
  return { todaysJournalEntry }
}
