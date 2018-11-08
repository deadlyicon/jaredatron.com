import { executeCommand } from 'lib/server'

export async function restoreSession({ }){
  const { sessionId } = sessionStorage
  if (!sessionId) return
  this.setState({
    loggedIn: true,
    sessionId,
  })
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
      sessionId,
    })
    sessionStorage.sessionId = sessionId
  }catch(loginError){
    this.setState({ loginError })
  }finally{
    this.setState({
      loggingIn: undefined
    })
  }
}
