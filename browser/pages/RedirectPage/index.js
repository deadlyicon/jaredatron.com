import React from 'react'
import PropTypes from 'prop-types'
import { takeAction } from 'lib/appState'
import Page from 'components/Page'

export default class RedirectPage extends Page {

  static propTypes = {
    ...Page.propTypes,
    redirectTo: PropTypes.string.isRequired,
  }

  componentDidMount(){
    takeAction(this, 'replaceLocation', this.props.location.params.redirectTo)
  }

  render(){
    return <div className="RedirectPage">
      <h1>Redirecting to {this.props.location.params.redirectTo}</h1>
    </div>
  }
}
