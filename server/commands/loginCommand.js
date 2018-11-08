module.exports = async function loginCommand({ password }){
  if (password !== process.env.PASSWORD)
    throw new Error('nope')

  return {
    sessionId: 'asdsadsadsasadsad',
  }
}
