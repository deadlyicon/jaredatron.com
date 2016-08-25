export default {
  getWikiPage: function(path){
    return Promise.resolve({
      path: path,
      markdown: `
# ${path}

[one](/wiki/one)

[two](/wiki/two)

[three](/wiki/three)
      `
    })
  },

  updateWikiPage: function(path, newValue){
    return Promise.resolve({
      path: path,
      markdown: newValue,
    })
  }
}
