// import App from 'lib/App'
import history from 'lib/history'
import { initializeAppState } from 'lib/appState'
import * as actions from './actions'

initializeAppState(function(){

  this.defineActions(actions)

  // this.takeAction('setScreenSize')
  // this.takeAction('restoreSession')
  this.takeAction('location.publish')

  // window.addEventListener('popstate', () => {
  history.subscribe(() => {
    this.takeAction('location.publish')
  })

  // api.on('unauthorized', () => {
  //   console.warn('logging out because of unauthorized error')
  //   this.takeAction('logout', {post: false})
  // })

  window.addEventListener('beforeunload', (event) => {
    const state = this.getState()
    const hasUnsavedChanges = Object.keys(state).some(key =>
      key.match(/^wiki:.*:edits$/)
    )
    if (hasUnsavedChanges) {
      return event.returnValue = "Are you sure you want to reload? Changes you've made will not be saved."
    }
  })

  // window.addEventListener('resize', () => {
  //   this.takeAction('setScreenSize')
  // })

})

// const app = new App(function() {
//   this.defineActions(actions)
//   this.takeAction('publishLocation')
// })

// export default app
