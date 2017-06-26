import React from 'react'
import { Component } from 'react'

export default class File extends Component {

  render () {
    return (
      <div>
        <li> Depot {this.props.depot}</li>
      </div>
    )
  }
}
