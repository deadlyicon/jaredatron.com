import logger from 'lib/logger'

export default class App {

  constructor(initializer){
    this.subscribers = []
    this._state = { initializingState: true }
    initializer.call(this.createContext('initializer'))
  }

  subscribe(callback){
    this.subscribers.push(callback)
  }

  unsubscribe(){
    this.subscribers = this.subscribers.without(callback)
  }

  getState(){
    return this._state
  }

  setState(changes){
    logger.debugWithObjectCollapsed(`[setState]`, changes)
    Object.assign(this._state, changes)
    Object.keys(this._state).forEach(key => {
      if (typeof this._state[key] === 'undefined') delete this._state[key]
    })
    this.publishOnNextAnimationFrame()
  }

  resetState(){
    logger.trace(`[resetState]`)
    this._state = {}
  }

  publishOnNextAnimationFrame(){
    if (this.waitingForRequestAnimationFrame) return
    this.waitingForRequestAnimationFrame = true
    window.requestAnimationFrame(() => {
      this.waitingForRequestAnimationFrame = false
      this.publish()
    })
  }

  publish(){
    logger.trace(`[publish]`)
    this.subscribers.forEach(handler => {
      handler(this._state)
    })
  }

  createContext(actor){
    return {
      getState: (...args) => {
        return this.getState(actor, ...args)
      },
      setState: (...args) => {
        return this.setState(actor, ...args)
      },
      resetState: (...args) => {
        return this.resetState(actor, ...args)
      },
      takeAction: (...args) => {
        return this.takeAction(actor, ...args)
      },
    }
  }

  defineAction(actionName, action){
    if (actionName in appActions)
      throw new Error(`action "${actionName}" is already defined`)
    this.actions[actionName] = action
    // .bind(
    //   createContext(`actions.${actionName}`)
    // )
  }

  defineActions(actions){
    // this._actions = actions
    Object.entries(actions).forEach(([actionName, action]) => {
      this.defineAction(actionName, action)
    })
  }

  takeAction(actionName, ...args){
    const context = this.createContext(`[action:${actionName}]`)
    this.actions[actionName].call(context, ...args)
  }

}
