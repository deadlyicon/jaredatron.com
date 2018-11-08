const YAML = require('js-yaml')
const { pg } = require('../../database')

module.exports = async function updateTodaysJournalEntryCommand({ logger, id, body }){
  let todaysJournalEntry
  if (id) {
    [ todaysJournalEntry ] = await pg
      .table('journal_entries')
      .update({
        body,
        updated_at: new Date(),
      })
      .where({ id })
      .returning('*')
  } else {
    [ todaysJournalEntry ] = await pg
      .insert({
        body,
        created_at: new Date(),
      })
      .into('journal_entries')
      .returning('*')
  }

  return { todaysJournalEntry }
}
