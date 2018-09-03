import { executeCommand } from 'lib/server'


export async function login({ password }){
  console.log({ password })
  this.setState({[`login:error`]: undefined})
  try{
    const response = await executeCommand('login', { password })
    console.log({ response })
  }catch(error){
    this.setState({[`login:error`]: error})
  }
}
