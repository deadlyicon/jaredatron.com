const { pg } = require('../../database')

module.exports = async function getWikiPageCommand({ logger, path }){
  const wikiPage = await pg.select('*').from('wiki_pages').where({path}).first()
  return { wikiPage }
}
