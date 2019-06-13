import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class TimeAgo extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    time: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
    ]).isRequired,
    interval: PropTypes.number.isRequired,
  }

  static defaultProps = {
    interval: 1000,
  }

  componentDidMount(){
    this.interval = setInterval(
      () => { this.forceUpdate() },
      this.props.interval,
    )
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  render(){
    const {
      className = '',
      time,
      interval, // eslint-disable-line
      ...props
    } = this.props
    const timeAsMoment = moment(time)
    return <span
      {...props}
      className={`TimeAgo ${className}`}
      title={timeAsMoment.format('MMM Do YYYY h:mmA')}
    >
      {timeAsMoment.fromNow().replace(/ ago$/,'')}
    </span>
  }
}
