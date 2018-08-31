// import React from 'react'

// class AppStateStore {

//   constructor(){
//     this.subscribers = []
//     this._state = { initializingState: true }
//   }

//   subscribe(callback){
//     this.subscribers.push(callback)
//   }

//   unsubscribe(){
//     this.subscribers = this.subscribers.without(callback)
//   }

//   getState(){
//     return this._state
//   }

//   setState(changes){
//     Object.assign(this._state, changes)
//     this.publishOnNextAnimationFrame()
//   }

//   publishOnNextAnimationFrame(){
//     if (this.waitingForRequestAnimationFrame) return
//     this.waitingForRequestAnimationFrame = true
//     window.requestAnimationFrame(() => {
//       this.waitingForRequestAnimationFrame = false
//       this.publish()
//     })
//   }

//   publish(){
//     this.subscribers.forEach(handler => {
//       handler(this._state)
//     })
//   }

// }

// export default new AppStateStore
