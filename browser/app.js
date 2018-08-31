import App from 'lib/App'
import * as actions from './actions'

const app = new App(function() {
  this.defineActions(actions)
  this.takeAction('publishLocation')
})

export default app
