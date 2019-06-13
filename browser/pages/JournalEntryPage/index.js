import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'

import Page from 'components/Page'
import Link from 'components/Link'
import Header from 'components/Header'
import DateTime from 'components/DateTime'
import TimeAgo from 'components/TimeAgo'
import ErrorMessage from 'components/ErrorMessage'
import InspectObject from 'components/InspectObject'
import './index.sass'

export default class JournalEntryPage extends Page {
  render(){
    const { id } = this.props
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
    const journalEntry = journalEntries && journalEntries[id]

    const content = (
      !journalEntries ? <div>Loading…</div> :
      !journalEntry ? <div><ErrorMessage error="Entry not found" /></div> :
      <div>
        <div className="JournalEntryPage-controls">
          <span>Created <TimeAgo time={journalEntry.created_at} /></span>
        </div>
        <Header>
          <DateTime
            date={journalEntry.created_at}
            format="fullDay"
          />
        </Header>
        <pre className="JournalEntryPage-body">{journalEntry.body}</pre>
      </div>
    )

    return <div className="JournalEntryPage">
      {content}
    </div>
  }
}
