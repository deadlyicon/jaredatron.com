import { setSessionId, takeAction } from 'lib/server'

export async function restoreSession(){
  this.setState({ loggedIn: !!localStorage.sessionId })
}

export async function login({ password }){
  this.setState({
    loggingIn: true,
    loginError: undefined,
  })
  try{
    const { sessionId } = await takeAction('login', { password })
    setSessionId(sessionId)
    this.setState({
      loggedIn: true,
      loginError: undefined,
    })
  }catch(loginError){
    console.error(loginError)
    this.setState({ loginError })
  }finally{
    this.setState({
      loggingIn: undefined,
    })
  }
}

export async function logout(){
  setSessionId(undefined)
  this.setState({
    loggedIn: false,
    loginError: undefined,
  })
}