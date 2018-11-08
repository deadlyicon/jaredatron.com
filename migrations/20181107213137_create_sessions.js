exports.up = async function(knex, Promise) {
  await knex.schema.createTable('sessions', t => {
    t.text('session_id')
    t.timestamps()
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('sessions')
};
