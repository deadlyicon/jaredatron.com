export default {
  getWikiPage: function(path){
    return Promise.resolve({
      path: path,
      content: `<h1>hello from ${path}</h1>`
    })
  },
}
