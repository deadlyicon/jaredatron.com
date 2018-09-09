const { pg } = require('../../database')

module.exports = async function updateWikiPageCommand({ logger, path, content }){
  const [ wikiPage ] = await pg.table('wiki_pages').update({ content }).where({path}).returning('*')
  return { wikiPage }
}
