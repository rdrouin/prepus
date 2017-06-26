import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

export default class File extends Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <li> Depot {this.props.depot}</li>
      </div>
    )
  }
}
