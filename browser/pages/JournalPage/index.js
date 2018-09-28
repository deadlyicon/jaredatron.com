import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'

import Page from 'components/Page'
import Link from 'components/Link'
import ErrorMessage from 'components/ErrorMessage'
import Editor from 'components/Editor'
import './index.sass'

export default class JournalPage extends Page {

  componentWillMount(){
    takeAction(this, 'journal.loadTodaysEntry')
  }

  render(){
    const { } = this.props.location.params
    // const keys =
    return <AppState
      keys={{
        journalEntry: `journal:today`,
        changes:      `journal:today:changes`,
        loadError:    `journal:today:loadError`,
        updateError:  `journal:today:updateError`,
      }}
      Component={JournalPageContent}
    />
  }
}


class JournalPageContent extends PureComponent {

  onChange = body => {
    const id = this.props.journalEntry && this.props.journalEntry.id
    takeAction(this, 'journal.updateTodaysEntry', { id, body })
  }

  render(){
    const { journalEntry, changes, loadError, updateError } = this.props
    return <div className="JournalPage">
      <div>
        <Link href="/journal/entries">entries</Link>
        {changes && <span>saving…</span>}
      </div>
      <ErrorMessage error={loadError || updateError} />
      <Editor
        autoFocus
        className="JournalPage-Editor"
        value={changes || (journalEntry && journalEntry.body) || ''}
        onChange={this.onChange}
      />
    </div>
  }
}
