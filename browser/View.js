import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { StatefulComponent } from 'lib/appState'
import LoginPage from './pages/LoginPage'
import InspectObject from 'components/InspectObject'

export default class View extends StatefulComponent {

  static appState = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      params: PropTypes.object.isRequired,
    }).isRequired,
    currentUser: PropTypes.func.isRequired,
  }
  render(){
    const {
      location,
      currentUser,
    } = this.getAppState()

    const props = { location }

    if (!currentUser) return <LoginPage {...props} />

    return <div>
      <h1>hello from react</h1>
      <InspectObject object={appState} />
    </div>
  }
}
