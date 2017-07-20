import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ApplicationActions } from '../redux/modules/application'
import File from './file'

class FilesRight extends Component {

  render () {
    let leftFileSimilarities = []
    let rightList = ''
    let noPlagiarism = false
    if (this.props.activeFileLeft !== -1 && this.props.activeFileRight === -1) {
      leftFileSimilarities = this.props.files.filter(file => file.id === this.props.activeFileLeft)[0].similarities

      // filter removes duplicates
      let rightFilesIds = leftFileSimilarities.map(file => file.id)
      rightFilesIds = rightFilesIds.filter((file, pos) => (rightFilesIds.indexOf(file) === pos))
      if (leftFileSimilarities.length === 0) {
        noPlagiarism = true
      } else {
        rightList = this.props.files
          .filter(file => rightFilesIds.some(id => id === file.id))
          .map(file => <File file={file} key={file.id} setActiveFile={this.props.setActiveFileRight} />)
      }
    }
    return (
      <div className="row">
      {
      noPlagiarism || this.props.activeFileRight !== -1
      ? <div className="col-lg-6">
          Aucun Plagiat détecté
      </div>
      : this.props.activeFileLeft !== -1
      ? <div className="col-lg-6">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Fichiers</th>
              <th>Cips</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{rightList}</tbody>
        </table>
      </div>
      : ''
      }
      </div>
    )
  }
}
function mapStateToProps (state) {
  var currentDepot = state.fileReducer.depots.filter(depot => depot.id === state.applicationReducer.activeDepot)[0]
  var currentFiles

  if (currentDepot !== undefined) {
    currentFiles = currentDepot.files
  }

  return {
    files: currentFiles,
    activeFileLeft: state.applicationReducer.activeFileLeft,
    activeFileRight: state.applicationReducer.activeFileRight,
    similarities: state.settingsReducer.similarities
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setActiveFileRight: ApplicationActions.setActiveFileRight,
    removeActiveFileRight: ApplicationActions.removeActiveFileRight,
    removeActiveFiles: ApplicationActions.removeActiveFiles
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesRight)
