export async function filterWikiIndex({ filter }){
  // console.log({ wikiIndexFilter: filter })
  this.setState({ wikiIndexFilter: filter })
  // const { wikiIndex } = this.getState()

  // if (wikiIndex) return;

  // try{
  //   const { wikiIndex } = await executeCommand('getWikiIndex')
  //   wikiIndex.pages.forEach(page => {
  //     page.last_viewed_at = moment(page.last_viewed_at).toDate()
  //     page.updated_at = moment(page.updated_at).toDate()
  //   })
  //   this.setState({ wikiIndex })
  // }catch(errorLoadingWikiIndex){
  //   this.setState({ errorLoadingWikiIndex })
  // }
}
