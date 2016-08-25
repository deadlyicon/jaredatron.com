import React, { Component } from 'react'

export default class Journal extends Component {
  render(){
    return <div>
      <h1>Journal</h1>
      {this.props.children}
    </div>
  }
}


Journal.Index = class JournalIndex extends Component {
  render(){
    return <div>
      <h1>Journal Index</h1>
    </div>
  }
}

Journal.New = class JournalNew extends Component {
  render(){
    return <div>
      <h1>Journal New</h1>
    </div>
  }
}

Journal.Show = class JournalShow extends Component {
  render(){
    return <div>
      <h1>Journal Show</h1>
      <h2>id #{this.props.params.journalId}</h2>
    </div>
  }
}

Journal.Edit = class JournalEdit extends Component {
  render(){
    return <div>
      <h1>Journal Edit</h1>
      <h2>id #{this.props.params.journalId}</h2>
    </div>
  }
}
