import { executeCommand } from 'lib/server'


export async function login({ password }){
  console.log({ password })
  this.setState({ loggedIn: true })
  return
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
