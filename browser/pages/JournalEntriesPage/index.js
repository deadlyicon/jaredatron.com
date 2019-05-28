import React, { PureComponent } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'

import Page from 'components/Page'
import Link from 'components/Link'
import DateTime from 'components/DateTime'
import Header from 'components/Header'
import TimeAgo from 'components/TimeAgo'
import ErrorMessage from 'components/ErrorMessage'
import InspectObject from 'components/InspectObject'
import './index.sass'

export default class JournalEntriesPage extends Page {

  render(){
    const { } = this.props.location.params
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
    let { journalEntries, loadError } = this.props
    journalEntries = journalEntries && journalEntries.filter(journalEntry =>
      // ignore todays journal entry
      moment(journalEntry.created_at).isBefore(moment(new Date).startOf('day'))
    )
    return <div className="JournalEntriesPage">
      <ErrorMessage error={loadError} />
      <div className="JournalEntriesPage-controls">
        <Link href="/journal">today</Link>
      </div>
      {journalEntries
        ? <JournalEntriesByWeek journalEntries={journalEntries} />
        : <div>Loading…</div>
      }
    </div>
  }
}

const JournalEntriesByWeek = ({ journalEntries }) => {
  const byWeek = {}
  journalEntries.forEach(journalEntry => {
    const week = moment(journalEntry.created_at).format('YYYY-WW')
    byWeek[week] = byWeek[week] || []
    byWeek[week].push(journalEntry)
  })
  const weeks = Object.keys(byWeek).sort().reverse()
  return <div className="JournalEntriesPage-byWeek">
    {weeks.map(weekKey => {
      const [year, week] = weekKey.split('-')
      return <div key={weekKey} className="JournalEntriesPage-week">
        <Header value={`Week ${week} of ${year}`} />
        <JournalEntries journalEntries={byWeek[weekKey]} />
      </div>
    })}
  </div>
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
            <Link
              type="link"
              href={`/journal/entry/${journalEntry.id}`}
              className="JournalEntriesPage-entryLink"
            >
              {journalEntry.body.split("\n")[0] || <i>empty</i>}
            </Link>
          </td>
          <td>
            <TimeAgo time={journalEntry.created_at} />
          </td>
          <td>
            <TimeAgo time={journalEntry.updated_at} />
          </td>
        </tr>
      )}
    </tbody>
  </table>
