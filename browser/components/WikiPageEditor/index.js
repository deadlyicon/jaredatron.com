import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'

import Link from 'components/Link'
import Markdown from 'components/Markdown'
import Pathlinks from 'components/Pathlinks'
import ConfirmationDialog from 'components/ConfirmationDialog'
import ErrorMessage from 'components/ErrorMessage'
import Editor from 'components/Editor'
import './index.sass'

export default class WikiPageEditor extends PureComponent {

  static propTypes = {
    path: PropTypes.string.isRequired,
  }

  render(){
    const { path } = this.props
    const keys = {
      page:    `wiki:page:${path}`,
      loading: `wiki:page:${path}:loading`,
      edits:   `wiki:page:${path}:edits`,
      saving:  `wiki:page:${path}:saving`,
      error:   `wiki:page:${path}:error`,
    }
    return <AppState keys={keys} path={path} Component={WikiPageEditorContent} />
  }
}

class WikiPageEditorContent extends PureComponent {

  static propTypes = {
    path:    PropTypes.string.isRequired,
    page:    PropTypes.object,
    loading: PropTypes.bool,
    edits:   PropTypes.string,
    saving:  PropTypes.bool,
    error:   ErrorMessage.propTypes.error,
  }

  state = {
    editing: false,
    previewing: false,
    confirmingReset: false,
    confirmingDelete: false,
  }

  componentWillMount(){
    this.onPageChange(this.props.path)
  }

  componentWillReceiveProps(nextProps){
    if (this.props.path !== nextProps.path)
      this.onPageChange(nextProps.path)
  }

  componentDidMount(){
    document.addEventListener('keydown', this.onDocumentKeyDown)
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.onDocumentKeyDown)
  }

  onDocumentKeyDown = event => {
    const { metaKey, shiftKey, key } = event

    if (metaKey && !shiftKey){
      if (key === 'e') {
        event.preventDefault()
        this.state.editing ? this.cancel() : this.edit()
      }
      if (key === 'p') {
        event.preventDefault()
        this.togglePreview()
      }
      if (key === 'm') {
        event.preventDefault()
        this.move()
      }
      if (key === 'r' && this.props.edits) {
        event.preventDefault()
        this.reset()
      }
      if (key === 's' && this.props.edits) {
        event.preventDefault()
        this.save()
      }
      if (key === 'Escape') {
        event.preventDefault()
        this.cancel()
      }
    }
  }

  onPageChange(path){
    takeAction(this, 'wiki.loadPage', { path })
    this.setState({
      editing: false,
      previewing: false,
      confirmingReset: false,
      confirmingDelete: false,
    })
  }

  focusEditor(){
    const editorTextarea = ReactDOM.findDOMNode(this).querySelector('.WikiPageEditor-Editor textarea')
    if (editorTextarea) editorTextarea.focus()
  }

  cancel = () => {
    this.setState({ editing: false, previewing: false })
  }

  reset = () => {
    this.setState({ confirmingReset: true })
  }

  save = () => {
    const { path } = this.props
    this.setState({ editing: false, previewing: false })
    takeAction(this, 'wiki.savePageEdits', { path })
  }

  delete = () => {
    this.setState({ confirmingDelete: true })
  }

  edit = () => {
    this.setState({ editing: true })
  }

  togglePreview = () => {
    this.setState({ previewing: !this.state.previewing })
  }

  move = () => {
    const { path } = this.props
    let newPath = prompt('Where to?', path)
    if (newPath){
      newPath = newPath.trim().toLowerCase().replace(/\s+/g,'-')
      if (newPath !== path)
        takeAction(this, 'wiki.movePage', { path, newPath })
    }
  }

  render(){
    const { editing, previewing, confirmingReset, confirmingDelete } = this.state
    const { path, page, loading, edits, saving, error } = this.props

    const newPage = !loading && !page
    const content = (
      loading ? null :
      newPage ?
        typeof edits === 'string'
          ? edits
          : `# ${path.replace(/\-+/g,' ').replace(/\/+/g,' / ')} \n\n` :
      editing ? edits || page.content :
      page.content
    )
    const edited = typeof edits === 'string'

    let className = `WikiPageEditor`
    if (editing) className += ` WikiPageEditor-editing`
    if (previewing) className += ` WikiPageEditor-previewing`

    return <div className={className}>

      {confirmingReset && <ConfirmationDialog
        prompt="Are you sure you want to reset your unsaved change to this wiki page?"
        onConfirmation={() => {
          this.setState({ confirmingReset: false })
          const edits = newPage ? undefined : page.content
          takeAction(this, 'wiki.updatePageEdits', { path, edits })
          this.focusEditor()
        }}
        onCancel={() => {
          this.setState({ confirmingReset: false })
        }}
      />}

      {confirmingDelete && <ConfirmationDialog
        prompt="Are you sure you want to delete this wiki page?"
        onConfirmation={() => {
          this.setState({ confirmingDelete: false })
          takeAction(this, 'wiki.deletePage', { path })
        }}
        onCancel={() => {
          this.setState({ confirmingDelete: false })
        }}
      />}

      <div className="WikiPageEditor-topbar">
        <Pathlinks prefix="/wiki/" path={path} />
        <Controls
          newPage={newPage}
          previewing={previewing}
          editing={newPage || editing}
          edited={edited}
          cancel={this.cancel}
          reset={this.reset}
          save={this.save}
          delete={this.delete}
          edit={this.edit}
          togglePreview={this.togglePreview}
          move={this.move}
        />
      </div>
      <ErrorMessage error={error} />
      {
        loading ? <div>loading…</div> :
        saving  ? <div>saving…</div> :
        <Markdown source={content} />
      }
      { newPage || editing && <Editor
          autoFocus
          className="WikiPageEditor-Editor"
          value={content}
          onChange={edits => {
            takeAction(this, 'wiki.updatePageEdits', { path, edits })
          }}
        />
      }
    </div>
  }
}

const Controls = function({
  newPage,
  editing,
  previewing,
  edited,
  cancel,
  reset,
  togglePreview,
  save,
  delete: _delete,
  edit,
  move,
}){
  if (editing){
    return <div className="WikiPageEditor-Controls">
      { newPage ||
        <Link
          type="link"
          value="cancel"
          replace
          onClick={cancel}
        />
      }
      { edited &&
        <Link
          type="link"
          value="reset"
          onClick={reset}
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
        onClick={edited ? save : cancel}
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
      onClick={_delete}
    />
    <Link
      type="link"
      value="move"
      onClick={move}
    />
    <Link
      type="link"
      value="edit"
      onClick={edit}
    />
  </div>
}
