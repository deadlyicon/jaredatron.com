import qwest from 'qwest'

const rpc = function(proc, args){
  return qwest.post(
    '/api',
    {
      proc: proc,
      args: args
    },
    {
      dataType: 'json',
      responseType: 'json',
    }
  )
  .then(xhr => {
    return xhr.response
  })
  .catch((error, xhr, response) => {
    throw response
  })
}

const PROCS = [
  'getWikiPage',
  'updateWikiPage',
  'createWikiPage',
]

const server = {}
PROCS.forEach(proc => {
  server[proc] = function(){
    return rpc(proc, [].slice.call(arguments))
  }
})

export default server
