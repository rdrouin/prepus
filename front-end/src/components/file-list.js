import React from 'react'

import FilesLeft from './file-left'
import FilesRight from './file-right'
import ControlPanel from './control-panel'

export default class FileList extends React.Component {
  render () {
    return (
      <div>
        <div className="row">
          <h3>Fichiers</h3>
        </div>
        <div className="row">
          <FilesLeft />
          <FilesRight />
        </div>
        <ControlPanel />
      </div>
    )
  }
}

