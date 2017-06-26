import React from 'react'
import { Component } from 'react'

export default class FileExpanded extends Component {

  render () {
    return (
      <div>
        <p>#{this.props.file.id}</p>
        <p>{this.props.file.cip}</p>
        <p>{this.props.file.name}</p>
        <p>{this.props.file.size}</p>
      </div>
    )
  }
}
