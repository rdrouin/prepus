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
      <tr>
        <td onClick={this.setActiveDepot}><a href="#">{this.props.depot.id}</a></td>
        <td onClick={this.setActiveDepot}><a href="#">{this.props.depot.name}</a></td>
        <td>6</td>
        <td>02/08/2016</td>
      </tr>

    )
  }
}
