import express from 'express'

const PUBLIC_DIR = __dirname + '/public';

const server = express()

export { server }

server.set('port', process.env.PORT || 3000);

server.use(express.static(PUBLIC_DIR));

server.get('/*', (request, response) => {
  response.sendFile(PUBLIC_DIR+'/index.html');
});

server.listen(server.get('port'), () => {
  console.log('starting server at http://localhost:'+server.get('port'))
});
