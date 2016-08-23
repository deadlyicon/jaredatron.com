import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Navbar from './Navbar.jsx'

export default class WikiPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    return <div>
      <Navbar />
      <h1>Wiki</h1>
    </div>
  }
}
