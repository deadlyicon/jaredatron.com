import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Link from 'components/Link'

export default function Pathlinks({ path, prefix = '' }){
  const parts = path.split('/')
  const links = []
  parts.forEach((part, index) => {
    links.push(<span key={`${index}-break`}>/</span>)
    links.push(
      <Link
        key={`${index}-link`}
        href={`${prefix}${parts.slice(0,index+1).join('/')}`}
        type="link"
      >
        {part.replace(/[+-_]+/g, ' ')}
      </Link>
    )
  })
  return <span className="Pathlinks">{links}</span>
}
