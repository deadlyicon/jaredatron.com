import { executeCommand } from 'lib/server'

export async function loadWikiPage({ path }){
  const key = `wikiPage:${path}`

  const {
    [key]: wikiPage,
  } = this.getState()

  if (wikiPage) return;

  try{
    const response = await executeCommand('getWikiPage', { path })
    console.log({ response })
  }catch(loginError){
    this.setState({ loginError })
  }finally{
    this.setState({
      loggingIn: undefined
    })
  }
}
