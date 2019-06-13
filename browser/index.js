import './modernizr'
import './polyfills'
import React from 'react'
import { render } from 'react-dom'
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import './style/index.sass'
import View from './View'
import './app'

render(<View />, document.querySelector('main'))

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}