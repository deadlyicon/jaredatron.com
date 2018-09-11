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
  const pageKey     = `wiki:page:${path}`
  const loadingKey  = `wiki:page:${path}:loading`
  const errorKey    = `wiki:page:${path}:error`

  const { [pageKey]: wikiPage } = this.getState()

  if (typeof wikiPage !== 'undefined') return;

  this.setState({
    [loadingKey]: true,
    [errorKey]: undefined,
  })

  try{
    const { wikiPage } = await executeCommand('getWikiPage', { path })
    if (wikiPage){
      this.setState({ [pageKey]: wikiPage })
    }else{
      this.setState({ [pageKey]: null })
      if (path.includes(' ')) {
        const pathname = `/wiki/${encodeURIComponent(path.replace(/\s+/g,'-'))}`
        this.takeAction('replaceLocation', { pathname })
      }
    }
  }catch(error){
    this.setState({ [errorKey]: error })
  }finally{
    this.setState({ [loadingKey]: undefined })
  }
}

export async function updatePageEdits({ path, edits }){
  this.setState({ [`wiki:page:${path}:edits`]: edits })
}

export async function deletePageEdits({ path }){
  this.setState({ [`wiki:page:${path}:edits`]: undefined })
}

export async function savePageEdits({ path }){
  const pageKey   = `wiki:page:${path}`
  const savingKey = `wiki:page:${path}:saving`
  const editsKey  = `wiki:page:${path}:edits`
  const errorKey  = `wiki:page:${path}:error`

  const {
    [pageKey]: page,
    [editsKey]: content,
  } = this.getState()

  if (!content) return

  this.setState({
    [savingKey]: true,
  })
  try{
    const { wikiPage } = await executeCommand(
      page ? 'updateWikiPage' : 'createWikiPage',
      { path, content },
    )
    this.setState({
      [pageKey]: wikiPage,
      [editsKey]: undefined,
      [errorKey]: undefined,
    })
  }catch(error){
    this.setState({ [errorKey]: error })
  }finally{
    this.setState({ [savingKey]: undefined })
  }
}

export async function deletePage({ path }){
  const pageKey     = `wiki:page:${path}`
  const deletingKey = `wiki:page:${path}:deleting`
  const errorKey    = `wiki:page:${path}:error`

  const { [pageKey]: page } = this.getState()

  if (!page) return

  this.setState({
    [deletingKey]: true,
  })
  try{
    await executeCommand('deleteWikiPage', { path })
    this.setState({
      [pageKey]: null,
      [errorKey]: undefined,
    })
  }catch(error){
    this.setState({ [errorKey]: error })
  }finally{
    this.setState({ [deletingKey]: undefined })
  }
}
