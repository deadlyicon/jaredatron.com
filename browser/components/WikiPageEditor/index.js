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

  state = {
    editing: false,
    previewing: false,
    confirmingReset: false,
    confirmingDelete: false,
  }

  componentDidMount(){
    this.onPageChange(this.props.path)
  }

  componentWillReceiveProps(nextProps){
    if (this.props.path !== nextProps.path)
      this.onPageChange(nextProps.path)
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

  render(){
    const { editing, previewing, confirmingReset, confirmingDelete } = this.state
    const { path } = this.props
    const keys = {
      page:    `wiki:page:${path}`,
      loading: `wiki:page:${path}:loading`,
      edits:   `wiki:page:${path}:edits`,
      saving:  `wiki:page:${path}:saving`,
      error:   `wiki:page:${path}:error`,
    }
    return <AppState keys={keys}>
      {({ page, loading, edits, saving, error }) => {
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
        return <div className="WikiPageEditor">

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
              onCancel={()=>{
                this.setState({ editing: false, previewing: false })
              }}
              onReset={()=>{
                this.setState({ confirmingReset: true })
              }}
              onSave={()=>{
                this.setState({ editing: false, previewing: false })
                takeAction(this, 'wiki.savePageEdits', { path })
              }}
              onDelete={()=>{
                this.setState({ confirmingDelete: true })
              }}
              onEdit={()=>{
                this.setState({ editing: true })
              }}
              togglePreview={()=>{
                this.setState({ previewing: !previewing })
              }}
              onMove={()=>{
                const newPath = prompt('Where to?', path)
                  .trim().toLowerCase().replace(/\s+/g,'-')
                if (newPath && newPath !== path)
                  takeAction(this, 'wiki.movePage', { path, newPath })
              }}
            />
          </div>
          <ErrorMessage error={error} />
          {
            loading ? <div>loading…</div> :
            saving  ? <div>saving…</div> :
            previewing ? <Markdown source={content} /> :
            newPage || editing ? <Editor
              autoFocus
              className="WikiPageEditor-Editor"
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
  onMove,
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
      { edited &&
        <Link
          type="link"
          value="reset"
          onClick={onReset}
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
      onClick={onMove}
    />
    <Link
      type="link"
      value="edit"
      onClick={onEdit}
    />
  </div>
}
