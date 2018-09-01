import React from 'react'
import PropTypes from 'prop-types'
import Page from 'components/Page'
import Link from 'components/Link'
import InspectObject from 'components/InspectObject'
// import './index.sass'

export default class LoginPage extends Page {

  render(){
    return <div className="LoginPage">
      <h1>login page</h1>
      <InspectObject object={this.getAppState()} />

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
