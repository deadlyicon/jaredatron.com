import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import Link from 'components/Link'
import './index.sass'

const renderers = Object.freeze({
  link: props =>
    <Link type="link" {...props} rel="noopener noreferrer nofollow" />,
})

const linkTarget = (href) =>
  href.startsWith(window.location.origin) ? undefined : '_blank'


export default function Markdown({ source }){
  const props = {
    source,
    className: 'Markdown',
    escapeHtml: false,
    linkTarget,
    renderers,
  }
  return <ReactMarkdown {...props} />
}
