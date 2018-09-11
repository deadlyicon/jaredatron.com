import pathToRegexp from 'path-to-regexp'

class Route {
  constructor(pathExpression, Component, params){
    this.pathExpression = pathExpression
    this.Component = Component
    this.keys = []
    this.regexp = pathToRegexp(pathExpression, this.keys)
    this.params = params
  }

  match(pathname){
    const matches = this.regexp.exec(pathname)
    if (!matches) return false
    const params = Object.assign({}, this.params)
    this.keys.forEach((key, index) => {
      params[key.name] = decodeURIComponent(matches[index + 1])
    })
    return {
      Component: this.Component,
      params,
    }
  }
}

export default class PathnameRouter {
  constructor(callback){
    this.routes = []
    const map = (pathExpression, Component, params) => {
      this.routes.push(
        new Route(pathExpression, Component, params)
      )
    }
    callback(map)
  }

  resolve({pathname, params}){
    let resolvedRoute
    this.routes.find(route => // eslint-disable-line no-return-assign
      resolvedRoute = route.match(pathname)
    )
    if (!resolvedRoute) return {
      Component: () => 'no route found',
      params
    }
    return {
      Component: resolvedRoute.Component,
      params: Object.assign({}, params, resolvedRoute.params),
    }
  }
}
