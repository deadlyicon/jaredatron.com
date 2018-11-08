import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'
import PathnameRouter from 'lib/PathnameRouter'

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import WikiPage from './pages/WikiPage'
import JournalPage from './pages/JournalPage'
import JournalEntriesPage from './pages/JournalEntriesPage'
import JournalEntryPage from './pages/JournalEntryPage'
import RedirectPage from './pages/RedirectPage'
import NotFoundPage from './pages/NotFoundPage'

import Layout from 'components/Layout'
import KeydownTracker from 'components/KeydownTracker'

export default class View extends Component {
  render(){
    return <AppState
      keys={['location','loggedIn']}
      Component={Router}
    />
  }
}

const pathnameRouter = new PathnameRouter(map => {
  map('/',                  HomePage)
  map('/wiki',              WikiPage)
  map('/wiki/:path*',       WikiPage)
  map('/journal',           JournalPage)
  map('/journal/entries',   JournalEntriesPage)
  map('/journal/entry/:id', JournalEntryPage)
  // map('/tracking',         TrackingPage)
  // map('/tracking/:type',   TrackingPage)
  map('/focus',             RedirectPage, { redirectTo: '/wiki/focus' })
  map('/:path*',            NotFoundPage)
})

const goTo = function(path){
  takeAction(this, 'location.set', path)
}

const Router = function({ location, loggedIn }) {
  if (!loggedIn) return <LoginPage location={location} />
  const { Component, params } = pathnameRouter.resolve(location)
  return <KeydownTracker
    g-h={() => { goTo('/') }}
    g-w={() => { goTo('/wiki') }}
    g-j={() => { goTo('/journal') }}
    g-f={() => { goTo('/focus') }}
  >
    <Layout>
      <Component location={{...location, params}} />
    </Layout>
  </KeydownTracker>
}
