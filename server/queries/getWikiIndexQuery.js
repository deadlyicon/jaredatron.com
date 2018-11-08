const { pg } = require('../../database')

module.exports = async function getWikiIndexQuery({ logger }){
  const pages = await pg
    .select('path', 'updated_at', 'last_viewed_at')
    .from('wiki_pages')
  return { wikiIndex: { pages } }
}
