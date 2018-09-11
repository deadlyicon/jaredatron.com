import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DialogBox from 'components/DialogBox'
import Link from 'components/Link'
import './index.sass'

export default class ConfirmationDialog extends Component {
  static propTypes = {
    confirm: PropTypes.string.isRequired,
    onConfirmation: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
  }
  static defaultProps = {
    confirmationValue: 'ok',
    cancelValue: 'cancel',
  }
  render(){
    const {
      confirm,
      confirmationValue,
      cancelValue,
    } = this.props
    return <DialogBox className="ConfirmationDialog">
      <div>{confirm}</div>
      <button
        onClick={}
      >
        {cancelValue}
      </button>
      <button
        onClick={}
      >
        {confirmationValue}
      </button>
    </DialogBox>
  }
}
