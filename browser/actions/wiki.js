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
  const key         = `wiki:page:${path}`
  const loadingKey  = `wiki:page:${path}:loading`
  const errorKey    = `wiki:page:${path}:error`
  const notFoundKey = `wiki:page:${path}:notFound`

  const { [key]: wikiPage } = this.getState()

  if (wikiPage) return;

  this.setState({
    [loadingKey]: true,
    [errorKey]: undefined,
    [notFoundKey]: undefined,
  })

  try{
    const { wikiPage } = await executeCommand('getWikiPage', { path })
    if (wikiPage){
      this.setState({ [key]: wikiPage })
    }else{
      this.setState({ [notFoundKey]: true })
    }
  }catch(error){
    this.setState({ [errorKey]: error })
  }finally{
    this.setState({ [loadingKey]: undefined })
  }
}

export async function editPage({ path, content }){
  this.setState({ [`wiki:page:${path}:editing`]: true })
}

export async function cancelEditPage({ path, content }){
  this.setState({ [`wiki:page:${path}:editing`]: undefined })
}

export async function updatePageEdits({ path, edits }){
  this.setState({ [`wiki:page:${path}:edits`]: edits })
}

export async function deletePageEdits({ path }){
  this.setState({ [`wiki:page:${path}:edits`]: undefined })
}

export async function savePageEdits({ path }){
  const key         = `wiki:page:${path}`
  const savingKey  = `wiki:page:${path}:saving`
  const editsKey    = `wiki:page:${path}:edits`
  const errorKey    = `wiki:page:${path}:error`

  const { [editsKey]: content } = this.getState()
  if (!content) return
  this.setState({
    [savingKey]: true,
  })
  try{
    const { wikiPage } = await executeCommand('updateWikiPage', { path, content })
    this.setState({
      [key]: wikiPage,
      [editsKey]: undefined,
    })
  }catch(error){
    this.setState({ [errorKey]: error })
  }finally{
    this.setState({ [savingKey]: undefined })
  }
}
