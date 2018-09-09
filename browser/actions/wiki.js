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

  const { [key]: wikiPage } = this.getState()

  if (typeof wikiPage !== 'undefined') return;

  this.setState({
    [loadingKey]: true,
    [errorKey]: undefined,
  })

  try{
    const { wikiPage } = await executeCommand('getWikiPage', { path })
    this.setState({ [key]: (wikiPage || null) })
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
  const key       = `wiki:page:${path}`
  const savingKey = `wiki:page:${path}:saving`
  const editsKey  = `wiki:page:${path}:edits`
  const errorKey  = `wiki:page:${path}:error`

  const {
    [key]: page,
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
      [key]: wikiPage,
      [editsKey]: undefined,
      [errorKey]: undefined,
    })
  }catch(error){
    this.setState({ [errorKey]: error })
  }finally{
    this.setState({ [savingKey]: undefined })
  }
}
