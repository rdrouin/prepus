
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
      <tr>
        <td onClick={this.setActiveFile}>{this.props.file.name}</td>
        <td>{this.props.file.cip}</td>
        <td>{this.props.file.size}</td>
      </tr>
    )
  }
}
