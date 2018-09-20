import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'

import Page from 'components/Page'
import Link from 'components/Link'
import DateTime from 'components/DateTime'
import TimeAgo from 'components/TimeAgo'
import ErrorMessage from 'components/ErrorMessage'
import InspectObject from 'components/InspectObject'
import './index.sass'

export default class JournalEntryPage extends Page {

  componentWillMount(){
    // const id = this.pageId()
    takeAction(this, 'journal.loadEntries')
  }

  render(){
    const { id } = this.props.location.params
    // const keys =
    return <AppState
      keys={{
        journalEntries: 'journal:entries',
        loadError: 'journal:entries:loadError',
      }}
      id={Number(id)}
      Component={JournalEntryPageContent}
    />
  }
}


class JournalEntryPageContent extends PureComponent {
  render(){
    const { id, journalEntries, loadError } = this.props
    const journalEntry = journalEntries &&
      journalEntries.find(j => j.id === id)

    const content = journalEntry
      ? <div>
        <div className="JournalEntryPage-controls">
          <Link href="/journal/entries">entries</Link>&nbsp;
          <span>Created <TimeAgo time={journalEntry.created_at} /></span>
        </div>
        <pre className="JournalEntryPage-body">{journalEntry.body}</pre>
      </div>
      : <div>Loading…</div>

    return <div className="JournalEntryPage">
      {content}
    </div>
  }
}
