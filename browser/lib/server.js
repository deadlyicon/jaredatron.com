import querystring from 'querystring'
import logger from 'lib/logger'

let sessionId = sessionStorage.sessionId
export async function setSessionId(_sessionId){
  if (typeof _sessionId === 'undefined'){
    delete sessionStorage.sessionId
    sessionId = undefined
  }else{
    sessionStorage.sessionId = sessionId = _sessionId
  }
}

export async function takeAction(actionName, args = {}){
  logger.debug(`[takeAction]`, actionName, args)

  try{
    const response = await fetch(`/action/${actionName}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Session-Id': sessionId,
      },
      body: JSON.stringify(args)
    })
    const responseBody = await response.json()
    if (responseBody.error){
      const error = new Error(responseBody.error.message)
      error.stack = responseBody.error.stack + error.stack
      console.error('REQUEST ERROR', error)
      logger.error(`[takeAction]`, error)
      throw error
    }
    logger.debug(`[takeAction]`, actionName, args, responseBody)
    return responseBody
  }catch(error){
    logger.error(`[takeAction]`, error)
    if (error.message === 'Failed to fetch')
      error.message = 'You appear to be offline!'
    throw error
  }
}

// async function request({ method, path, query, body }){
//   // logger.debug(`[server][request]`, {method, path, body})
//   path = `${path}?${querystring.stringify(query)}`
//   try{
//     const response = await fetch(path, {
//       method,
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json;charset=UTF-8',
//         'Session-Id': sessionId,
//       },
//       body: JSON.stringify(body)
//     })
//     const responseBody = await response.json()
//     if (responseBody.error){
//       const error = new Error(responseBody.error.message)
//       error.stack = responseBody.error.stack + error.stack
//       logger.error(`[server][request]`, error)
//       throw error
//     }
//     // logger.debug(`[server][response]`, responseBody)
//     return responseBody
//   }catch(error){
//     if (error.message === 'Failed to fetch')
//       error.message = 'You appear to be offline!'
//     throw error
//   }
// }



// export async function executeQuery(queryName, options = {}){
//   logger.debug(`[executeQuery]`, queryName, options)
//   const response = await request({
//     method: 'get',
//     path: '/queries',
//     query: {
//       queryName,
//       options: JSON.stringify(options),
//     },
//   })
//   logger.debug(`[executeQuery]`, queryName, options, response)
//   return response
// }

// export async function executeCommand(commandName, options){
//   logger.debug(`[executeCommand]`, commandName, options)
//   const response = await request({
//     method: 'post',
//     path: '/commands',
//     body: { commandName, options },
//   })
//   logger.debug(`[executeCommand]`, commandName, options, response)
//   return response
// }
