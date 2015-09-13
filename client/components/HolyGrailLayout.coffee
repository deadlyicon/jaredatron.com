component = require 'reactatron/component'
Block     = require 'reactatron/Block'
Layer     = require 'reactatron/Layer'
Rows      = require 'reactatron/Rows'
Columns   = require 'reactatron/Columns'
Link      = require 'reactatron/Link'

module.exports = component 'HolyGrailLayout',

  render: ->
    Box layer: true, contentAs: 'rows',
      Box contentAs: 'columns', backgroundColor: 'red'
        Link path: '/',      'Logo'
        Link path: '/about', 'About'
        Link path: '/other', 'Other'
      Box flex: true, contentAs: 'columns', backgroundColor: 'orange'
        Box contentAs: 'rows', backgroundColor: 'orange'

      Header {}
      Columns {},
        Sidebar {}
        MainContent(@props)
        AdBar {}
      Footer {}






Box width: "#{n}%"

Header = Box.withDefaultProps
  width: '100%'
  height: 'auto'
  contentAs: 'columns'
  style:
    backgroundColor: 'red'


Header = Box.withStyle 'Header',
  width: '100%'
  height: 'auto'
  contentAs: 'columns'

  display: 'inline-flex'
  alignItems: 'stretch'
  alignContent: 'stretch'
  flexDirection: 'row'
  flexWrap: 'nowrap'
  justifyContent: 'flex-start'
  flexBasis: '100%'



Header = ->
  Columns
    style:
      backgroundColor: 'red'
    Block {}, 'THE IS THE HEADER'

Sidebar = ->
  Rows
    style:
      backgroundColor: 'orange'
    Link path: '/',      'HOME'
    Link path: '/about', 'ABOUT'
    Link path: '/about-me', 'ABOUT ME'


MainContent = Block.withStyle 'MainContent',
  backgroundColor: 'purple'
  overflowY: 'scroll'
  overflowX: 'auto'


AdBar = ->
  Rows
    style:
      backgroundColor: 'green'
    Block {}, 'BUY VIAGRA'
    Block {}, 'WANT A BIGGER PENIS?!'
    Block {}, 'HOT SEXY TEENS!!! NOW!!!!'


Footer = ->
  Columns
    style:
      backgroundColor: 'teal'
    Block {}, 'THE IS THE FOOTER'
