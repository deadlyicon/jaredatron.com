console.log('client.js')

global.React = require 'reactatron/React'
component = require 'reactatron/component'


require('domready') ->

  React.render(
    React.createElement('div', {}, 'hello world'),
    document.body
  )
