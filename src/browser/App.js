import React, { Component } from 'react'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import RaisedButton from 'material-ui/RaisedButton'
import { Link, Router, Route, browserHistory } from 'react-router'
import JournalPage from './components/JournalPage.jsx'
import WikiPage from './components/WikiPage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'


const App = function(props){
  console.log('App', props)
  return <div>
    <h1>App</h1>
    <ul>
      <li><Link to="/">Root</Link></li>
      <li><Link to="/journals">Journal</Link></li>
      <li><Link to="/journals/new">New Journal</Link></li>
      <li><Link to="/journals/1">Journal #1</Link></li>
      <li><Link to="/journals/2">Journal #2</Link></li>
      <li><Link to="/journals/2/edit">Edit Journal #2</Link></li>
      <li><Link to="/broken">Broken</Link></li>
    </ul>
    {props.children}
  </div>
}


const componentFactory = function(name){
  return function(props){
    console.log(name, props)
    return <div>
      <h1>{name}</h1>
      <pre>{JSON.stringify(props.params, null, 4)}</pre>
      <pre>{JSON.stringify(Object.keys(props), null, 4)}</pre>
      {props.children}
    </div>
  }
}


const Journals = componentFactory('Journals')
Journals.Index = componentFactory('Journals Index')
Journals.New = componentFactory('Journals New')
Journals.Show = componentFactory('Journals Show')
Journals.Edit = componentFactory('Journals Edit')



const routes = {
  path: '/',
  component: App,
  indexRoute: {
    component: componentFactory('Home')
  },
  childRoutes: [
    {
      path: 'journals',
      component: Journals,
      indexRoute: {
        component: Journals.Index
      },
      childRoutes: [
        {
          path: 'new',
          component: Journals.New
        },
        {
          path: ':journalId',
          component: Journals.Show
        },
        {
          path: ':journalId/edit',
          component: Journals.Edit
        },
      ]
    },
    {
      path: '**',
      component: componentFactory('Page Not Found'),
    }
  ]
}

export default () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Router history={browserHistory} routes={routes} />
  </MuiThemeProvider>
);


