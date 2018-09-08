import React, { Component } from 'react'
import PropTypes from 'prop-types'
import querystring from 'querystring'
import history from 'lib/history'
// import { StatefulComponent } from 'lib/appState'
import './index.sass'

export default class Link extends Component {

  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    newWindow: PropTypes.bool,
    params: PropTypes.object,
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

    // move to higher level component?
    if (event.defaultPrevented) return

    if (
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      href.startsWith(window.location.origin)
    ){
      event.preventDefault()
      // this.takeAction('setLocation', href)
      history.pushState(null, window.document.title, href)
    }
  }

  render(){
    let {
      className = '',
      type,
      value,
      href,
      newWindow,
      params,
      ...props
    } = this.props
    className = `Link ${className}`
    if (type) className += ` Link-${type}`
    delete props.onClick

    if (params){
      let search = querystring.parse((window.location.search || '').replace(/^\?/, ''))
      search = querystring.stringify(withoutUndefineds({ ...search, ...params }))
      href = `${window.location.origin}${window.location.pathname}?${search}`
    }

    return <a
      ref={node => { this.link = node }}
      className={className}
      href={href}
      onClick={this.onClick}
      {...(newWindow && { target: "_blank"})}
      {...props}
    >
      {value ? value : props.children}
    </a>
  }
}


const withoutUndefineds = object =>
  Object.entries(object).reduce(
    (object, [key, value]) => {
      if (typeof value !== 'undefined') object[key] = value
      return object
    },
    {}
  )
