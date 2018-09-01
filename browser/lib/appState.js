import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logger from 'lib/logger'

let appState = {}
const appActions = {}
let subscribers = []

const subscribeToStateChange = function(handler){
  subscribers.push(handler)
}

const unsubscribeFromStateChange = function(handler){
  subscribers = subscribers.filter(h =>
    h !== handler
  )
}

const publish = function(){
  logger.trace(`[appState].publish`)
  subscribers.forEach(handler => {
    handler(appState)
  })
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
    takeAction(...args){
      return takeAction(actor, ...args)
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
  Object.assign(appState, changes)
  Object.keys(appState).forEach(key => {
    if(typeof appState[key] === 'undefined') delete appState[key]
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

const takeAction = function(actor, actionName, ...args){
  logger.debug(`[appState][${actor}].takeAction`, actionName, args)
  const action = appActions[actionName]
  if (!action) throw new Error(
    `[appState] ${actor} called undefined action "${actionName}"`
  )
  return appActions[actionName](...args)
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

export class StatefulComponent extends Component {
  getAppState(){
    return getState(componentName(this))
  }

  appAction(actionName, ...boundArgs){
    return (...args) => this.takeAction(actionName, ...[...boundArgs, ...args])
  }

  takeAction(actionName, ...args){
    return takeAction(componentName(this), actionName, ...args)
  }
}

// DEBUG
window.DEBUG = window.DEBUG || {}
window.DEBUG.getState = () => appState
window.DEBUG.appActions = appActions
window.DEBUG.publish = publish
