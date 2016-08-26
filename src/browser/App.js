import React, { Component } from 'react'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import RaisedButton from 'material-ui/RaisedButton'
import { Router, browserHistory } from 'react-router'
import routes from './routes'

export default () => (
  <MuiThemeProvider>
    <Router history={browserHistory} routes={routes} />
  </MuiThemeProvider>
);


