const { pg } = require('../../database')

module.exports = async function createWikiPageCommand({ logger, path, content }){
  const [ wikiPage ] = await pg
    .table('wiki_pages')
    .insert({
      path,
      content,
      last_viewed_at: new Date,
      created_at: new Date,
      updated_at: new Date,
    })
    .returning('*')
  return { wikiPage }
}
