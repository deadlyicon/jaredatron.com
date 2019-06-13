import React, { PureComponent } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'

import Page from 'components/Page'
import Link from 'components/Link'
// import Button from 'components/Button'
import DateTime from 'components/DateTime'
import Header from 'components/Header'
import TimeAgo from 'components/TimeAgo'
import ErrorMessage from 'components/ErrorMessage'
import InspectObject from 'components/InspectObject'
import Editor from 'components/Editor'
import './index.sass'

export default class JournalPage extends Page {
  render(){
    const { } = this.props.location.params
    return <AppState
      keys={{
        journalEntries: 'journal:entries',
        loadError: 'journal:entries:loadError',
        createError: 'journal:creatingEntry:loadError',
      }}
      Component={JournalPageContent}
    />
  }
}

class JournalPageContent extends PureComponent {
  static propTypes = {
    journalEntries: PropTypes.object,
    loadError: ErrorMessage.propTypes.error,
    createError: ErrorMessage.propTypes.error,
  }
  render(){
    const { journalEntries, loadError, createError } = this.props
    return <div className="JournalPage">
      <ErrorMessage error={createError} />
      <JournalEditor />
      <ErrorMessage error={loadError} />
     <JournalEntriesByWeek journalEntries={journalEntries} />
    </div>
  }
}


class JournalEditor extends PureComponent {
  constructor(){
    super()
    this.state = {
      value: window.sessionStorage['journal:draft'] || DEFAULT_JOURNAL_VALUE,
    }
  }

  setValue = value => {
    if (value){
      value = window.sessionStorage['journal:draft'] = `${value}`
    }else{
      delete window.sessionStorage['journal:draft']
    }
    this.setState({ value })
  }

  save = () => {
    takeAction(this, 'journal.createEntry', { body: `${this.state.value}` })
    this.setValue(DEFAULT_JOURNAL_VALUE)
  }

  render(){
    const { value } = this.state
    return <div className="JournalPage-Editor">
      <div className="JournalPage-controls">
        <Link value="save" onClick={this.save}/>
      </div>
      <Editor
        autoFocus={false}
        value={value}
        onChange={this.setValue}
        onSave={this.save}
        defaultValue={value ? undefined : DEFAULT_JOURNAL_VALUE}
      />
    </div>
  }
}

const JournalEntriesByWeek = ({ journalEntries }) => {
  if (!journalEntries) return <div>Loading…</div>
  const byWeek = {}
  journalEntries = Object.values(journalEntries).map(journalEntry => {
    const createdAt = moment(journalEntry.created_at)
    return {
      ...journalEntry,
      created_at: createdAt,
      sortKey: createdAt.toDate().getTime(),
    }
  })
  journalEntries.forEach(journalEntry => {
    const week = journalEntry.created_at.format('YYYY-WW')
    byWeek[week] = byWeek[week] || []
    byWeek[week].push(journalEntry)
  })
  const weeks = Object.keys(byWeek).sort().reverse()
  return <div className="JournalPage-byWeek">
    {weeks.map(weekKey => {
      const [year, week] = weekKey.split('-')
      return <div key={weekKey} className="JournalPage-week">
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
        <th>Created At</th>
        <th>Entry</th>
      </tr>
    </thead>
    <tbody>
      {journalEntries.sort(sortBySortKe).map(journalEntry =>
        <tr key={journalEntry.id}>
          <td>
            <TimeAgo time={journalEntry.created_at} />
          </td>
          <td>
            <Link
              type="link"
              href={`/journal/${journalEntry.id}`}
              className="JournalPage-entryLink"
            >
              <span>{journalEntry.body}</span>
            </Link>
          </td>
        </tr>
      )}
    </tbody>
  </table>

const sortBySortKe = (a, b) => {
  return (
    a.sortKey < b.sortKey ? 1 :
    a.sortKey > b.sortKey ? -1 : 0
  )
}


const DEFAULT_JOURNAL_VALUE =
`### I just…


### I feel…

Fear Anger Sadness Joy Disgust Surprise Trust Anticipation


### I appreciate…


### I want…


`;
