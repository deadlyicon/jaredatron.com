import React from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'
import Page from 'components/Page'
import Link from 'components/Link'
import InspectObject from 'components/InspectObject'

export default class WikiPage extends Page {

  getPath(props){
    return `/${props.location.params.path || ''}`
  }

  loadWikiPage(path){
    takeAction(this, 'loadWikiPage', { path })
  }

  componentDidMount(){
    this.loadWikiPage(this.getPath(this.props))
  }

  componentWillReceiveProps(nextProps){
    if (this.props.location.params.path !== nextProps.location.params.path){
      this.loadWikiPage(this.getPath(nextProps))
    }
  }

  render(){
    const editing = !!this.props.location.params.edit
    const path = this.getPath(this.props)
    const keys = {
      page: `wikiPage:${path}`,
      loadingPage: `loadingWikiPage:${path}`,
      errorLoadingPage: `errorLoadingWikiPage:${path}`,
    }

    return <AppState keys={keys}>
      {({ page, loadingPage, errorLoadingPage }) => {
        return <div className="WikiPage">
          <div>
            <Pathlinks path={path} />
          </div>
          <InspectObject object={this.props} />
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
