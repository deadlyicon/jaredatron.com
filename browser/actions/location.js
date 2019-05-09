import { getLocation, setLocation, replaceLocation } from 'lib/location'

export const publish = function(){
  const lastLocation = this.getState().location
  const location = getLocation()
  if (
    lastLocation &&
    location.pathname === lastLocation.pathname &&
    JSON.stringify(location.params) === JSON.stringify(lastLocation.params)
  ) return
  this.setState({ location })
}

export const set = function(location){
  setLocation(location)
}

export function replace(location){
  replaceLocation(location)
}
