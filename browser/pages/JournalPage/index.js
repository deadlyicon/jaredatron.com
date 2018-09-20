import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'

import Page from 'components/Page'
import Link from 'components/Link'
import Editor from 'components/Editor'
import './index.sass'

export default class JournalPage extends Page {

  render(){
    const { } = this.props.location.params
    // const keys =
    return <AppState
      keys={{
        journalEntry: 'xx',
      }}
      Component={JournalPageContent}
    />
  }
}


class JournalPageContent extends PureComponent {

  render(){
    return <div className="JournalPage">
      <div>
        <Link href="/journal/entries">entries</Link>
      </div>
      <Editor
        autoFocus
        className="JournalPage-Editor"
        value=""
        onChange={() => {}}
      />
    </div>
  }
}
