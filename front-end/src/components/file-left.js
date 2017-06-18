import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { FileActions } from '../redux/modules/file'
import FileExpanded from './file-expanded'
import File from './file'

class FilesLeft extends Component {

    render() {
        let leftList = ''
        if (this.props.activeFileLeft == -1) {
            if (this.props.similarities == true) {
                leftList = this.props.files.filter(file => file.similarities.length > 0)
                return (<div>{leftList.map(file => <File file={file} key={file.id} setActiveFile={this.props.setActiveFileLeft} />)} </div>)
            }
            else {
                return (<div>{this.props.files.map(file => <File file={file} key={file.id} setActiveFile={this.props.setActiveFileLeft} />)} </div>)
            }
        }
        else if (this.props.activeFileLeft > 0) {
            return (<div>{this.props.files.filter(file => file.id == this.props.activeFileLeft).map((file) => <FileExpanded file={file} key={file.id} />)}</div>)
        }
    }

}

function mapStateTopProps(state) {
    return {
        files: state.fileReducer.files,
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

export default connect(mapStateTopProps, mapDispatchToProps)(FilesLeft)
