import { setSessionId, executeCommand } from 'lib/server'

export async function restoreSession(){
  this.setState({ loggedIn: !!sessionStorage.sessionId })
}

export async function login({ password }){
  this.setState({
    loggingIn: true,
    loginError: undefined,
  })
  try{
    const { sessionId } = await executeCommand('login', { password })
    this.setState({
      loggedIn: true,
    })
    setSessionId(sessionId)
  }catch(loginError){
    this.setState({ loginError })
  }finally{
    this.setState({
      loggingIn: undefined,
    })
  }
}
