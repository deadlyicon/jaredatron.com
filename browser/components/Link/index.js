import React from 'react'
import PropTypes from 'prop-types'
import { StatefulComponent } from 'lib/appState'
import './index.sass'

export default class Link extends StatefulComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    newWindow: PropTypes.bool,
  }

  static defaultProps = {
    href: '',
    type: null,
  }

  onClick = event => {
    if (this.props.disabled) {
      event.preventDefault()
      return
    }

    const href = this.link.href

    if (this.props.onClick){
      this.props.onClick(event)
    }

    if (event.defaultPrevented) return

    if (
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      href.startsWith(window.location.origin)
    ){
      event.preventDefault()
      this.takeAction('setLocation', href)
    }
  }

  render(){
    let {
      className = '',
      type,
      href,
      newWindow,
      ...props
    } = this.props
    className = `Link ${className}`
    if (type) className += ` Link-${type}`
    delete props.onClick

    return <a
      ref={node => { this.link = node }}
      className={className}
      href={href}
      onClick={this.onClick}
      {...(newWindow && { target: "_blank"})}
      {...props}
    >
      {props.children}
    </a>
  }
}
