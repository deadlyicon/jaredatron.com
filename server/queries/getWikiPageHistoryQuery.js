const { pg } = require('../../database')

module.exports = async function getWikiPageCommand({ logger, path }){
  const wikiPage = await pg
    .select('*')
    .from('versions')
    .where('item_type', 'Wiki::Page')
    .where({path})
  return { wikiPage }
}
