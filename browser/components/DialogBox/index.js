import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from 'components/Link'
import './index.sass'

export default class DialogBox extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
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
      {children}
    </div>
  }
}
