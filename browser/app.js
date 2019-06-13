import history from 'lib/history'
import { initializeAppState } from 'lib/appState'
import * as actions from './actions'

initializeAppState(function(){

  this.defineActions(actions)

  this.takeAction('auth.restoreSession')

  history.subscribe(() => {
    this.takeAction('router.update')
  })
  this.takeAction('router.update')

  window.addEventListener('online',  event => {
    console.log('INTERNET on');
  });
  window.addEventListener('offline', event => {
    console.log('INTERNET off');
  });

  window.addEventListener('beforeunload', (event) => {
    const state = this.getState()
    const hasUnsavedChanges = Object.keys(state).some(key =>
      key.match(/^wiki:.*:edits$/)
    )
    if (hasUnsavedChanges) {
      return event.returnValue = "Are you sure you want to reload? Changes you've made will not be saved."
    }
  })

})
