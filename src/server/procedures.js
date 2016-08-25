import WikiPage from './models/WikiPage'

export default {
  getWikiPage: function(path){
    return WikiPage.findOne({
      where: {path: path}
    })
  },

  updateWikiPage: function(path, newValue){
    return Promise.resolve({
      path: path,
      markdown: newValue,
    })
  }
}
