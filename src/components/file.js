import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

export default class File extends Component {

  constructor(props) {
    super(props)
    this.setActiveFileLeft = this.setActiveFileLeft.bind(this)
  }

  setActiveFileLeft(){
    this.props.setActiveFileLeft(this.props.file.id);
  }
  
  render() {
    return (
      <div>
        <li onClick={this.setActiveFileLeft}>#{this.props.file.id} - {this.props.file.name} - {this.props.file.cip} - {this.props.file.size}</li>
      </div>
    )
  }
}
