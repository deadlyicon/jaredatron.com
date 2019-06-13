import React from 'react'
import PropTypes from 'prop-types'
import './index.sass'

export default function ErrorMessage({error}){
  const message = error
    ? <span>{error instanceof Error ? error.message : error}</span>
    : null
  return <span className="ErrorMessage">{message}</span>
}


ErrorMessage.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Error),
  ]),
}
