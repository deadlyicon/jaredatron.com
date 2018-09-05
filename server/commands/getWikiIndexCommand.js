const { pg } = require('../../database')

module.exports = async function getWikiIndexCommand({ logger }){
  const pages = await pg.select('path', 'updated_at', 'last_viewed_at').from('wiki_pages')
  logger.debug({ pages })

  return { wikiIndex: { pages } }
}
