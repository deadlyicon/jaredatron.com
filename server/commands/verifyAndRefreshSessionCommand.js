const { pg } = require('../../database')

module.exports = async function verifyAndRefreshSession({ sessionId }){

  const qr = await pg
    .table('sessions')
    .update({ updated_at: new Date })
    .where({ session_id: sessionId })
    .returning('*')

  if (qr.length === 0) throw new Error('Invalid sessionId')

  return true
}
