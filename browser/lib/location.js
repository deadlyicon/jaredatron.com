import querystring from 'querystring'
import history from './history'

export const searchToObject = (search) => {
  return querystring.parse((search || '').replace(/^\?/, ''))
}

const objectToSearch = (object) => {
  return querystring.stringify(object)
}

const getLocation = () => {
  const pathname = window.location.pathname
  const params = searchToObject(window.location.search)
  return {
    pathname,
    params,
  }
}

const locationToHref = location => {
  if (typeof location === 'string') return location
  let href = location.pathname
  let query = objectToSearch(location.query)
  if (query) href += '?' + query
  return href
}


export const publishLocation = function(){
  const lastLocation = this.getState().location
  const location = getLocation()
  if (
    lastLocation &&
    location.pathname === lastLocation.pathname &&
    JSON.stringify(location.params) === JSON.stringify(lastLocation.params)
  ) return
  this.setState({ location })
}

history.onChange

export const setLocation = function(location){
  const href = locationToHref(location)
  if (href === window.location.href) return // noop
  history.pushState(null, window.document.title, href)
  this.setState({
    location: getLocation(),
  })
}

export const replaceLocation = function(location){
  const href = locationToHref(location)
  history.replaceState(null, window.document.title, href)
  this.setState({
    location: getLocation(),
  })
}
