import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { FileActions } from '../redux/modules/file'
import FileExpanded from './file-expanded'
import File from './file'

class FilesLeft extends Component {
    /* constructor(props) {
          super(props)
          let id = ''
          this.id = 1
      }
  */
    render() {
        if (this.props.files == undefined) return <div></div>
        var styles = {
            alignment: {
                textAlign: 'left'
            },
            borders: {
                border: 1,
                borderStyle: 'solid',
                borderColor: 'gray',
                borderRadius: 5,
                marginTop: 20
            }
        }
        let leftList = ''
        if (this.props.activeFileLeft == -1) {
            if (this.props.similarities == true) {
                leftList = this.props.files.filter(file => file.similarities.length > 0)
                leftList = leftList.map(file => <File file={file} key={file.id} setActiveFile={this.props.setActiveFileLeft} />)
            }
            else {
              leftList = this.props.files.map(file => <File file={file} key={file.id} setActiveFile={this.props.setActiveFileLeft} />)
            }
        }
        else if (this.props.activeFileLeft > 0) {
            leftList = this.props.files.filter(file => file.id == this.props.activeFileLeft).map((file) => <FileExpanded file={file} key={file.id} />)
        }
        return (
            <div className="col-lg-5" style={styles.borders}>
                {this.props.activeFileLeft != -1 ? <button onClick={this.props.removeActiveFiles} style={{ float: 'right' }}>X</button> : ''}
                <ul className="list-unstyled" style={styles.alignment}>
                    {leftList}
                </ul>
            </div>)
    }
}

function mapStateToProps(state) {
    var currentDepot = state.fileReducer.depots.filter(depot => depot.id == state.fileReducer.activeDepot)[0]
    var currentFiles = undefined
    if(currentDepot != undefined){
        currentFiles = currentDepot.files
    }
    return {
        files: currentFiles,
        activeFileLeft: state.fileReducer.activeFileLeft,
        similarities: state.fileReducer.similarities
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setActiveFileLeft: FileActions.setActiveFileLeft,
        removeActiveFileLeft: FileActions.removeActiveFileLeft,
        removeActiveFiles: FileActions.removeActiveFiles,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesLeft)
