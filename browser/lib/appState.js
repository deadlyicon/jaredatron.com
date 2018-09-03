import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import logger from 'lib/logger'

let appState = {}
const changedKeys = new Set
const appActions = {}

let subscribers = []
const subscribe = function(handler){
  subscribers.push(handler)
}
const unsubscribe = function(handler){
  subscribers = subscribers.filter(h => h !== handler)
}
const publish = function(){
  logger.trace(
    '[appState].publish subscribers:',
    subscribers.length,
    'changedKeys:',
    JSON.stringify(Array.from(changedKeys)),
  )
  if (changedKeys.size === 0) return
  subscribers.forEach(handler => { handler(changedKeys, appState) })
  changedKeys.clear()
}

let waitingForRequestAnimationFrame = false
const publishOnNextAnimationFrame = function(){
  if (waitingForRequestAnimationFrame) return
  waitingForRequestAnimationFrame = true
  window.requestAnimationFrame(() => {
    waitingForRequestAnimationFrame = false
    publish()
  })
}

const createContext = actor => {
  return {
    getState(...args){
      return getState(actor, ...args)
    },
    setState(...args){
      return setState(actor, ...args)
    },
    resetState(...args){
      return resetState(actor, ...args)
    },
    async takeAction(...args){
      return await takeAction(actor, ...args)
    },
  }
}

export const initializeAppState = function(initializer){
  const context = createContext('initializeAppState')
  delete context.setState
  context.defineActions = defineActions
  initializer.call(context)
}

const getState = function(){
  // logger.trace(`[appState][${actor}].getState`)
  return appState
}

const setState = function(actor, changes){
  logger.debugWithObjectCollapsed(`[appState][${actor}].setState`, changes)
  Object.entries(changes).forEach(([key, value]) => {
    changedKeys.add(key)
    if (typeof value === 'undefined'){
      delete appState[key]
    }else{
      appState[key] = value
    }
  })
  publishOnNextAnimationFrame()
}

const resetState = function(actor) {
  logger.trace(`[appState][${actor}].resetState`)
  appState = {}
}

const defineAction = function(actionName, action){
  if (actionName in appActions){
    throw new Error(`[appState] action "${actionName}" is already defined`)
  }
  appActions[actionName] = action.bind(createContext(`actions.${actionName}`))
}

const takeAction = async function(actor, actionName, ...args){
  try{
    logger.debug(`[appState][${actor}].takeAction`, actionName, args)
    const action = appActions[actionName]
    if (!action) throw new Error(
      `[appState] ${actor} called undefined action "${actionName}"`
    )
    return await appActions[actionName](...args)
  }catch(error){
    logger.debug(`[appState][${actor}].takeAction`, actionName, args, 'FAILED!')
    logger.error(error)
  }
}

const defineActions = function(actions){
  Object.entries(actions).forEach(([actionName, action]) => {
    defineAction(actionName, action)
  })
}

// export class AppStateProvider extends Component {
//   static propTypes = {
//     children: PropTypes.func.isRequired
//   }
//   componentDidMount(){
//     subscribeToStateChange(this.onStateChange)
//   }
//   componentWillUnmount(){
//     unsubscribeFromStateChange(this.onStateChange)
//   }
//   onStateChange = () => {
//     this.forceUpdate()
//   }
//   render(){

//     getAppState: PropTypes.func.isRequired,
//     appAction: PropTypes.func.isRequired,
//     takeAction: PropTypes.func.isRequired,
//     return this.props.children({
//       getAppState
//       appAction
//       takeAction
//     })
//   }
// }

const componentName = component => {
  const name = component.constructor.name ||
    component.constructor.toString().match(/^function ([^\( ]+)/)[1]
  return `<${name} />`
}


// export class StatefulComponent extends Component {
//   getAppState(){
//     return getState(componentName(this))
//   }

//   appAction(actionName, ...boundArgs){
//     return (...args) => this.takeAction(actionName, ...[...boundArgs, ...args])
//   }

//   takeAction(actionName, ...args){
//     return takeAction(componentName(this), actionName, ...args)
//   }
// }

// let subscriptions = []
// const createAppStateSubscription = function(component) {
//   // // props.keys,
//   // // () => { this.forceUpdate() },
//   // const subscription = new Subscription
//   // subscription.component = component
//   // // subscription.publish = rerender
//   // // subscription.setKeys(keys)
//   subscriptions.push(component)
//   console.log('[appState] new subscription', component)
//   // return subscription
// }
// const cancelAppStateSubscription = function(component) {
//   subscriptions = subscriptions.filter(c => c !== component)
//   console.log('[appState] canceled subscription', component)
// }

// class Subscription {
//   setKeys(keys){
//     this.keys = Array.isArray(keys)
//       ? keys.map(key => [key, key])
//       : Object.entries(keys)
//   }
//   getKeys(){
//     const appState = getState(componentName(this.component))
//     return this.keys.reduce((state, [rightKey, leftKey]) => {
//       state[leftKey] = appState[rightKey]
//       return state
//     }, {})
//   }
// }


export class AppState extends PureComponent {

  static propTypes = {
    keys: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape({
      }),
    ]).isRequired
  }

  constructor(props){
    super()
    subscribe(this.onAppStateChange)
  }

  componentWillUnmount(){
    unsubscribe(this.onAppStateChange)
  }

  onAppStateChange = (changedKeys) => {
    const keys = this.getKeys()
    const ourChangedKeys = keys.filter(key => changedKeys.has(key))
    if (ourChangedKeys.length > 0) {
      console.log(`AppState rerendeing keys=${JSON.stringify(ourChangedKeys)}`)
      this.forceUpdate()
    }
  }

  getKeys(){
    const { keys } = this.props
    return Array.isArray(keys) ? keys : Object.keys(keys)
  }

  getKeyMap(){
    const { keys } = this.props
    return Array.isArray(keys)
      ? keys.map(key => [key, key])
      : Object.entries(keys)
  }

  getAppState(){
    return this.getKeyMap().reduce((state, [rightKey, leftKey]) => {
      state[leftKey] = appState[rightKey]
      return state
    }, {})
  }

  takeAction = (actionName, ...args) => {
    return takeAction(componentName(this), actionName, ...args)
  }

  appAction = (actionName, ...boundArgs) => {
    return (...args) => this.takeAction(actionName, ...[...boundArgs, ...args])
  }

  render(){
    const appState = this.getAppState()
    // console.log('AppState.render', this.props.keys, appState)
    // get keys from subsription
    return this.props.children({
      ...appState,
      appAction: this.appAction,
      takeAction: this.takeAction,
    })
  }

}


// DEBUG
window.DEBUG = window.DEBUG || {}
window.DEBUG.getState = () => appState
window.DEBUG.appActions = appActions
window.DEBUG.changedKeys = changedKeys
window.DEBUG.publish = publish
