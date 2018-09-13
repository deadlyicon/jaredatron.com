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
    const { path, sortBy, asc, f: filter, history } = this.props.location.params
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
            takeAction(this, 'replaceParams', {f: filter ? filter : null})
          }}
        />
      }
    </div>
  }
}

// class PagePage extends PureComponent {

//   loadWikiPage(path){
//     takeAction(this, 'loadWikiPage', { path })
//   }

//   componentDidMount(){
//     this.loadWikiPage(this.props.path)
//   }

//   componentWillReceiveProps(nextProps){
//     if (this.props.path !== nextProps.path)
//       this.loadWikiPage(nextProps.path)
//   }

//   render(){
//     const { path } = this.props
//     const keys = {
//       page: `wikiPage:${path}`,
//       loadingPage: `wikiPage:${path}:loading`,
//       errorLoadingPage: `wikiPage:${path}:loadingError`,
//     }
//     return <AppState keys={keys}>
//       {({ page, loadingPage, errorLoadingPage }) =>
//         <div className="WikiPagePage">
//           <div>
//             <Pathlinks path={path} />
//           </div>
//           <ErrorMessage error={errorLoadingPage} />
//           {page && <Markdown source={page.content} />}
//         </div>
//       }
//     </AppState>
//   }
// }

class IndexPage extends PureComponent {

  componentDidMount(){
    takeAction(this, 'wiki.loadIndex')
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

// const Pathlinks = ({ path }) => {
//   const parts = path.split('/')
//   const links = []
//   parts.forEach((part, index) => {
//     if (index !== 0) links.push(<span key={`${index}-break`}>/</span>)
//     links.push(
//       <Link key={`${index}-link`} href={'/wiki/'+parts.slice(0,index+1).join('/')}>
//         {part.replace(/[+-_]+/g, ' ')}
//       </Link>
//     )
//   })
//   return <span className="Pathlinks">{links}</span>
// }


const WikiPagesList = function(props){
  const asc = props.asc === '1'
  const filter = props.filter ? props.filter.toLowerCase() : null
  const sortBy = props.sortBy || 'last_viewed_at'

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
    <Link type="link" href={`/wiki/${page.path}`}>{page.path}</Link>
    <TimeAgo time={page.last_viewed_at} />
    <TimeAgo time={page.updated_at} />
  </div>
}
