import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AppState, takeAction } from 'lib/appState'

import Link from 'components/Link'
import Markdown from 'components/Markdown'
import ConfirmationDialog from 'components/ConfirmationDialog'
import ErrorMessage from 'components/ErrorMessage'
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
      {({ page, loading, edits, saving, error }) => {
        return <div>history</div>
      }}
    </AppState>
  }
}

