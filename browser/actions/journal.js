import moment from 'moment'
import { takeAction } from 'lib/server'

export async function loadEntries(){
  const key = `journal:entries`
  const loadErrorKey = `journal:entries:loadError`
  try{
    const { journalEntries } = await takeAction('getJournalEntries')
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
  const timezoneOffset = ((new Date()).getTimezoneOffset() / 60);
  try{
    const { todaysJournalEntry } = await takeAction('getTodaysJournalEntry', { timezoneOffset })
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

  this.setState({
    [updatingKey]: true,
    [updateErrorKey]: undefined,
  })
  try{
    const { todaysJournalEntry } = await takeAction('updateTodaysJournalEntry', { id, body })
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
    this.setState({
      [updatingKey]: undefined,
      [updateErrorKey]: error,
    })
  }
}

