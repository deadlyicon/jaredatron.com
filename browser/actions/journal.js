import moment from 'moment'
import { executeQuery, executeCommand } from 'lib/server'

export async function loadEntries(){
  const key = `journal:entries`
  const loadErrorKey = `journal:entries:loadError`
  try{
    const { journalEntries } = await executeQuery('getJournalEntries')
    journalEntries.forEach(journalEntry => {
      journalEntry.created_at = moment(journalEntry.created_at).toDate()
      journalEntry.updated_at = moment(journalEntry.updated_at).toDate()
    })
    this.setState({ [key]: journalEntries })
  }catch(error){
    this.setState({ [loadErrorKey]: error })
  }
}

export async function loadTodaysEntry(){
  const key = `journal:today`
  const loadErrorKey = `journal:today:loadError`
  try{
    const { todaysJournalEntry } = await executeQuery('getTodaysJournalEntry')
    this.setState({ [key]: todaysJournalEntry })
  }catch(error){
    this.setState({ [loadErrorKey]: error })
  }
}

export async function updateTodaysEntry({ id, body }){
  const key = `journal:today`
  const changesKey = `journal:today:changes`
  const updateErrorKey = `journal:today:updateError`
  const updatingKey = `journal:today:updating`

  this.setState({ [changesKey]: body })

  if (this.getState()[updatingKey]) {
    // scheduleNextUpdate()
    return
  }

  this.setState({ [updatingKey]: true })
  try{
    const { todaysJournalEntry } = await executeCommand('updateTodaysJournalEntry', { id, body })
    this.setState({
      [updatingKey]: undefined,
      [key]: todaysJournalEntry,
    })
    const changes = this.getState()[changesKey]
    if (changes === todaysJournalEntry.body){
      this.setState({ [changesKey]: undefined })
    }else{
      this.takeAction('journal.updateTodaysEntry', {
        id: todaysJournalEntry.id,
        body: changes,
      })
    }
  }catch(error){
    this.setState({ [updateErrorKey]: error })
  }
}

