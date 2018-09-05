import moment from 'moment'
import { executeCommand } from 'lib/server'

export async function loadWikiIndex(){
  const { wikiIndex } = this.getState()

  if (wikiIndex) return;

  try{
    const { wikiIndex } = await executeCommand('getWikiIndex')
    wikiIndex.pages.forEach(page => {
      page.last_viewed_at = moment(page.last_viewed_at).toDate()
      page.updated_at = moment(page.updated_at).toDate()
    })
    this.setState({ wikiIndex })
  }catch(errorLoadingWikiIndex){
    this.setState({ errorLoadingWikiIndex })
  }
}
