import React from 'react'
import PropTypes from 'prop-types'
import './index.sass'

export default function ErrorMessage({error}){
  const message = error instanceof Error
    ? error.message : error
  return <pre className="ErrorMessage">
    <code>{message}</code>
  </pre>
}


ErrorMessage.propTypes = {
  error: PropTypes.instanceOf(Error),
}
