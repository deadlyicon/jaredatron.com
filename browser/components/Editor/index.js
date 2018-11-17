import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './index.sass'

export default class Editor extends PureComponent {

  static propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
  }

  componentDidMount(){
    this.textarea.scrollTop = 0
    this.textarea.selectionEnd = 0
  }

  onChange = (event) => {
    if (this.props.onChange) this.props.onChange(event.target.value)
  }

  render(){
    const { className = '', ...props } = this.props
    return <div className={`Editor ${className}`}>
      <textarea
        {...props}
        ref={node => { this.textarea = node }}
        onChange={this.onChange}
      />
    </div>
  }
}
