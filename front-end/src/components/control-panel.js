import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { FileActions } from '../redux/modules/file'

class ControlPanel extends Component {

  constructor (props) {
    super(props)
    this.loadDepotIfNeeded = this.loadDepotIfNeeded.bind(this)
    this.showSimilaritiesOnly = this.showSimilaritiesOnly.bind(this)
    this.analyseDepot = this.analyseDepot.bind(this)
  }

  loadDepotIfNeeded () {
    this.props.loadDepotIfNeeded(1)
  }

  showSimilaritiesOnly () {
    this.props.showSimilaritiesOnly()
  }

  analyseDepot () {
    this.props.analyseDepot()
  }

  render () {
    return (
      <div>
        {this.props.activeFileLeft === -1 ? <button onClick={this.loadDepotIfNeeded}>Load</button> : ''}
        <br />
        <input type="checkbox" name="vehicle" value="Car" onClick={this.showSimilaritiesOnly} />Show Similarities Only
        <br />
        <button onClick={this.analyseDepot}>Analyse</button>
      </div>
      )
  }
}

function mapStateTopProps (state) {
  return {
    activeFileLeft: state.fileReducer.activeFileLeft,
    similarities: state.fileReducer.similarities
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loadDepotIfNeeded: FileActions.loadDepotIfNeeded,
    showSimilaritiesOnly: FileActions.showSimilaritiesOnly,
    analyseDepot: FileActions.analyseDepot
  }, dispatch)
}
export default connect(mapStateTopProps, mapDispatchToProps)(ControlPanel)
