import React from 'react'
import PropTypes from 'prop-types'
import { takeAction } from 'lib/appState'
import Page from 'components/Page'

export default class NotFoundPage extends Page {

  render(){
    return <div className="NotFoundPage">
      <h1>Page Not Found {this.props.location.pathname}</h1>
    </div>
  }
}
