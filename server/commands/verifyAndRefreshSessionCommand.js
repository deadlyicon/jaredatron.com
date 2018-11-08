const { pg } = require('../../database')

module.exports = async function verifyAndRefreshSession({ sessionId }){

  const [ qr ] = await pg
    .table('sessions')
    .where({ session_id: sessionId })
    .count()

  console.log('verifyAndRefreshSession', { sessionId, qr })
  if (qr.count === 0) throw new Error('Invalid sessionId')

  return true
}
