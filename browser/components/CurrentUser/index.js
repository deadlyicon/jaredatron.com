import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppStateContext from '../../appState'
import InspectObject from 'components/InspectObject'
import './index.sass'

export default class CurrentUser extends Component {

  render(){
    return (
      <AppStateContext.Consumer>
        {state => <InspectObject object={state} />}
      </AppStateContext.Consumer>
    )
  }
}
