import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'
import Page from 'components/Page'
import Link from 'components/Link'
import Markdown from 'components/Markdown'
import ErrorMessage from 'components/ErrorMessage'
import InspectObject from 'components/InspectObject'

import './index.sass'

export default class WikiPage extends Page {

  render(){
    const { path, edit } = this.props.location.params
    return path
      ? <PagePage path={path} editing={!!edit} />
      : <IndexPage />
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
    if (this.props.path !== nextProps.path){
      this.loadWikiPage(nextProps.path)
    }
  }


  render(){
    const { path } = this.props
    const keys = {
      page: `wikiPage:${path}`,
      loadingPage: `wikiPage:${path}:loading`,
      errorLoadingPage: `wikiPage:${path}:loadingError`,
    }
    return <AppState keys={keys}>
      {({ page, errorLoadingPage }) => {
        return <div className="WikiPage">
          <div>
            <Pathlinks path={path} />
          </div>
          <ErrorMessage error={errorLoadingPage} />
          {page && <Markdown source={page.content} />}
        </div>
      }}
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
