import React from 'react'
import PropTypes from 'prop-types'
import { AppState } from 'lib/appState'
import Page from 'components/Page'
import Link from 'components/Link'
import LoginForm from 'components/LoginForm'
import InspectObject from 'components/InspectObject'
// import './index.sass'

export default class LoginPage extends Page {

  render(){
    // const {
    //   loginError,
    //   email,
    //   password,
    // } = this.getAppState()

    return <div className="LoginPage">
      <h1>login page</h1>

      <AppState
        keys={{
          [`login:error`]: 'error',
        }}
      >
        {state => {
          const onLogin = state.appAction('login')

          return <LoginForm
            error={state.error}
            onLogin={onLogin}
          />
        }}
      </AppState>

      <InspectObject object={this.props} />

      <div>
        <Link href="/one/two?three=four">doggies</Link>
      </div>
      <div>
        <Link href="/five/six?seven=eight">kitties</Link>
      </div>
      <div>
        <Link href="shoes">shoes</Link>
      </div>
      <div>
        <Link href="cars">cars</Link>
      </div>
      <div>
        <Link href="people">people</Link>
      </div>
      <div>
        <Link href="whatever">whatever</Link>
      </div>
    </div>
  }
}
