import React from 'react'
import { render } from 'react-dom'
import './style/index.sass'
import View from './View'
import app from './app'

global.DEBUG = {}
global.DEBUG.app = app

render(
  <View app={app} />,
  document.querySelector('main')
)
