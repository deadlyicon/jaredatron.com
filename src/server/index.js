import express from 'express'
import bodyParser from 'body-parser'
import procedures from './procedures'
import indexHTML from 'index.pug'
import database from './database'
const PUBLIC_DIR = __dirname + '/public';
const server = express()

export { server }

server.set('port', process.env.PORT || 3000);

server.use(express.static(PUBLIC_DIR));

server.use(bodyParser.json({ type: 'application/json' }))


server.post('/api', (request, response) => {
  const proc = request.body.proc
  const args = request.body.args || []
  if (proc in procedures){
    procedures[proc].apply(null, args)
      .then(result => {
        response.status(200).json(result)
      })
      .catch(error => {
        response.status(500).json({
          error: {
            message: error.message,
            stack: error.stack
          }
        })
      })
  }else{
    response.status(400).json({
      error: {
        message: `${proc} is not a know procedure`,
        stack: ''
      }
    })
  }
});

server.get('/*', (request, response) => {
  response.send(indexHTML({}));
});

database.connect()
  .then( () => {
    console.log('database connection established')
    server.listen(server.get('port'), () => {
      console.log('starting server at http://localhost:'+server.get('port'))
    });
  })
  .catch( error => {
    console.error(error)
    process.exit()
  })
