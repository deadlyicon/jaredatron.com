import React from 'react'
import { render } from 'react-dom'

// import { AppStateProvider } from './appState'
import './style/index.sass'
import View from './View'
import app from './app'

window.DEBUG = window.DEBUG || {}
global.DEBUG.app = app

render(<View />, document.querySelector('main'))
