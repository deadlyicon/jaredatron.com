import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router'
import server from '../server'
import './Wiki.sass';

export default class Wiki extends Component {
  render(){
    return <div>
      {this.props.children}
    </div>
  }
}

Wiki.Page = class WikiPage extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      markdown: null
    }
    this.cancel = this.cancel.bind(this)
    this.save = this.save.bind(this)
  }

  path(){
    return '/'+(this.props.params.splat||'')
  }

  pathname(){
    return '/wiki'+this.path()
  }

  reload(){
    server.getWikiPage(this.path())
      .then(response => {
        this.setState({ markdown: response.markdown })
      })
      .catch(response => {
        this.setState({ error: response.error })
      })
  }

  componentWillMount(){
    this.reload()
  }

  goBackToShow(){
    this.context.router.push(this.pathname())
  }

  cancel(){
    this.goBackToShow()
  }

  save(newValue){
    console.log('WOULD SAVE', newValue)
    server.updateWikiPage(this.path(), newValue)
      .then(response => {
        this.setState({ markdown: response.markdown })
        this.goBackToShow()
      })
      .catch(response => {
        this.setState({ error: response.error })
      })
  }

  render(){
    console.log(this.props)
    const path = this.path()
    if (this.state.error){
      return <div>
        <h3>ERROR: {this.state.error.message}</h3>
        <pre>{this.state.error.stack}</pre>
      </div>
    }
    if (this.state.markdown === null){
      return <div>Loading…</div>
    }
    if (this.props.location.query.edit){
      return <MarkdownEditor
        value={this.state.markdown}
        onSave={this.save}
        onCancel={this.cancel}
      />
    }
    return <div>
      <Controls pathname={this.pathname()} {...this.props} />,
      <Markdown source={this.state.markdown} />
    </div>
    // const content = this.state.markdown === null ?
    //   <div>Loading…</div> :
    //   this.props.location.query.edit ?
    //   <textarea value={this.state.markdown}/> :
    //   [
    //     <Controls key="controls" path={path} {...this.props} />,
    //     <Markdown key="contents" source={this.state.markdown} />
    //   ]

    // return <div>{content}</div>
  }
}

const Controls = function(props){
  return <div>
    <Link to={{pathname: props.pathname, query:{edit:true}}}>Edit</Link>
  </div>
}

const Markdown = function(props){
  return <ReactMarkdown
    source={props.source}
    renderers={renderers}
  />
}

const renderers = {
  'link': function(props){
    props = Object.assign({}, props)
    props.to = props.href
    delete props.href
    delete props.literal
    delete props.nodeKey
    return <Link {...props} />
  }
}


class MarkdownEditor extends React.Component {
  constructor(props){
    super()
    this.state = {
      value: props.value
    }
    this.onChange = this.onChange.bind(this)
    this.cancel = this.cancel.bind(this)
    this.save = this.save.bind(this)
  }
  onChange(event){
    this.setState({value: event.target.value})
  }
  cancel(event){
    event.preventDefault()
    this.props.onCancel()
  }
  save(event){
    event.preventDefault()
    this.props.onSave(this.state.value)
  }
  componentDidMount(){
    const { input } = this.refs
    input.selectionStart = 0
    input.selectionEnd = 0
    input.focus()
  }
  render(){
    return <div className="MarkdownEditor">
      <div className="MarkdownEditor-controls">
        <Link to="" onClick={this.cancel}>Cancel</Link>
        <Link to="" onClick={this.save}>Save</Link>
        <Link to="" onClick={this.preview}>Preview</Link>
      </div>
      <textarea
        ref="input"
        value={this.state.value}
        onChange={this.onChange}
      />
    </div>
  }
}
