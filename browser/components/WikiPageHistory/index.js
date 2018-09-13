import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'

import Link from 'components/Link'
import TimeAgo from 'components/TimeAgo'
import Markdown from 'components/Markdown'
import Pathlinks from 'components/Pathlinks'
import ErrorMessage from 'components/ErrorMessage'
import InspectObject from 'components/InspectObject'
import './index.sass'

export default class WikiPageHistory extends PureComponent {

  static propTypes = {
    path: PropTypes.string.isRequired,
  }

  loadWikiPageHistory(path){
    takeAction(this, 'wiki.loadPageHistory', { path })
  }

  componentDidMount(){
    this.loadWikiPageHistory(this.props.path)
  }

  componentWillReceiveProps(nextProps){
    if (this.props.path !== nextProps.path)
      this.loadWikiPageHistory(nextProps.path)
  }

  render(){
    const { path } = this.props
    const keys = {
      page:    `wiki:page:${path}`,
      history: `wiki:page:${path}:history`,
      loading: `wiki:page:${path}:history:loading`,
      error:   `wiki:page:${path}:history:loading:error`,
    }
    return <AppState keys={keys}>
      {({ page, loading, error, history }) => {
        return <div className="WikiPageHistory">
          <Pathlinks prefix="/wiki/" path={path} />
          <ErrorMessage error={error} />
          {loading || !history
            ? <div>loading…</div>
            : history.map(version =>
              <Version key={version.id} {...version} />
            )
          }
        </div>
      }}
    </AppState>
  }
}

class Version extends PureComponent {
  state = { open: false }
  toggle = () => {
    this.setState({ open: !this.state.open })
  }
  render() {
    const { path, content, updated_at } = this.props
    const { open } = this.state
    return <div className="WikiPageHistory-Version">
      <div className="WikiPageHistory-Version-details">
        <button onClick={this.toggle}>{open ? '▼' : '▶'}</button>
        &nbsp;
        <span>Updated <TimeAgo time={updated_at} /></span>
        &nbsp;/&nbsp;
        <span>path: /wiki/{path}</span>
      </div>
      {open && <Markdown source={content} />}
    </div>
  }
}
