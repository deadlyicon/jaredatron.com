const uuid = require('uuid')
const { pg } = require('../../database')

module.exports = async function loginCommand({ password }){
  const sessionId = uuid()

  await pg
    .table('sessions')
    .insert({
      session_id: sessionId,
      created_at: new Date,
      updated_at: new Date,
    })
    .returning('*')

  return { sessionId }
}
