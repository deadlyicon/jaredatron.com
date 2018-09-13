import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'

import Link from 'components/Link'
import Markdown from 'components/Markdown'
import ConfirmationDialog from 'components/ConfirmationDialog'
import ErrorMessage from 'components/ErrorMessage'
import './index.sass'

export default class WikiPageEditor extends PureComponent {

  static propTypes = {
    path: PropTypes.string.isRequired,
  }

  state = {
    previewing: false,
    confirmingDelete: false,
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
    const { previewing, confirmingDelete } = this.state
    const { path } = this.props
    const keys = {
      page:         `wiki:page:${path}`,
      loading:      `wiki:page:${path}:loading`,
      edits:        `wiki:page:${path}:edits`,
      saving:       `wiki:page:${path}:saving`,
      error:        `wiki:page:${path}:error`,
    }
    return <AppState keys={keys}>
      {({ page, loading, edits, saving, error }) => {
        const newPage = !loading && !page
        const editing = newPage || !!edits
        const content = (
          loading ? null :
          newPage ? edits || `# ${path.replace(/\-+/g,' ').replace(/\/+/g,' / ')} \n\n` :
          edits   ? edits : (page && page.content)
        )
        const edited = edits && (newPage || edits !== page.content)
        return <div className="WikiPageEditor">
          {confirmingDelete && <ConfirmationDialog
            prompt="Are you sure you want to delete this wiki page?"
            onConfirmation={() => {
              takeAction(this, 'wiki.deletePage', { path })
            }}
            onCancel={() => {
              this.setState({ confirmingDelete: false })
            }}
          />}
          <div className="WikiPageEditor-topbar">
            <Pathlinks path={path} />
            <Controls
              newPage={newPage}
              previewing={previewing}
              editing={newPage || editing}
              edited={edited}
              onCancel={()=>{
                this.setState({ previewing: false })
                takeAction(this, 'wiki.deletePageEdits', { path })
              }}
              onReset={()=>{
                takeAction(this, 'wiki.updatePageEdits', { path, edits: page.content })
              }}
              onSave={()=>{
                takeAction(this, 'wiki.savePageEdits', { path })
              }}
              onDelete={()=>{
                this.setState({ confirmingDelete: true })
              }}
              onEdit={()=>{
                takeAction(this, 'wiki.updatePageEdits', { path, edits: page.content })
              }}
              togglePreview={()=>{
                this.setState({ previewing: !previewing })
              }}
            />
          </div>
          <ErrorMessage error={error} />
          {
            loading ? <div>loading…</div> :
            saving  ? <div>saving…</div> :
            previewing ? <Markdown source={content} /> :
            editing ? <Editor
              value={content}
              onChange={edits => {
                takeAction(this, 'wiki.updatePageEdits', { path, edits })
              }}
            /> :
            <Markdown source={content} />
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

const Controls = function({
  newPage,
  editing,
  previewing,
  edited,
  onCancel,
  onReset,
  togglePreview,
  onSave,
  onDelete,
  onEdit,
}){
  if (editing){
    return <div className="WikiPageEditor-Controls">
      { newPage ||
        <Link
          type="link"
          value="cancel"
          replace
          onClick={onCancel}
        />
      }
      { newPage ||
        <Link
          type="link"
          value="reset"
          onClick={onReset}
          disabled={!edited}
        />
      }
      <Link
        type="link"
        value={previewing ? "edit" : "preview"}
        onClick={togglePreview}
      />
      <Link
        type="link"
        value="save"
        onClick={edited ? onSave : onCancel}
      />
    </div>
  }
  return <div className="WikiPageEditor-Controls">
    <Link
      type="link"
      value="history"
      params={{history: '1'}}
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
