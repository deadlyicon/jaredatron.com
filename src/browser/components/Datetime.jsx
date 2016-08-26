import React, { Component } from 'react'
import moment from 'moment'

export default class Datetime extends Component {
  static propTypes = {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.instanceOf(Date)
    ]),
    format: React.PropTypes.oneOf(['short', 'long']),
  }

  static defaultProps = {
    format: 'long'
  }

  render(){
    const format = (
      this.props.format === 'long' ? "dddd, MMMM Do YYYY, h:mm:ss a" :
      this.props.format === 'short'  ? "MM/DD/YY h:mma " :
      'INVALID FORMAT'
    )
    const value = moment(this.props.value).format(format)
    const alt = moment(this.props.value).format()
    return <span alt={alt}>{value}</span>
  }
}
