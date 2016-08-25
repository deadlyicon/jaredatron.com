import React, { Component } from 'react'
import NotFound from './components/NotFound.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Journal from './components/Journal.jsx'
import Wiki from './components/Wiki.jsx'

const App = function(props){
  return <div>
    <Navbar />
    {props.children}
  </div>
}

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: Home,
  },
  childRoutes: [
    {
      path: 'journal',
      component: Journal,
      indexRoute: {
        component: Journal.Index
      },
      childRoutes: [
        {
          path: 'new',
          component: Journal.New
        },
        {
          path: ':journalId',
          component: Journal.Show
        },
        {
          path: ':journalId/edit',
          component: Journal.Edit
        },
      ]
    },
    {
      path: 'wiki',
      components: Wiki,
      indexRoute: {
        component: Wiki.Page
      },
      childRoutes: [
        {
          path: '**',
          component: Wiki.Page
        }
      ]
    },
    {
      path: '**',
      component: NotFound,
    }
  ]
}
