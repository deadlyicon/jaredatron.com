const { pg } = require('../../database')

module.exports = async function getWikiPageQuery({ logger, path }){
  const [ wikiPage ] = await pg
    .table('wiki_pages')
    .update({
      last_viewed_at: new Date,
    })
    .where({path})
    .limit(1)
    .returning('*')

    logger.debug({ wikiPage })
  return { wikiPage }
}
