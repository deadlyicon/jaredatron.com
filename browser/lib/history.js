let subscribers = []

const publish = function() {
  subscribers.forEach(handler => {
    handler(window.location)
  })
}

window.addEventListener('popstate', publish)

module.exports = {
  pushState(stateObject, title, href){
    if (href === window.location.href) return
    window.history.pushState(stateObject, title, href)
    publish()
  },
  replaceState(stateObject, title, href){
    if (href === window.location.href) return
    window.history.replaceState(stateObject, title, href)
    publish()
  },
  subscribe(handler){
    subscribers.push(handler)
  },
  unsubscribe(handler){
    subscribers = subscribers.filter(h =>
      h !== handler
    )
  }
}


