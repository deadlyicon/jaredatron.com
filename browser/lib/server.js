import querystring from 'querystring'
import logger from 'lib/logger'

let sessionId = localStorage.sessionId
export async function setSessionId(_sessionId){
  if (typeof _sessionId === 'undefined'){
    delete localStorage.sessionId
    sessionId = undefined
  }else{
    localStorage.sessionId = sessionId = _sessionId
  }
}

export async function takeAction(actionName, args = {}){
  logger.debug(`[server][takeAction]`, actionName, args)

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
      logger.error(`[server][takeAction]`, error)
      throw error
    }
    logger.debug(`[server][takeAction]`, actionName, args, responseBody)
    return responseBody
  }catch(error){
    logger.error(`[server][takeAction]`, error)
    if (error.message === 'Failed to fetch')
      error.message = 'You appear to be offline!'
    throw error
  }
}
