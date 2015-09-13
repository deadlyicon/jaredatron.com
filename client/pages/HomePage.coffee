component = require 'reactatron/component'

HolyGrailLayout = require '../components/HolyGrailLayout'

module.exports = component 'HomePage',

  render: ->
    HolyGrailLayout {}, 'Welcome to jaredatron.com'
