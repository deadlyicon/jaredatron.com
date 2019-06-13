import moment from 'moment'
import { takeAction } from 'lib/server'

function indexById(journalEntries){
  const journalEntriesById = {}
  journalEntries.forEach(entry => {
    journalEntriesById[entry.id] = entry
  })
  return journalEntriesById
}

export async function loadEntries(){
  const journalEntriesKey = `journal:entries`
  const loadErrorKey = `journal:entries:loadError`
  try{
    const { journalEntries } = await takeAction('getJournalEntries')
    this.setState({ [journalEntriesKey]: indexById(journalEntries) })
  }catch(error){
    console.error(error)
    this.setState({ [loadErrorKey]: error })
  }
}

export async function createEntry({ body }){
  const entriesKey = `journal:entries`
  const creatingKey = `journal:creatingEntry`
  const errorKey = `journal:creatingEntry:loadError`
  if (this.getState()[creatingKey]) return
  this.setState({ [creatingKey]: true, [errorKey]: undefined })
  try{
    const entry = await takeAction('createJournalEntry', { body })
    let journalEntries = this.getState()[entriesKey] || {}
    journalEntries = {
      ...journalEntries,
      [entry.id]: entry,
    }
    this.setState({
      [entriesKey]: journalEntries,
    })
  }catch(error){
    console.error(error)
    this.setState({ [errorKey]: error })
  }finally{
    this.setState({ [creatingKey]: undefined })
  }
}

