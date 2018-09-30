import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

  goTo(path){
    takeAction(this, 'location.set', path)
  }

  render(){
    return <KeydownTracker
      g-h={() => { this.goTo('/') }}
      g-w={() => { this.goTo('/wiki') }}
      g-j={() => { this.goTo('/journal') }}
      g-f={() => { this.goTo('/focus') }}
    >
      <AppState
        keys={['location','loggedIn']}
        Component={Router}
      />
    </KeydownTracker>
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

const Router = function({ location, loggedIn }) {
  // if (!loggedIn) return <LoginPage location={location} />
  const { Component, params } = pathnameRouter.resolve(location)
  return <Layout>
    <Component location={{...location, params}} />
  </Layout>
}
