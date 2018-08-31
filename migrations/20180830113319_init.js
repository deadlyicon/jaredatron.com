exports.up = async function(knex, Promise) {

  await knex.schema.createTable('journal_entries', t => {
    t.increments()
    t.text('body')
    t.timestamps()
  })

  await knex.schema.createTable('trackings', t => {
    t.increments()
    t.string('type')
    t.text('data')
    t.timestamps()
    t.index(['type'], 'index_trackings_on_type', 'btree')
  })

  await knex.schema.createTable('versions', t => {
    t.increments()
    t.string('item_type').notNullable()
    t.integer('item_id').notNullable()
    t.string('event').notNullable()
    t.string('whodunnit')
    t.text('object')
    t.datetime('created_at')
    t.index(['item_type', 'item_id'], 'index_versions_on_item_type_and_item_id', 'btree')
  })

  await knex.schema.createTable('wiki_pages', t => {
    t.string('path', 256).unique()
    t.text('content')
    t.datetime('last_viewed_at')
    t.timestamps()
  })

}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('journal_entries')
  await knex.schema.dropTable('trackings')
  await knex.schema.dropTable('versions')
  await knex.schema.dropTable('wiki_pages')
}
