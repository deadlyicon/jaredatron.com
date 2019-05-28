import pathToRegexp from 'path-to-regexp'

export function createMatcher(location){
  return match.bind(null, location)
}

function match(location, pattern){
  const { paramKeys, regexp } = patternToRegexp(pattern)
  const matches = regexp.exec(location.pathname)
  if (!matches) return false
  const params = { ...location.params }
  paramKeys.forEach((key, index) => {
    params[key.name] = decodeURIComponent(matches[index + 1])
  })
  return params
}

function patternToRegexp(pattern){
  if (patternToRegexp.cache[pattern]) return patternToRegexp.cache[pattern];
  const paramKeys = []
  const regexp = pathToRegexp(pattern, paramKeys)
  return patternToRegexp.cache[pattern] = { regexp, paramKeys }
}
patternToRegexp.cache = {}
global.patternToRegexp = patternToRegexp
