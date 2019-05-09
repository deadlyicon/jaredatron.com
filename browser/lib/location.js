import querystring from 'querystring'
import history from 'lib/history'

export const searchToObject = (search) => {
  return querystring.parse((search || '').replace(/^\?/, ''))
}

export const objectToSearch = (object) => {
  if (!object) return
  for(const key in object){
    const value = object[key]
    if (value === null || value === undefined)
      delete object[key]
  }
  if (Object.keys(object).length === 0) return
  return querystring.stringify(object)
}

export const getLocation = () => {
  const pathname = window.location.pathname
  const params = searchToObject(window.location.search)
  return { pathname, params }
}

export const locationToHref = location => {
  if (typeof location === 'string') return location
  let href = location.pathname
  let query = objectToSearch(location.query)
  if (query) href += '?' + query
  return href
}

export const setLocation = function(location){
  history.pushState(null, window.document.title, locationToHref(location))
}

export const replaceLocation = function(location){
  history.replaceState(null, window.document.title, locationToHref(location))
}

export const setParams = function(params, location = getLocation(), replace = false) {
  const query = { ...location.params, ...params }
  !(replace ? replaceLocation : setLocation).call(this, { ...location, query })
}

export const replaceParams = function(params, location) {
  replaceParams(params, location, true)
}

export const setPathname = function(pathname){
  const { params } = getLocation()
  setLocation({ pathname, params })
}
