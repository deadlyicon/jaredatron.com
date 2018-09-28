import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const FORMATS = Object.freeze({
  compact: 'Y',
  full: 'dddd, MMMM Do YYYY, h:mm:ss a',
  fullDay: 'dddd, MMMM Do YYYY',
  year: 'YYYY',
})

export default class DateTime extends PureComponent {

  static propTypes = {
    date: PropTypes.instanceOf(Date),
    format: PropTypes.oneOf(Object.keys(FORMATS)).isRequired,
  }

  static defaultProps = {
    format: 'compact',
  }

  render(){
    const { className = '', date, format, ...props } = this.props
    const content = date && moment(date).format(FORMATS[format])
    return <span className={`DateTime ${className}`} {...props}>
      {content}
    </span>
  }
}

const formatToMomentFormat = format => {

}