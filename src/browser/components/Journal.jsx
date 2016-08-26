import React, { Component } from 'react'
import { Link } from 'react-router'
import server from '../server'
import './Journal.sass'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}  from 'material-ui/Table';
import Datetime from './Datetime.jsx'


export default class Journal extends Component {
  render(){
    return <div>
      <div>
        <Link to="/journal">Index</Link>
        <Link to="/journal/new">New</Link>
      </div>
      {this.props.children}
    </div>
  }
}


Journal.Index = class JournalIndex extends Component {
  constructor(){
    super()
    this.state = {
      error: null,
      journalEntries: null,
    }
  }
  componentWillMount(){
    server.getJournalEntries()
      .then(journalEntries => {
        this.setState({ journalEntries: journalEntries })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error: error })
      })
  }
  render(){
    if (this.state.error){
      return <div>
        <h3>ERROR: {this.state.error.message}</h3>
        <pre>{this.state.error.stack}</pre>
      </div>
    }

    const content = this.state.journalEntries === null ?
      <div>Loading…</div> :
      <JournalEntriesList journalEntries={this.state.journalEntries || [{id:'444'}]}/>

    return <div>
      <h1>Journal Entries</h1>
      {content}
    </div>
  }
}

const JournalEntriesList = function(props){
  const journalEntries = props.journalEntries.map(journalEntry =>
    <TableRow key={journalEntry.id}>
      <TableRowColumn>
        <Link to={"/journal/"+journalEntry.id}>
          {journalEntry.id}
        </Link>
      </TableRowColumn>
      <TableRowColumn>
        <Link to={"/journal/"+journalEntry.id}>
          <Datetime format="short" value={journalEntry.createdAt} />
        </Link>
      </TableRowColumn>
      <TableRowColumn>
        <Link to={"/journal/"+journalEntry.id}>
          <Datetime format="short" value={journalEntry.updatedAt} />
        </Link>
      </TableRowColumn>
      <TableRowColumn>
        <Link to={"/journal/"+journalEntry.id}>
          {journalEntry.body}
        </Link>
      </TableRowColumn>
    </TableRow>
  )
  return <Table
      fixedHeader={false}
      fixedFooter={false}
      selectable={false}
      displaySelectAll={false}
      style={{tableLayout: 'auto'}}
    >
      <TableHeader
        adjustForCheckbox={false}
        displaySelectAll={false}
      >
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Created At</TableHeaderColumn>
          <TableHeaderColumn>Updates At</TableHeaderColumn>
          <TableHeaderColumn>Body</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
      >
        {journalEntries}
      </TableBody>
    </Table>
}

Journal.New = class JournalNew extends Component {
  constructor(){
    super()
    this.state = {
      error: null,
      body: '',
    }
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount(){
    const { body } = this.refs
    body.selectionStart = 0
    body.selectionEnd = 0
    body.focus()
  }
  onChange(event){
    this.setState({body: this.refs.body.value})
  }
  render(){
    return <div>
      <textarea
        ref="body"
        className="full-page-textarea"
        value={this.state.body}
        onChange={this.onChange}
        placeholder="New Journal Entry…"
      />
    </div>
  }
}

Journal.Show = class JournalShow extends Component {
  constructor(){
    super()
    this.state = {
      error: null,
      journalEntry: null,
    }
  }
  componentWillMount(){
    server.getJournalEntry(this.props.params.journalId)
      .then(journalEntry => {
        this.setState({ journalEntry: journalEntry })
      })
      .catch(response => {
        this.setState({ error: response.error })
      })
  }
  render(){
    const { journalEntry } = this.state
    if (journalEntry){
      return <div className="JournalEntry">
        <h1>Journal #{journalEntry.id}</h1>
        <pre>{journalEntry.body}</pre>
      </div>
    }else{
      return <div>Loading…</div>
    }
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
