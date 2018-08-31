import React, { Component } from 'react'
import InspectObject from 'components/InspectObject'

export default class View extends Component {

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  componentDidMount(){
    this.props.app.subscribe(this.onStateChange)
  }

  componentWillUnmount(){
    this.props.app.unsubscribe(this.onStateChange)
  }

  onStateChange = () => {
    this.forceUpdate()
  }

  render(){
    const { app } = this.props
    const appState = app.getState()

    return <div>
      <h1>hello from react</h1>
      <InspectObject object={appState} />
    </div>
  }
}
