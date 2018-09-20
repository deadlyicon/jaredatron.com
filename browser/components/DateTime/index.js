import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class DateTime extends PureComponent {

  static propTypes = {
    date: PropTypes.instanceOf(Date),
  }

  render(){
    const { className = '', date, ...props } = this.props
    const content = date ? moment(date).format('L') : null
    return <span className={`DateTime ${className}`} {...props}>
      {content}
    </span>
  }
}
