import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FileActions } from '../redux/modules/file'
import { ApplicationActions } from '../redux/modules/application'

class ControlPanel extends Component {

  constructor (props) {
    super(props)
    this.loadDepotIfNeeded = this.loadDepotIfNeeded.bind(this)
    this.analyseDepot = this.analyseDepot.bind(this)
  }

  loadDepotIfNeeded () {
    this.props.loadDepotIfNeeded()
  }

  analyseDepot () {
    this.props.analyseDepot(this.props.metadata, this.props.similarity, this.props.research)
  }

  removeActiveDepot () {
    this.props.removeActiveDepot()
  }

  render () {
    return (
      <div>
        <button onClick={this.analyseDepot} className="btn btn-default">Analyser</button>
        <br />
        <button className="btn btn-default" onClick={this.props.removeActiveDepot}>Retour dépots</button>
        <br />
        {this.props.activeFileLeft === -1
          ? <button onClick={this.loadDepotIfNeeded} className="btn btn-default">Rafraichir la Liste</button>
          : ''}
      </div>
    )
  }
}

function mapStateTopProps (state) {
  return {
    activeFileLeft: state.applicationReducer.activeFileLeft,
    similarities: state.settingsReducer.similarities,
    similarity: state.settingsReducer.similarity,
    research: state.settingsReducer.research,
    metadata: state.settingsReducer.metadata
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loadDepotIfNeeded: FileActions.loadDepotIfNeeded,
    analyseDepot: FileActions.analyseDepot,
    removeActiveDepot: ApplicationActions.removeActiveDepot
  }, dispatch)
}
export default connect(mapStateTopProps, mapDispatchToProps)(ControlPanel)
