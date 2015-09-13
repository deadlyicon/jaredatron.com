ReactatronApp = require('reactatron/App')

module.exports = app = new ReactatronApp

  responsive:
    small:  [0,    480]
    medium: [481,  992]
    large:  [993,  1200]
    huge:   [1201, Infinity]

  routes:
    '/':                  require './pages/HomePage'
    '/about':             require './pages/AboutPage'
    # legacy routes (redirections)
    '/about-me': '/about'
