const { pg } = require('../../database')

module.exports = async function getWikiIndexQuery({ logger, loggedIn }){
  console.log('getWikiIndex', { loggedIn })
  if (!loggedIn) throw new Error('must be logged in')
  const pages = await pg
    .select('path', 'updated_at', 'last_viewed_at')
    .from('wiki_pages')
  return { wikiIndex: { pages } }
}
