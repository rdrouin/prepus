import React from 'react'
import { Component } from 'react'

export default class Depot extends Component {
  constructor (props) {
    super(props)
    this.setActiveDepot = this.setActiveDepot.bind(this)
  }

  setActiveDepot () {
    this.props.setActiveDepot(this.props.depot.id)
  }

  render () {
    return (
      <div>
        <li onClick={this.setActiveDepot}> Depot {this.props.depot.id}</li>
      </div>
    )
  }
}
