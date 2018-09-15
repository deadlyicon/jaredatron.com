import moment from 'moment'
import { executeQuery, executeCommand } from 'lib/server'

export async function loadIndex(){
  const key = `wiki:index`
  const errorKey = `wiki:index:error`
  try{
    const { wikiIndex } = await executeQuery('getWikiIndex')
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
    const { wikiPage } = await executeQuery('getWikiPage', { path })
    if (wikiPage){
      this.setState({ [pageKey]: wikiPage })
    }else{
      this.setState({ [pageKey]: null })
      if (path.includes(' ')) {
        this.takeAction(
          'replaceLocation',
          `/wiki/${encodeURIComponent(path.replace(/\s+/g,'-'))}`
        )
      }
    }
  }catch(error){
    this.setState({ [errorKey]: error })
  }finally{
    this.setState({ [loadingKey]: undefined })
  }
}

export async function updatePageEdits({ path, edits }){
  const page = this.getState()[`wiki:page:${path}`]
  if (page && page.content === edits) edits = undefined
  this.setState({ [`wiki:page:${path}:edits`]: edits })
}

export async function deletePageEdits({ path }){
  this.setState({ [`wiki:page:${path}:edits`]: undefined })
}

export async function movePage({ path, newPath }){
  const pageKey   = `wiki:page:${path}`
  const movingKey = `wiki:page:${path}:moving`
  const errorKey  = `wiki:page:${path}:moving:error`

  this.setState({ [movingKey]: true })
  try{
    const { wikiPage } = await executeCommand('moveWikiPage', { path, newPath })
    this.setState({
      [pageKey]: null,
      [`wiki:page:${wikiPage.path}`]: wikiPage,
      [errorKey]: undefined,
    })
    this.takeAction('replaceLocation', `/wiki/${wikiPage.path}`)
  }catch(error){
    this.setState({ [errorKey]: error })
  }finally{
    this.setState({ [movingKey]: undefined })
  }
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


export async function loadPageHistory({ path }) {
  const pageKey    = `wiki:page:${path}`
  const historyKey = `wiki:page:${path}:history`
  const loadingKey = `wiki:page:${path}:history:loading`
  const errorKey   = `wiki:page:${path}:history:loading:error`


  const { [historyKey]: history } = this.getState()

  if (history) return

  this.setState({
    [loadingKey]: true,
    [errorKey]: undefined,
  })
  try{
    const { wikiPageHistory } = await executeQuery('getWikiPageHistory', { path })
    wikiPageHistory.forEach(version => {
      // version.created_at = moment(version.created_at).toDate()
    })
    this.setState({ [historyKey]: wikiPageHistory })
  }catch(error){
    this.setState({ [errorKey]: error })
  }finally{
    this.setState({ [loadingKey]: undefined })
  }
}
