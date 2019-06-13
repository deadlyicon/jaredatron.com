import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './index.sass'

export default class Editor extends PureComponent {

  static propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    onSave: PropTypes.func,
  }

  componentDidMount(){
    this.textarea.scrollTop = 0
    this.textarea.selectionEnd = 0
  }

  onChange = (event) => {
    if (this.props.onChange) this.props.onChange(event.target.value)
  }

  onKeyDown = event => {
    const { metaKey, shiftKey, key } = event

    if (metaKey && !shiftKey){
      if (key === 's') {
        event.preventDefault()
        if (this.props.onSave) this.props.onSave()
        return
      }
    }

    if (this.props.onKeyDown) this.props.onKeyDown(event)
  }

  render(){
    const { className = '', ...props } = this.props
    delete props.onSave
    return <div className={`Editor ${className}`}>
      <textarea
        {...props}
        ref={node => { this.textarea = node }}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
      />
    </div>
  }
}
