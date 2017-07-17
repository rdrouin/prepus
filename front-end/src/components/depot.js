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
        <td>{this.props.depot.count}</td>
        <td>{this.props.depot.date}</td>
        <td>{this.props.analyze
          ? 'Yes' : 'No'}</td>
      </tr>
    )
  }
}
