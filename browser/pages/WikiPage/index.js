import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import stringSimilarity from 'string-similarity'
import { AppState, takeAction, appAction } from 'lib/appState'
import Page from 'components/Page'
import Link from 'components/Link'
import Markdown from 'components/Markdown'
import ErrorMessage from 'components/ErrorMessage'
import TimeAgo from 'components/TimeAgo'
import WikiPageEditor from 'components/WikiPageEditor'
import WikiPageHistory from 'components/WikiPageHistory'
import InspectObject from 'components/InspectObject'

import './index.sass'

export default class WikiPage extends Page {
  render(){
    const { path, sortBy, asc, f: filter, history } = this.props

    return <div className="WikiPage">
      { path
        ? history
          ? <WikiPageHistory path={path} />
          : <WikiPageEditor path={path} />
        : <IndexPage
          sortBy={sortBy}
          asc={asc}
          filter={filter || ''}
          onFilterChange={filter => {
            takeAction(this, 'location.replaceParams', {f: filter ? filter : null})
          }}
        />
      }
    </div>
  }
}

class IndexPage extends PureComponent {

  componentDidMount(){
    takeAction(this, 'wiki.loadIndex')
    document.addEventListener('keydown', this.onDocumentKeyDown)
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.onDocumentKeyDown)
  }

  onDocumentKeyDown = event => {
    const { metaKey, shiftKey, key } = event
    if (key === '/') {
      event.preventDefault()
      this.filterInput.focus()
    }
  }

  render(){
    const { sortBy, asc, filter = '', onFilterChange } = this.props

    const keys = {
      wikiIndex: 'wiki:index',
      wikiIndexError: 'wiki:index:error',
    }
    return <AppState keys={keys}>
      {({ wikiIndex, wikiIndexError }) =>
        <div className="WikiIndexPage">
          <input
            ref={node => { this.filterInput = node }}
            autoFocus
            value={filter}
            onChange={event => { onFilterChange(event.target.value) }}
          />
          <ErrorMessage error={wikiIndexError} />
          { wikiIndex && <WikiPagesList
              pages={wikiIndex.pages}
              sortBy={sortBy}
              asc={asc}
              filter={filter}
            />
          }
        </div>
      }
    </AppState>
  }
}

const WikiPagesList = function(props){
  const asc = props.asc === '1'
  const filter = props.filter ? props.filter.toLowerCase() : null
  const sortBy = props.sortBy || 'updated_at'

  let pages = props.pages

  if (filter){
    pages = pages.sortBy(page => stringSimilarity.compareTwoStrings(page.path, filter))
  }else{
    pages = pages.sortBy(page => {
      let prop = page[sortBy]
      if (typeof prop === 'string') prop = prop.toLowerCase()
      return prop
    })
  }

  if (!asc) pages = pages.reverse()

  pages = pages.map(page =>
    <WikiPagesListMember key={page.path} page={page} />
  )
  const columnLink = (value, _sortBy) =>
    <Link
      type="link"
      tabIndex="-1"
      value={value}
      params={{
        asc: sortBy === _sortBy && !asc ? 1 : undefined,
        sortBy: _sortBy,
      }}
    />

  return <div className="WikiPagesList">
    <div className="WikiPagesListMember">
      {columnLink('Path', 'path')}
      {columnLink('Last Viewed', 'last_viewed_at')}
      {columnLink('Last Updated', 'updated_at')}
    </div>
    <div className="WikiPagesList-pages">{pages}</div>
  </div>
}

const WikiPagesListMember = function({ page }){
  return <div className="WikiPagesListMember">
    <div>
      <Link type="link" href={`/wiki/${page.path}`}>{page.path}</Link>
    </div>
    <TimeAgo time={page.last_viewed_at} />
    <TimeAgo time={page.updated_at} />
  </div>
}
