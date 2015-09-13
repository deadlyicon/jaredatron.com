component = require 'reactatron/component'

HolyGrailLayout = require '../components/HolyGrailLayout'

module.exports = component 'AboutPage',

  render: ->
    HolyGrailLayout {}, 'ABOUT PAGE'
