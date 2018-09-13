import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from 'components/Link'
import './index.sass'

export default class DialogBox extends Component {
  static propTypes = {
    className: PropTypes.string,
    // onClose: PropTypes.func.isRequired,
  }
  render(){
    const {
      children,
      className = '',
      ...props
    } = this.props
    return <div
      className={`DialogBox ${className}`}
      {...props}
    >
      <div className="DialogBox-window">
        {children}
      </div>
    </div>
  }
}
