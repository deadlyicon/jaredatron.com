import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { takeAction } from 'lib/appState'

import Link from 'components/Link'
import './index.sass'

export default class Layout extends Component {

  logout = () => {
    takeAction(this, 'logout')
  }

  render(){
    return <div className="Layout">
      <div className="Layout-topnav">
        <Link href="/wiki">wiki</Link>
        <Link href="/tracking">tracking</Link>
        <Link href="/journal">journal</Link>
        <Link href="/focus">focus</Link>
        <div className="Layout-topnav-spacer" />
        <Link onClick={this.logout}>logout</Link>
      </div>
      <div className="Layout-main">{this.props.children}</div>
    </div>
  }
}
