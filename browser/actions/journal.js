import moment from 'moment'
import { executeQuery, executeCommand } from 'lib/server'

export async function loadEntries(){
    const key = `journal:entries`
    const errorKey = `journal:entries:loadError`
    try{
      const { journalEntries } = await executeQuery('getJournalEntries')
      journalEntries.forEach(journalEntry => {
        journalEntry.created_at = moment(journalEntry.created_at).toDate()
        journalEntry.updated_at = moment(journalEntry.updated_at).toDate()
      })
      this.setState({ [key]: journalEntries })
    }catch(error){
      this.setState({ [errorKey]: error })
    }
  }


// export async function loadEntry({ id }){
//     const key = `journal:entry:${id}`,
//     const errorKey = `journal:entry:${id}:loadError`,
//     try{
//       const { journalEntry } = await executeQuery('getJournalEntry', { id })
//       journalEntries.forEach(journalEntry => {
//         journalEntry.created_at = moment(journalEntry.created_at).toDate()
//         journalEntry.updated_at = moment(journalEntry.updated_at).toDate()
//       })
//       this.setState({ [key]: journalEntries })
//     }catch(error){
//       this.setState({ [errorKey]: error })
//     }
//   }

