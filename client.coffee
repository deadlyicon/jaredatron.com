app = require './client/app'

require('domready') ->
  app.start()




# DEBUG

global.D = {}

D.app = app
