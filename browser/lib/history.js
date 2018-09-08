let subscribers = []

const publish = function() {
  subscribers.forEach(handler => {
    handler(window.location)
  })
}

window.addEventListener('popstate', publish)

module.exports = {
  pushState(...args){
    window.history.pushState(...args)
    publish()
  },
  replaceState(...args){
    window.history.replaceState(...args)
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


