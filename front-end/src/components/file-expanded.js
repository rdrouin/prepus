import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

class FileExpanded extends Component {

  render () {
   let similaritiesLeft =this.props.file.id === this.props.activeFileLeft && this.props.activeFileRight !== -1 ? this.props.file.similarities.filter(file => file.id === this.props.activeFileRight):''
   let similaritiesRight = this.props.file.id === this.props.activeFileRight ? this.props.file.similarities.filter(file => file.id === this.props.activeFileLeft):''
    return (
      <div>
        <p>#{this.props.file.id}</p>
        <p>{this.props.file.cip}</p>
        <p>{this.props.file.name}</p>
        <p>{this.props.file.size}</p>
        <p> {this.props.file.id === this.props.activeFileLeft && this.props.activeFileRight !== -1 ? similaritiesLeft.map(sim => <p>{sim.text}</p>):''}</p>
        <p>   {this.props.file.id === this.props.activeFileRight ? similaritiesRight.map(sim => <p>{sim.text}</p>) :''} </p>
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
export default connect(mapStateToProps)(FileExpanded)
