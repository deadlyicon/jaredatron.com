import React from 'react'
import PropTypes from 'prop-types'
import './index.sass'

export default function Header({ className = '', value, children, ...props }){
  return <div className={`Header ${className}`}>{value || children}</div>
}

Header.propTypes = {
  className: PropTypes.string,
  value: PropTypes.node,
  children: PropTypes.node,
}
