import React from 'react'
import PropTypes from 'prop-types'
import './index.sass'

export default function InspectObject({object}){
  let string
  if (typeof object === 'function'){
    string = object.toString()
  }else if (typeof object === 'undefined'){
    string = 'undefined'
  }else{
    try{
      string = JSON.stringify(object, null, 4)
    }catch(error){
      string = `ERROR: ${error}`
    }
  }
  return <pre className="InspectObject">
    <code>{string}</code>
  </pre>
}


InspectObject.propTypes = {
  object: PropTypes.any,
}
