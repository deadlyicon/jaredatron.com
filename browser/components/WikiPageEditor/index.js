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
    editing: PropTypes.bool.isRequired,
  }

  loadWikiPage(path){
    takeAction(this, 'wiki.loadPage', { path })
  }

  componentDidMount(){
    this.loadWikiPage(this.props.path)
  }

  componentWillReceiveProps(nextProps){
    if (this.props.path !== nextProps.path)
      this.loadWikiPage(nextProps.path)
  }

  render(){
    const { path, editing } = this.props
    const keys = {
      page: `wiki:page:${path}`,
      stagedContent: `wiki:page:${path}:stagedContent`,
      loadingPage: `wiki:page:${path}:loading`,
      errorLoadingPage: `wiki:page:${path}:loadingError`,
    }
    return <AppState keys={keys}>
      {({ page, stagedContent, loadingPage, errorLoadingPage }) => {
        const edited = !!stagedContent
        const content = edited ? stagedContent : (page && page.content)
        return <div className="WikiPageEditor">
          <div className="WikiPageEditor-topbar">
            <Pathlinks path={path} />
            <Controls
              editing={editing}
              edited={edited}
              onCancel={()=>{
                takeAction(this, 'wiki.cancelEditPage', { path })
              }}
              onSave={()=>{
                takeAction(this, 'wiki.saveChangesToWikiPage', { path, content })
              }}
              onDelete={()=>{
                takeAction(this, 'wiki.deletePage', { path })
              }}
              onEdit={()=>{
                takeAction(this, 'wiki.editPage', { path })
              }}
            />
          </div>
          <ErrorMessage error={errorLoadingPage} />
          {page && (
            editing
              ? <Editor
                  value={content}
                  onChange={this.onContentChange}
                />
              : <Markdown source={content} />
          )}
        </div>
      }}
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

const Controls = function({ path, editing, onCancel, onSave, onDelete, onEdit }){
  if (editing){
    return <div className="WikiPageEditor-Controls">
      <Link
        type="link"
        value="cancel"
        replace
        onClick={onCancel}
      />
      <Link
        type="link"
        value="save"
        onClick={onSave}
      />
    </div>
  }
  return <div className="WikiPageEditor-Controls">
    <Link
      type="link"
      value="history"
      // onClick={() => {
      //   takeAction(this, 'stageWikiPageChange', { path, content })
      // }}
    />
    <Link
      type="link"
      value="delete"
      onClick={onDelete}
    />
    <Link
      type="link"
      // value="move"
      // onClick={() => {
      //   takeAction(this, 'stageWikiPageChange', { path, content })
      // }}
    />
    <Link
      type="link"
      value="edit"
      onClick={onEdit}
    />
  </div>
}

class Editor extends PureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

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
    const { value, onChange } = this.props
    return <div className="WikiPageEditor-Editor">
      <textarea
        ref={node => { this.textarea = node }}
        value={value}
        onChange={event => { onChange(event.target.value) }}
      />
    </div>
  }
}
