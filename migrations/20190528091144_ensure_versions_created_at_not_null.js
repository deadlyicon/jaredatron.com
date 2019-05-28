exports.up = async function(knex, Promise) {
  await knex
    .table('versions')
    .update({created_at: new Date})
    .where({created_at: null})
  await knex.schema.alterTable('versions', t => {
    t.datetime('created_at').notNullable().defaultTo(knex.fn.now()).alter()
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.alterTable('versions', t => {
    t.datetime('created_at').nullable().alter()
  })
};
