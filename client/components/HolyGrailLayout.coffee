component = require 'reactatron/component'
Block     = require 'reactatron/Block'
Layer     = require 'reactatron/Layer'
Rows      = require 'reactatron/Rows'
Columns   = require 'reactatron/Columns'
Link      = require 'reactatron/Link'

module.exports = component 'HolyGrailLayout',

  render: ->

    Box
      layer: true
      overflowY: 'scroll'
      overflowX: 'auto'
      contentAs: 'rows'

    Box layer: true, contentAs: 'rows',
      Box contentAs: 'columns',
        Link path: '/',      'Home Page'
        Link path: '/about', 'About Page'

      Box contentAs: 'columns',
        Box contentAs: 'rows',
        Box overflowY: 'scroll', overflowX: 'auto'



    # Layer contentAs: 'rows',
    #   Header {}
    #     Link path: '/',      'Home Page'
    #     Link path: '/about', 'About Page'
    #   Box contentAs: 'columns', flex: 1, padding: 2,
    #     Sidebar {}
    #     MainContent(@props)
    #     AdBar {}
    #   Footer {}






# Box width: "#{n}%"

# Header = Box.withDefaultProps
#   backgroundColor: 'red'
#   '>=large':
#     contentAs: 'columns'
#     colorScheme: 'dark'
#   '<large':
#     contentAs: 'rows'
#     colorScheme: 'tan'

#   ''

# Box.defineMixin (props) ->
#   {contentAs} = props

#   switch contentAs
#     when 'columns'
#       props.flexDirection = 'row'
#     when 'rows'
#       props.flexDirection = 'column'
#     else
#       return

#   props.display        = 'inline-flex'
#   props.alignItems     = 'stretch'
#   props.alignContent   = 'stretch'
#   props.flexDirection  = 'column'
#   props.flexWrap       = 'nowrap'
#   props.justifyContent = 'flex-start'
#   props


# Box
#   transition: ->




# Header = ->
#   Columns
#     style:
#       backgroundColor: 'red'
#     Block {}, 'THE IS THE HEADER'

# Sidebar = ->
#   Rows
#     style:
#       backgroundColor: 'orange'
#     Link path: '/',      'HOME'
#     Link path: '/about', 'ABOUT'
#     Link path: '/about-me', 'ABOUT ME'


# MainContent = Block.withStyle 'MainContent',
#   backgroundColor: 'purple'
#   overflowY: 'scroll'
#   overflowX: 'auto'


# AdBar = ->
#   Rows
#     style:
#       backgroundColor: 'green'
#     Block {}, 'BUY VIAGRA'
#     Block {}, 'WANT A BIGGER PENIS?!'
#     Block {}, 'HOT SEXY TEENS!!! NOW!!!!'


# Footer = ->
#   Columns
#     style:
#       backgroundColor: 'teal'
#     Block {}, 'THE IS THE FOOTER'
