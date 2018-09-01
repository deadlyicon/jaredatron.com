import { executeCommand } from 'lib/server'


export async function login({ password }){
  console.log({ password })
  const response = await executeCommand('login', { password })
  console.log({ response })
}
