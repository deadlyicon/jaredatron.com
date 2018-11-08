const YAML = require('js-yaml')
const { pg } = require('../../database')

module.exports = async function updateWikiPage({ logger, path, content }){
  return pg.transaction(async tx => {
    let previousWikiPage = await tx
      .select('*')
      .from('wiki_pages')
      .where({path})
      .first()

    await tx
      .insert({
        item_type: 'Wiki::Page',
        item_id: previousWikiPage.id,
        event: 'update',
        object: YAML.dump(previousWikiPage),
        created_at: new Date,
      })
      .into('versions')

    const [ wikiPage ] = await tx
      .table('wiki_pages')
      .update({
        content,
        updated_at: new Date
      })
      .where({path})
      .returning('*')

    return { wikiPage }
  })
}
