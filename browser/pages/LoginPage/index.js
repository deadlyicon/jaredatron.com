import React from 'react'
import PropTypes from 'prop-types'
import Page from 'components/Page'
import Link from 'components/Link'
import LoginForm from 'components/LoginForm'

export default class LoginPage extends Page {
  render(){
    return <div className="LoginPage">
      <LoginForm />
    </div>
  }
}
