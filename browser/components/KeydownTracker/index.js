import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const HISTORY_SIZE = 10

export default class KeydownTracker extends PureComponent {

  componentDidMount(){
    this.clear()
    document.addEventListener('keydown', this.onDocumentKeyDown)
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.onDocumentKeyDown)
  }

  store(event){
    this.lastKeyDown = event
    this.history.unshift(event)
    if (this.history.length > HISTORY_SIZE)
      this.history.length = HISTORY_SIZE
  }

  clear(){
    this.history = []
    this.lastKeyDown = null
  }

  onDocumentKeyDown = event => {
    const { target, metaKey, shiftKey, key } = event
    if (['INPUT', 'TEXTAREA'].includes(target.nodeName)) return
    if (!key.match(/[a-z0-9]/i)) return

    const combos = Object.entries(this.props)

    for(const [combo, callback] of combos){
      if (combo === 'children') continue
      const sequence = combo.split('-').reverse()
      if (sequence[0] !== key) continue
      sequence.shift()
      let sequenceMatch = true
      for (const index in sequence){
        const step = sequence[index]
        const event = this.history[index]
        if (step === event.key) continue
        sequenceMatch = false
        break
      }
      if (!sequenceMatch) continue

      // MATCH
      event.preventDefault()
      this.clear()
      callback()
    }

    this.store(event)

    // if (key.match(/[a-z]/i)){
    // }else{
    //   this.clear()
    // }

    // if (metaKey && !shiftKey){
    //   if (key === 'e') {
    //     event.preventDefault()
    //     this.state.editing ? this.cancel() : this.edit()
    //   }
    // }
  }

  render(){
    return this.props.children
  }
}