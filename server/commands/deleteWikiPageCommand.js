const { pg } = require('../../database')

module.exports = async function deleteWikiPageCommand({ logger, path }){
  await pg.table('wiki_pages').where({ path }).delete()
  return { }
}
