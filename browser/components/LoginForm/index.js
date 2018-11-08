import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'
import Form from 'components/Form'
import ErrorMessage from 'components/ErrorMessage'
import InspectObject from 'components/InspectObject'
import './index.sass'

export default class LoginForm extends Component {

  componentDidMount(){
    this.passwordInput.focus()
  }

  login = () => {
    const password = this.passwordInput.value
    takeAction(this, 'auth.login', { password })
  }

  render(){
    return <AppState keys={['loggingIn','loginError']}>
      {state => {
        const disabled = !!state.loggingIn
        return <Form
          className="LoginForm"
          onSubmit={this.login}
        >
          <ErrorMessage error={state.loginError} />
          <div>
            <input
              autoFocus
              ref={node => { this.passwordInput = node }}
              disabled={disabled}
              type="password"
            />
          </div>
        </Form>
      }}
    </AppState>
  }
}

