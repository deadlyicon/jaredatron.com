import React from 'react'
import PropTypes from 'prop-types'
import Page from 'components/Page'
import InspectObject from 'components/InspectObject'

export default class WikiPage extends Page {

  render(){
    return <div className="WikiPage">
      <h1>WikiPage</h1>
      <InspectObject object={this.props} />
    </div>
  }
}
