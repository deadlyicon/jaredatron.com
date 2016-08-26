import { WikiPage, JournalEntry } from './models'

const createWikiPage = function(path){
  return WikiPage.create({
    path: path,
    markdown: '',
  })
}

const getWikiPage = function(path){
  return WikiPage.findOne({
    where: {path: path}
  })
}

const updateWikiPage = function(path, newValue){
  return getWikiPage(path)
    .then(wikiPage => {
      return wikiPage.update({
        markdown: newValue
      })
    })
}

const getJournalEntries = function(){
  return JournalEntry.findAll()
}

const getJournalEntry = function(journalEntryId){
  return JournalEntry.findById(journalEntryId)
}

export default {
  createWikiPage,
  getWikiPage,
  updateWikiPage,
  getJournalEntries,
  getJournalEntry,
}
