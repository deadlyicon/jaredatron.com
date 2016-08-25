import React, { Component } from 'react'
import server from '../server'

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
    server.getWikiPage(this.path())
      .then(xhr => {
        console.log('xhr', xhr)
        this.setState({ content: xhr.response.content })
      }).catch(error => {
        this.setState({ error: error })
        console.log('request error', error)
      })
  }

  render(){
    console.log(this.props)
    const path = this.path()
    const content = this.state.content === null ?
      <div>Loading…</div> :
      <div dangerouslySetInnerHTML={{__html:this.state.content}} />

    return <div>
      <h1>Page: {path}</h1>
      {content}
    </div>
  }
}
