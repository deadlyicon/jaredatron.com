module.exports = async function getWikiPageCommand({ path }){
  // if (password === process.env.PASSWORD)
  // throw new Error('FUUUCK')

  return {
    wikiPage: {
      source: `source for page ${path} :D`,
    },
  }
}
