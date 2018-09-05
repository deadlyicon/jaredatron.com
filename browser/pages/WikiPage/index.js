import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'
import Page from 'components/Page'
import Link from 'components/Link'
import Markdown from 'components/Markdown'
import ErrorMessage from 'components/ErrorMessage'
import TimeAgo from 'components/TimeAgo'
import InspectObject from 'components/InspectObject'

import './index.sass'

export default class WikiPage extends Page {

  render(){
    const { path, edit, sortBy, asc } = this.props.location.params
    return <div className="WikiPage">
      { path
        ? <PagePage path={path} editing={!!edit} />
        : <IndexPage sortBy={sortBy} asc={asc} />
      }
    </div>
  }
}

class PagePage extends PureComponent {

  loadWikiPage(path){
    takeAction(this, 'loadWikiPage', { path })
  }

  componentDidMount(){
    this.loadWikiPage(this.props.path)
  }

  componentWillReceiveProps(nextProps){
    if (this.props.path !== nextProps.path)
      this.loadWikiPage(nextProps.path)
  }

  render(){
    const { path } = this.props
    const keys = {
      page: `wikiPage:${path}`,
      loadingPage: `wikiPage:${path}:loading`,
      errorLoadingPage: `wikiPage:${path}:loadingError`,
    }
    return <AppState keys={keys}>
      {({ page, errorLoadingPage }) =>
        <div className="WikiPagePage">
          <div>
            <Pathlinks path={path} />
          </div>
          <ErrorMessage error={errorLoadingPage} />
          {page && <Markdown source={page.content} />}
        </div>
      }
    </AppState>
  }
}

class IndexPage extends PureComponent {

  componentDidMount(){
    takeAction(this, 'loadWikiIndex')
  }

  render(){
    const { sortBy, asc } = this.props

    return <AppState keys={['wikiIndex', 'errorLoadingWikiIndex']}>
      {({ wikiIndex, errorLoadingWikiIndex }) =>
        <div className="WikiIndexPage">
          <div>
            <Pathlinks path="/" />
          </div>
          <ErrorMessage error={errorLoadingWikiIndex} />
          {wikiIndex && <WikiPagesList pages={wikiIndex.pages} sortBy={sortBy} asc={asc}  />}
        </div>
      }
    </AppState>
  }
}

const Pathlinks = ({ path }) => {
  const parts = path.split('/')
  const links = []
  parts.forEach((part, index) => {
    if (index !== 0) links.push(<span key={`${index}-break`}>/</span>)
    links.push(
      <Link key={`${index}-link`} href={'/wiki'+parts.slice(0,index+1).join('/')}>
        {part.replace(/[+-_]+/g, ' ')}
      </Link>
    )
  })
  return <span className="">{links}</span>
}


const WikiPagesList = function(props){
  const asc = props.asc === '1' ? undefined : '1'
  const sortBy = props.sortBy
  const pages = props.pages
    .sort((a, b) => {
      a = a[sortBy]
      b = b[sortBy]
      if (typeof a === 'string') a = a.toLowerCase()
      if (typeof b === 'string') b = b.toLowerCase()
      return (a < b ? -1 : b < a ? 1 : 0) * ( asc === '1' ? 1 : -1)
    })
    .map(page =>
      <WikiPagesListMember key={page.path} page={page} />
    )
  return <div className="WikiPagesList">
    <div className="WikiPagesListMember">
      <Link type="link" params={{asc, sortBy:'path'}}>Path</Link>
      <Link type="link" params={{asc, sortBy:'last_viewed_at'}}>Last Viewed</Link>
      <Link type="link" params={{asc, sortBy:'updated_at'}}>Last Updated</Link>
    </div>
    <div className="WikiPagesList-pages">{pages}</div>
  </div>
}

const WikiPagesListMember = function({ page }){
  return <div className="WikiPagesListMember">
    <Link type="link" href={`/wiki/${page.path}`}>{page.path}</Link>
    <TimeAgo time={page.last_viewed_at} />
    <TimeAgo time={page.updated_at} />
  </div>
}
