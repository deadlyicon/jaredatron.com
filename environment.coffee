process.env.NODE_ENV ||= 'development'

if process.env.NODE_ENV != 'production'
  # require('dotenv').load();
  null
