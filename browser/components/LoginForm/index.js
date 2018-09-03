import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StatefulComponent } from 'lib/appState'
import Form from 'components/Form'
import ErrorMessage from 'components/ErrorMessage'
import InspectObject from 'components/InspectObject'
// import './index.sass'

export default class LoginForm extends Component {

  login = () => {
    const password = this.password.value
    this.props.onLogin({ password })
  }

  render(){
    const { error } = this.props
    return <Form onSubmit={this.login}>
      <ErrorMessage error={error} />
      <input
        ref={node => { this.password = node }}
        type="password"
      />
      <input type="submit" />
      <InspectObject object={this.props} />
    </Form>
  }
}
