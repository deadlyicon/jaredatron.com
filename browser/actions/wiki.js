import moment from 'moment'
import { executeCommand } from 'lib/server'

export async function loadIndex(){
  const key = `wiki:index`
  const errorKey = `wiki:index:error`
  const { [key]: wikiIndex } = this.getState()

  if (wikiIndex) return;

  try{
    const { wikiIndex } = await executeCommand('getWikiIndex')
    wikiIndex.pages.forEach(page => {
      page.last_viewed_at = moment(page.last_viewed_at).toDate()
      page.updated_at = moment(page.updated_at).toDate()
    })
    this.setState({ [key]: wikiIndex })
  }catch(error){
    this.setState({ [errorKey]: error })
  }
}


export async function loadPage({ path }){
  const key = `wiki:page:${path}`
  const loadingKey = `wiki:page:${path}:loading`
  const errorLoadingKey = `wiki:page:${path}:loadingError`

  const { [key]: wikiPage } = this.getState()

  if (wikiPage) return;

  this.setState({ [loadingKey]: true })

  try{
    const { wikiPage } = await executeCommand('getWikiPage', { path })
    this.setState({ [key]: wikiPage })
  }catch(error){
    this.setState({ [errorLoadingKey]: error })
  }finally{
    this.setState({ [loadingKey]: undefined })
  }
}

export async function stagePageChange({ path, content }){
  this.setState({ [`wiki:page:${path}:stagedContent`]: content })
}
