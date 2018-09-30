const YAML = require('js-yaml')
const { pg } = require('../../database')

module.exports = async function getWikiPageQuery({ logger, path }){
  const { id } = await pg
    .select('id')
    .from('wiki_pages')
    .where({path})
    .first()

  const versions = await pg
    .select('id', 'created_at', 'object')
    .from('versions')
    .whereRaw('object IS NOT NULL')
    .where({
      item_type: 'Wiki::Page',
      item_id: id,
    })
    .orderBy('created_at', 'desc')
    .limit(100)

  const wikiPageHistory = versions
    .map(({ id, object, created_at }) => {
      const { content, path } = YAML.load(object)
      return { id, created_at, content, path };
    })

  return { wikiPageHistory }
}

