import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import File from './file'
import FileExpanded from './file-expanded'
import { FileActions } from '../redux/modules/file'


class FileList extends Component {

    static propTypes = {
        files: PropTypes.array
    }

    constructor(props) {
        super(props)
        let id = ''
        this.id = 0 
        this.onAppend = this.onAppend.bind(this)
    }

    onAppend() {
        this.props.append(this.id++ , "TEST1234", "Theodore Roosevelt", '26 KB', this.id == 3 ? [1,2] : [])
    }


    render() {
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
            leftList = this.props.files.map((file) =>
                <File
                    file={file}
                    key={file.id}
                    setActiveFileLeft={this.props.setActiveFileLeft}
                />
            )
        }
        else {
            leftList = this.props.files.filter(file => file.id == this.props.activeFileLeft).map((file) =>
                <FileExpanded
                    file={file}
                    key={file.id}
                    setActiveFileLeft={this.props.setActiveFileLeft}
                />
            )
        }
        
        return (
            <div>
                <div className="row">
                    <h4>Étudiants potentiellement en situation de plagiat</h4>
                </div>
                <div className="row">
                    <div className="col-lg-5" style={styles.borders}>
                        {this.props.activeFileLeft != -1 ? <button onClick={this.props.removeActiveFile} style={{ float: 'right' }}>X</button> : ''}

                        <ul className="list-unstyled" style={styles.alignment}>
                            {leftList}
                        </ul>
                    </div>
                    {this.props.activeFileLeft != -1 ? <div className="col-lg-5 col-lg-offset-1" style={styles.borders}>FILES RIGHT </div> : ''}
                </div>
                {this.props.activeFileLeft == -1 ? <button onClick={this.onAppend}>Add</button> : ''}
            </div>
        )
    }
}

function mapStateTopProps(state) {
    return {
        files: state.fileReducer.files,
        activeFileLeft: state.fileReducer.activeFileLeft,
        activeFileRight: state.fileReducer.activeFileRight
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        append: FileActions.append,
        setActiveFileLeft: FileActions.setActiveFileLeft,
        removeActiveFile: FileActions.removeActiveFileLeft
    }, dispatch)
}

export default connect(mapStateTopProps, mapDispatchToProps)(FileList)
