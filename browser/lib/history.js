let subscribers = []

const publish = function() {
  console.log('lib/history.publosh', subscribers.length)
  subscribers.forEach(handler => {
    handler(window.location)
  })
}

window.addEventListener('popstate', publish)

module.exports = {
  pushState(...args){
    console.log('lib/history.pushState', args)
    window.history.pushState(...args)
    publish()
  },
  replaceState(...args){
    console.log('lib/history.replaceState', args)
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


