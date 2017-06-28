
import React from 'react'
import { Component } from 'react'

export default class File extends Component {
  constructor (props) {
    super(props)
    this.setActiveFile = this.setActiveFile.bind(this)
  }

  setActiveFile () {
    this.props.setActiveFile(this.props.file.id)
  }

  render () {
    return (
      <div>
        <li onClick={this.setActiveFile}>{this.props.file.name} - {this.props.file.cip} - {this.props.file.size}</li>
      </div>
    )
  }
}
