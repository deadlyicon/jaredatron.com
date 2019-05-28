import { createMatcher } from 'lib/routing'
import history from 'lib/history'
import {
  getLocation,
  replaceLocation,
  locationToHref,
} from 'lib/location'


function setTitle(title){
  window.document.title = `${title} - Jaredatron`
}

export function update(){
  const {
    route: currentRoute,
    loggedIn,
  } = this.getState()

  const currentLocation = currentRoute && currentRoute.location
  const newLocation = getLocation()

  const setRoute = ({ page, layout, props }) => {
    this.setState({
      route: {location: newLocation, page, layout, props}
    })
  }

  const match = createMatcher(newLocation)
  let props

  if (!loggedIn)
    return setRoute({ page: 'LoginPage', layout: false })

  if (props = match('/')){
    setTitle('Home')
    return setRoute({ page: 'HomePage', layout: true, props })
  }

  if (props = match('/wiki')){
    setTitle('Wiki')
    return setRoute({ page: 'WikiPage', layout: true, props })
  }

  if (props = match('/wiki/:path*')) {
    const normalizedPath = props.path.toLowerCase().replace(/\s+/g,'-')
    if (normalizedPath !== props.path) replaceLocation(`/wiki/${normalizedPath}`)
    props.path = normalizedPath
    setTitle(`${props.path} - Wiki`)
    return setRoute({ page: 'WikiPage', layout: true, props })
  }

  if (props = match('/journal')){
    setTitle('Journal')
    this.takeAction('journal.loadTodaysEntry')
    return setRoute({ page: 'JournalPage', layout: true, props })
  }

  if (props = match('/journal/entries')){
    setTitle('Journal Entries')
    this.takeAction('journal.loadEntries')
    return setRoute({ page: 'JournalEntriesPage', layout: true, props })
  }

  if (props = match('/journal/entry/:id')){
    setTitle(`Journal Entry ${props.id}`)
    this.takeAction('journal.loadEntries')
    return setRoute({ page: 'JournalEntryPage', layout: true, props })
  }

  if (match('/focus'))
    return replaceLocation({ pathname: '/wiki/focus' })

  return setRoute({ page: 'NotFoundPage', layout: true, props: {} })
}
