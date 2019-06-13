const YAML = require('js-yaml')
const { pg } = require('../../database')

module.exports = async function createJournalEntryCommand({ logger, body }){
  const [ entry ] = await pg
    .insert({
      body,
      created_at: new Date(),
    })
    .into('journal_entries')
    .returning('*')

  return entry
}
