import { executeCommand } from 'lib/server'

export async function restoreSession({ }){

}

export async function login({ password }){
  this.setState({
    loggingIn: true,
    loginError: undefined,
  })
  try{
    const response = await executeCommand('login', { password })
    console.log({ response })
  }catch(loginError){
    this.setState({ loginError })
  }finally{
    this.setState({
      loggingIn: undefined
    })
  }
}
