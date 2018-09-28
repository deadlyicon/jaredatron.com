import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './index.sass'

export default class Editor extends PureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
  }

  componentDidMount(){
    this.textarea.scrollTop = 0
    this.textarea.selectionEnd = 0
  }

  render(){
    const { value, onChange, className = '', ...props } = this.props
    return <div className={`Editor ${className}`}>
      <textarea
        {...props}
        ref={node => { this.textarea = node }}
        value={value}
        onChange={event => { onChange(event.target.value) }}
      />
    </div>
  }
}
