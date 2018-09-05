import { executeCommand } from 'lib/server'

export async function loadWikiPage({ path }){
  const key = `wikiPage:${path}`
  const loadingKey = `wikiPage:${path}:loading`
  const errorLoadingKey = `wikiPage:${path}:loadingError`

  const {
    [key]: wikiPage,
  } = this.getState()

  if (wikiPage) return;

  this.setState({ [loadingKey]: true })

  try{
    const { wikiPage } = await executeCommand('getWikiPage', { path })
    console.log('GOOD!', { [key]: wikiPage })
    this.setState({ [key]: wikiPage })
  }catch(error){
    console.log('BAD!!')
    this.setState({ [errorLoadingKey]: error })
  }finally{
    console.log('ALWAYS!!')
    this.setState({ [loadingKey]: undefined })
  }
}
