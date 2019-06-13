import React, { Component } from 'react'
import { AppState, takeAction } from 'lib/appState'

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import WikiPage from './pages/WikiPage'
import JournalPage from './pages/JournalPage'
import JournalEntryPage from './pages/JournalEntryPage'
import RedirectPage from './pages/RedirectPage'
import NotFoundPage from './pages/NotFoundPage'

import Layout from 'components/Layout'
import KeydownTracker from 'components/KeydownTracker'

export default class View extends Component {
  render(){
    const goTo = path => { takeAction(this, 'location.set', path) }
    return <KeydownTracker combos={keydownSequences}>
      <AppState
        keys={['route']}
        Component={Page}
      />
    </KeydownTracker>
  }
}

const PAGES = {
  LoginPage,
  HomePage,
  WikiPage,
  JournalPage,
  JournalEntryPage,
  RedirectPage,
  NotFoundPage,
}
const Page = ({ route }) => {
  if (!route || !route.page) return <div>loading…</div>
  const Page = PAGES[route.page] || NotFoundPage
  const page = <Page location={route.location} {...route.props} />
  return route.layout ? <Layout>{page}</Layout> : page
}

const goTo = path => { takeAction('View', 'location.set', path) }
const keydownSequences = {
  'g-h': () => { goTo('/') },
  'g-w': () => { goTo('/wiki') },
  'g-j': () => { goTo('/journal') },
  'g-f': () => { goTo('/focus') },
}
