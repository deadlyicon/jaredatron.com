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
}


const rpcMethodFactory = function(proc){
  return function(){
    return rpc(proc, [].slice.call(arguments))
  }
}

export default {
  getWikiPage: rpcMethodFactory('getWikiPage')
}
