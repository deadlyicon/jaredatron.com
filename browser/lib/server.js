import querystring from 'querystring'
import logger from 'lib/logger'

async function request({ method, path, query, body }){
  // logger.debug(`[server][request]`, {method, path, body})
  path = `${path}?${querystring.stringify(query)}`
  const response = await fetch(path, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(body)
  })
  const responseBody = await response.json()
  if (responseBody.error){
    const error = new Error(responseBody.error.message)
    error.stack = responseBody.error.stack + error.stack
    logger.error(`[server][request]`, error)
    throw error
  }
  // logger.debug(`[server][response]`, responseBody)
  return responseBody
}


export async function executeQuery(queryName, options = {}){
  logger.debug(`[executeQuery]`, queryName, options)
  const response = await request({
    method: 'get',
    path: '/queries',
    query: {
      queryName,
      options: JSON.stringify(options),
    },
  })
  logger.debug(`[executeQuery]`, queryName, options, response)
  return response
}

export async function executeCommand(commandName, options){
  logger.debug(`[executeCommand]`, commandName, options)
  const response = await request({
    method: 'post',
    path: '/commands',
    body: { commandName, options },
  })
  logger.debug(`[executeCommand]`, commandName, options, response)
  return response
}
