import React, { Component, PureComponent } from 'react'
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
  // logger.debug('appState', appState)
  if (changedKeys.size === 0) return
  const changedKeysCache = new Set(changedKeys)
  changedKeys.clear()
  subscribers.forEach(handler => { handler(changedKeysCache, appState) })
}

let waitingForNextTick = false
const publishOnNextTick = function(){
  if (waitingForNextTick) return
  waitingForNextTick = true
  window.setTimeout(() => {
    waitingForNextTick = false
    publish()
  })
}

// let waitingForRequestAnimationFrame = false
// const publishOnNextAnimationFrame = function(){
//   if (waitingForRequestAnimationFrame) return
//   waitingForRequestAnimationFrame = true
//   window.requestAnimationFrame(() => {
//     waitingForRequestAnimationFrame = false
//     publish()
//   })
// }

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

const getState = function(actor){
  // logger.trace(`[appState][${actor}].getState`)
  return appState
}

const actorToString = actor => {
  console.log('actorToString', [actor])
  if (typeof actor === 'string') return actor
  if (actor instanceof Component){
    const name = actor.constructor.name ||
      actor.constructor.toString().match(/^function ([^\( ]+)/)[1]
    return `<${name} />`
  }
  return String(actor)
}

const setState = function(actor, changes){
  actor = actorToString(actor)
  logger.debugWithObjectCollapsed(`[appState][${actor}].setState`, changes)
  Object.entries(changes).forEach(([key, value]) => {
    changedKeys.add(key)
    if (typeof value === 'undefined'){
      delete appState[key]
    }else{
      appState[key] = value
    }
  })
  // publishOnNextAnimationFrame()
  // publishOnNextTick()
  publish()
}

const resetState = function(actor) {
  actor = actorToString(actor)
  logger.trace(`[appState][${actor}].resetState`)
  appState = {}
}

// const defineAction = function(actionName, action){
//   if (actionName in appActions){
//     throw new Error(`[appState] action "${actionName}" is already defined`)
//   }
//   // TODO move createContext from defineActions to takeAction
//   appActions[actionName] = action.bind(createContext(`actions.${actionName}`))
// }

export const takeAction = async function(actor, actionName, ...args){
  actor = actorToString(actor)
  try{
    logger.debug(`[appState][${actor}].takeAction`, actionName, args)
    const parts = actionName.split('.')
    let actionFunc
    if (parts.length === 1){
      actionFunc = appActions[parts[0]]
    }else{
      const controller = appActions[parts[0]] || {}
      actionFunc = controller[parts[1]]
    }
    if (typeof actionFunc !== 'function')
      throw new Error(`[appState] ${actor} called undefined action "${actionName}"`)
    const context = createContext(`actions.${actionName}`)
    return await actionFunc.call(context, ...args)
    // let actions = appActions
    // let action
    // do{ actions = appActions[parts.shift()] }while(parts.length > 0)

    // const action = appActions[actionName]
    // if (!action) throw new Error(
    //   `[appState] ${actor} called undefined action "${actionName}"`
    // )
    // return await appActions[actionName](...args)
  }catch(error){
    logger.debug(`[appState][${actor}].takeAction`, actionName, args, 'FAILED!')
    logger.error(error)
  }
}

export const appAction = (actor, actionName, ...boundArgs) => {
  return (...args) => takeAction(actor, actionName, ...[...boundArgs, ...args])
}


const defineActions = function(actions){
  Object.assign(appActions, actions)
  // Object.entries(actions).forEach(([actionName, action]) => {
  //   defineAction(actionName, action)
  // })
}

const componentName = component => {
  const name = component.constructor.name ||
    component.constructor.toString().match(/^function ([^\( ]+)/)[1]
  return `<${name} />`
}

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
    this.renderCount = 0
    subscribe(this.onAppStateChange)
  }

  componentWillUnmount(){
    unsubscribe(this.onAppStateChange)
  }

  onAppStateChange = (changedKeys) => {
    const keys = this.getKeys()
    const ourChangedKeys = keys.filter(key => changedKeys.has(key))
    if (ourChangedKeys.length > 0) {
      // logger.debug(`AppState rerendeing keys=${JSON.stringify(ourChangedKeys)}`)
      this.forceUpdate()
    }
  }

  getKeys(){
    const { keys } = this.props
    return Array.isArray(keys) ? keys : Object.values(keys)
  }

  getKeyMap(){
    const { keys } = this.props
    return Array.isArray(keys)
      ? keys.map(key => [key, key])
      : Object.entries(keys)
  }

  getAppState(){
    return this.getKeyMap().reduce((state, [leftKey, rightKey]) => {
      state[leftKey] = appState[rightKey]
      return state
    }, {})
  }

  render(){
    this.renderCount++
    // console.log('AppState.render', this.props.keys, this.renderCount)
    const appState = this.getAppState()
    console.log('???', this, appState)
    // get keys from subsription
    return this.props.children(appState)
  }

}

// export const takeAction = (actionName, ...args) => {
//   return takeAction(componentName(this), actionName, ...args)
// }

// appAction = (actionName, ...boundArgs) => {
//   return (...args) => this.takeAction(actionName, ...[...boundArgs, ...args])
// }

// DEBUG
window.DEBUG = window.DEBUG || {}
window.DEBUG.getState = () => appState
window.DEBUG.appActions = appActions
window.DEBUG.changedKeys = changedKeys
window.DEBUG.publish = publish
