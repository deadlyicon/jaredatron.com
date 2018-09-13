import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DialogBox from 'components/DialogBox'
import Link from 'components/Link'
import './index.sass'

export default class ConfirmationDialog extends Component {
  static propTypes = {
    prompt: PropTypes.string.isRequired,
    onConfirmation: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
  }
  static defaultProps = {
    confirmationValue: 'ok',
    cancelValue: 'cancel',
  }
  render(){
    const {
      prompt,
      confirmationValue,
      cancelValue,
      onConfirmation,
      onCancel,
    } = this.props
    return <DialogBox className="ConfirmationDialog">
      <div className="ConfirmationDialog-prompt">{prompt}</div>
      <div className="ConfirmationDialog-buttons">
        <button onClick={onCancel} autoFocus>
          {cancelValue}
        </button>
        <button onClick={onConfirmation}>
          {confirmationValue}
        </button>
      </div>
    </DialogBox>
  }
}
