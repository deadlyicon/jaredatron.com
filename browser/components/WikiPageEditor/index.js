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
    const { path } = this.props
    const keys = {
      page:         `wiki:page:${path}`,
      loading:      `wiki:page:${path}:loading`,
      notFound:     `wiki:page:${path}:notFound`,
      edits:        `wiki:page:${path}:edits`,
      editing:      `wiki:page:${path}:editing`,
      error:        `wiki:page:${path}:error`,
    }
    return <AppState keys={keys}>
      {({ page, loading, notFound, edits, editing, error }) => {
        const edited = !!edits
        const newPage = !!notFound
        const content = edited || notFound ? edits || '' : (page && page.content)
        return <div className="WikiPageEditor">
          <div className="WikiPageEditor-topbar">
            <Pathlinks path={path} />
            <Controls
              editing={newPage || editing}
              edited={edited}
              onCancel={()=>{
                takeAction(this, 'wiki.cancelEditPage', { path })
              }}
              onReset={()=>{
                takeAction(this, 'wiki.deletePageEdits', { path })
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
          <ErrorMessage error={error} />
          { loading
              ? <div>loading…</div>
              : (notFound || editing)
                ? <Editor
                    value={content}
                    onChange={edits => {
                      takeAction(this, 'wiki.updatePageEdits', { path, edits })
                    }}
                  />
                : <Markdown source={content} />
          }
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

const Controls = function({ path, editing, edited, onCancel, onReset, onSave, onDelete, onEdit }){
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
        value="reset"
        onClick={onReset}
        disabled={!edited}
      />
      <Link
        type="link"
        value="save"
        onClick={onSave}
        disabled={!edited}
      />
    </div>
  }
  return <div className="WikiPageEditor-Controls">
    <Link
      type="link"
      value="history"
      onClick={()=>{}}
    />
    <Link
      type="link"
      value="delete"
      onClick={onDelete}
    />
    <Link
      type="link"
      value="move"
      onClick={()=>{}}
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
    this.resize()
  }

  componentDidUpdate(){
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
        autoFocus
      />
    </div>
  }
}
