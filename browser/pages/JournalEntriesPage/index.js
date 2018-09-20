import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'

import Page from 'components/Page'
import Link from 'components/Link'
import DateTime from 'components/DateTime'
import ErrorMessage from 'components/ErrorMessage'
import InspectObject from 'components/InspectObject'
import './index.sass'

export default class JournalEntriesPage extends Page {

  componentWillMount(){
    takeAction(this, 'journal.loadEntries')
  }

  render(){
    const { } = this.props.location.params
    // const keys =
    return <AppState
      keys={{
        journalEntries: 'journal:entries',
        loadError: 'journal:entries:loadError',
      }}
      Component={JournalEntriesPageContent}
    />
  }
}


class JournalEntriesPageContent extends PureComponent {
  render(){
    const { journalEntries, loadError } = this.props
    return <div className="JournalEntriesPage">
      <ErrorMessage error={loadError} />
      <div>
        <Link href="/journal">today</Link>
      </div>
      {journalEntries
        ? <JournalEntries journalEntries={journalEntries} />
        : <div>Loading…</div>
      }
    </div>
  }
}

const JournalEntries = ({ journalEntries }) =>
  <table>
    <thead>
      <tr>
        <th>Entry</th>
        <th>Created At</th>
        <th>Updated At</th>
      </tr>
    </thead>
    <tbody>
      {journalEntries.map(journalEntry =>
        <tr key={journalEntry.id}>
          <td>
            <Link type="link" href={`/journal/entry/${journalEntry.id}`}>
              {journalEntry.body}
            </Link>
          </td>
          <td>
            <DateTime date={journalEntry.created_at} />
          </td>
          <td>
            <DateTime date={journalEntry.updated_at} />
          </td>
        </tr>
      )}
    </tbody>
  </table>
