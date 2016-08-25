import { WikiPage } from './database'

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

export default {
  getWikiPage,
  updateWikiPage,
}
