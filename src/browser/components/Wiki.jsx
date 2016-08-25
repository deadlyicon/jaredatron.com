import React, { Component } from 'react'
import R from 'request'
import Request from 'request-promise'

export default class Wiki extends Component {
  render(){
    return <div>
      {this.props.children}
    </div>
  }
}

Wiki.Page = class WikiPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null
    }
  }

  path(){
    return '/'+(this.props.params.splat||'')
  }

  componentWillMount(){
    console.log('loading wiki page: '+this.path())
    Request({
      url: '/api',
      qs: {
        proc: 'getWikiPage'
      }
    }).then(response => {
      console.log('response', response)
    }).catch(error => {
      console.log('request error', error)
    })
  }

  render(){
    console.log(this.props)
    const path = this.path()
    const content = this.state.content === null ?
      <div>Loading…</div> :
      <div>CONTENT LOADED</div>
    return <div>
      <h1>Page: {path}</h1>
      {content}
    </div>
  }
}
