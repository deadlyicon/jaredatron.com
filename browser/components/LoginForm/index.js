import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'
import Form from 'components/Form'
import ErrorMessage from 'components/ErrorMessage'
import InspectObject from 'components/InspectObject'
// import './index.sass'

export default class LoginForm extends Component {

  login = () => {
    const password = this.password.value
    takeAction(this, 'login', { password })
  }

  render(){
    const { error } = this.props
    return <AppState keys={['loggingIn','loginError']}>
      {state => {
        const disabled = !!state.loggingIn
        return <Form onSubmit={this.login}>
          <ErrorMessage error={state.loginError} />
          <input
            ref={node => { this.password = node }}
            disabled={disabled}
            type="password"
          />
          <input
            disabled={disabled}
            type="submit"
            value={state.loggingIn ? 'Logging in…' : 'Login'}
          />
        </Form>
      }}
    </AppState>
  }
}

