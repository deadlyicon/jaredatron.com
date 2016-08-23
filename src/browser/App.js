import React, { Component } from 'react'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import RaisedButton from 'material-ui/RaisedButton'
import { Router, Route, browserHistory } from 'react-router'
import JournalPage from './components/JournalPage.jsx'
import WikiPage from './components/WikiPage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'

export default () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Router history={browserHistory}>
      <Route path="/journal" component={JournalPage} />
      <Route path="/wiki" component={WikiPage} />
      <Route path="*" component={NotFoundPage} />
    </Router>
  </MuiThemeProvider>
);

