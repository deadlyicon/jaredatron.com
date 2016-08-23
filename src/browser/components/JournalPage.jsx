import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Navbar from './Navbar.jsx'

export default class JournalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    return <div>
      <Navbar />
      <h1>Journal</h1>
    </div>
  }
}
