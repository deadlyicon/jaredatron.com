const { pg } = require('../../database')

module.exports = async function getWikiPageCommand({ logger, path }){
  logger.debug({ path })
  // path = path.replace(/^\/+/,'')

  // await pg.query('SELECT * FROM wiki_pages WHERE path=$1')
  const wikiPage = await pg.select('*').from('wiki_pages').where({path}).first()
  logger.debug({ wikiPage })

  return { wikiPage }
}
