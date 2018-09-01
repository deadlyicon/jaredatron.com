import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StatefulComponent } from 'lib/appState'
import Form from 'components/Form'
// import './index.sass'

export default class LoginForm extends Component {

  login = () => {
    const password = this.password.value
    this.props.onLogin({ password })
  }

  render(){
    return <Form onSubmit={this.login}>
      <input
        ref={node => { this.password = node }}
        type="password"
      />
      <input type="submit" />
    </Form>
  }
}
