import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import './index.sass'

export default function Form({
  className = '',
  onSubmit,
  children,
  ...props
}){
  props.onSubmit = event => {
    event.preventDefault()
    if (onSubmit) onSubmit(event)
  }
  return <form
    className={`Form ${className}`}
    {...props}
  >
    <input type="submit" style={{display: 'none'}} />
    {children}
  </form>
}
