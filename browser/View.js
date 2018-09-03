import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AppState } from 'lib/appState'
import LoginPage from './pages/LoginPage'
import InspectObject from 'components/InspectObject'

export default class View extends Component {

  render(){
    console.warn('View rerender !?!?!')
    return <AppState keys={['location','currentUser']}>
      {({location, currentUser}) => {
        const props = { location }
        if (!currentUser) return <LoginPage {...props} />
        return <div>
          <h1>welcome back</h1>
        </div>
      }}
    </AppState>
  }

}
