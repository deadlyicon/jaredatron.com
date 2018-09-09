const { pg } = require('../../database')

module.exports = async function cresteWikiPageCommand({ logger, path, content }){
  const [ wikiPage ] = await pg.table('wiki_pages').insert({ path, content }).returning('*')
  return { wikiPage }
}
