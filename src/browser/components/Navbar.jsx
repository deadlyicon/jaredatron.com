import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router'

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    }
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.closeSidebar = this.closeSidebar.bind(this)
  }

  toggleSidebar(){
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    })
  }

  closeSidebar(){
    this.setState({
      sidebarOpen: false
    })
  }

  render(){
    return <div>
      <AppBar
        title="JaredAtron"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this.toggleSidebar}
      />
      <Drawer
        docked={false}
        open={this.state.sidebarOpen}
        onRequestChange={(sidebarOpen) => this.setState({sidebarOpen})}
      >
        <LinkMenuItem to="/journal">Journal</LinkMenuItem>
        <LinkMenuItem to="/tracking">Tracking</LinkMenuItem>
        <LinkMenuItem to="/wiki">Wiki</LinkMenuItem>
      </Drawer>
    </div>
  }
}

const LinkMenuItem = function(props){
  return <MenuItem containerElement={<Link to={props.to} />}>{props.children}</MenuItem>
}
