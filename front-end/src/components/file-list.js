import React from 'react'
import { connect } from 'react-redux'

import FilesLeft from './file-left'
import FilesRight from './file-right'
import ControlPanel from './control-panel'
import FileExpanded from './file-expanded'

class FileList extends React.Component {
  render () {
    return (
      <div>
        <h3>Fichiers</h3>
        {this.props.activeFileLeft === -1
        ? <FilesLeft />
        : this.props.files.filter(file => file.id === this.props.activeFileLeft)
        .map(file => <FileExpanded file={file} key={file.id} side='left' />)
      }
      {this.props.activeFileRight === -1
      ? <FilesRight />
      : this.props.files.filter(file => file.id === this.props.activeFileRight)
        .map(file => <FileExpanded file={file} key={file.id} side='right' />)
    }
        <ControlPanel />
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
    activeFileRight: state.applicationReducer.activeFileRight
  }
}
export default connect(mapStateToProps)(FileList)
