import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ApplicationActions } from '../redux/modules/application'

class FileExpanded extends Component {

  render () {
    let similaritiesLeft = this.props.file.id === this.props.activeFileLeft && this.props.activeFileRight !== -1
      ? this.props.file.similarities.filter(file => file.id === this.props.activeFileRight) : ''
    let similaritiesRight = this.props.file.id === this.props.activeFileRight
      ? this.props.file.similarities.filter(file => file.id === this.props.activeFileLeft) : ''
    return (
      <div className="col-lg-6">
      {this.props.side === 'left'
        ? <a href="#" onClick={this.props.removeActiveFiles}>
          <span className="glyphicon glyphicon-remove-circle" style={{'float':'right'}} aria-hidden="true"></span>
        </a>
        : <a href="#" onClick={this.props.removeActiveFileRight}>
          <span className="glyphicon glyphicon-remove-circle" style={{'float':'right'}} aria-hidden="true"></span>
        </a>
    }
        <p>#{this.props.file.id}</p>
        <p>{this.props.file.cip}</p>
        <p>{this.props.file.name}</p>
        <p>{this.props.file.size}</p>
        <p>{this.props.file.id === this.props.activeFileLeft && this.props.activeFileRight !== -1
          ? similaritiesLeft.map(sim => <p>{sim.text}</p>) : ''}</p>
        <p>{this.props.file.id === this.props.activeFileRight
          ? similaritiesRight.map(sim => <p>{sim.text}</p>) : ''} </p>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    activeFileLeft: state.applicationReducer.activeFileLeft,
    activeFileRight: state.applicationReducer.activeFileRight
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    removeActiveFiles: ApplicationActions.removeActiveFiles,
    removeActiveFileRight: ApplicationActions.removeActiveFileRight
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FileExpanded)
