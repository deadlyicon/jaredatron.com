import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'

import Link from 'components/Link'
import Markdown from 'components/Markdown'
import ErrorMessage from 'components/ErrorMessage'
import './index.sass'

export default class WikiPageEditor extends PureComponent {

  static propTypes = {
    path: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
  }

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
    const { path, edit } = this.props
    const keys = {
      page: `wikiPage:${path}`,
      loadingPage: `wikiPage:${path}:loading`,
      errorLoadingPage: `wikiPage:${path}:loadingError`,
    }
    return <AppState keys={keys}>
      {({ page, loadingPage, errorLoadingPage }) =>
        <div className="WikiPageEditor">
          <div className="WikiPageEditor-topbar">
            <Pathlinks path={path} />
            <Controls editing={edit} />
          </div>
          <ErrorMessage error={errorLoadingPage} />
          {page && (
            edit
              ? <Editor source={page.content} />
              : <Markdown source={page.content} />
          )}
        </div>
      }
    </AppState>
  }
}


const Pathlinks = ({ path }) => {
  const parts = path.split('/')
  const links = []
  parts.forEach((part, index) => {
    links.push(<span key={`${index}-break`}>/</span>)
    links.push(
      <Link
        key={`${index}-link`}
        href={'/wiki/'+parts.slice(0,index+1).join('/')}
        type="link"
      >
        {part.replace(/[+-_]+/g, ' ')}
      </Link>
    )
  })
  return <span className="Pathlinks">{links}</span>
}

const Controls = ({ editing }) => {
  if (editing){
    return <div className="WikiPageEditor-Controls">
      <Link
        type="link"
        value="cancel"
        params={{edit: null}}
      />
      <Link
        type="link"
        value="save"
      />
    </div>
  }
  return <div className="WikiPageEditor-Controls">
    <Link
      type="link"
      value="history"
    />
    <Link
      type="link"
      value="delete"
    />
    <Link
      type="link"
      value="move"
    />
    <Link
      type="link"
      value="edit"
      params={{edit:1}}
    />
  </div>
}

class Editor extends PureComponent {

  state = {}

  componentDidMount(){
    console.log('componentDidMount', this.textarea)
    this.resize()
  }

  componentDidUpdate(){
    console.log('componentDidUpdate', this.textarea)
    this.resize()
  }

  resize(){
    this.textarea.style.height = `${this.textarea.scrollHeight}px`
  }

  render(){
    const value = 'value' in this.state
      ? this.state.value
      : this.props.source

    return <div className="WikiPageEditor-Editor">
      <textarea
        ref={node => { this.textarea = node }}
        value={value}
        onChange={event => {
          this.setState({ value: event.target.value })
        }}
      />
    </div>
  }
}
