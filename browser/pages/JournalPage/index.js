import React from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'
import Page from 'components/Page'
import Editor from 'components/Editor'
import './index.sass'

export default class JournalPage extends Page {

  render(){
    const { } = this.props.location.params
    const keys = {
      journalEntry: 'xx',
    }
    return <AppState keys={keys}>
      {({ }) => {

        return <div className="JournalPage">
          <h1>Journal</h1>

          <Editor
            autoFocus
            className="JournalPage-Editor"
            value=""
            onChange={() => {}}
          />
        </div>
      }}
    </AppState>
  }
}
