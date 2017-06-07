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
        this.id = 1
        this.onAppend = this.onAppend.bind(this)
    }

    onAppend() {
        this.props.append(this.id, "TEST1234", "Theodore Roosevelt", '26 KB', this.id == 3 ? [1, 2] : [])
        this.id++
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

        // Left file
        let leftList = ''
        if (this.props.activeFileLeft == -1) {
            leftList = this.props.files.map(file =>
                <File
                    file={file}
                    key={file.id}
                    setActiveFile={this.props.setActiveFileLeft}
                />
            )
        }
        else {
            leftList = this.props.files.filter(file => file.id == this.props.activeFileLeft).map((file) =>
                <FileExpanded
                    file={file}
                    key={file.id}
                />
            )
        }

        // Right File 
        let rightList = ''
        /*
<div className="col-lg-5 col-lg-offset-1" style={styles.borders}>         
                        <button onClick={this.props.removeActiveFileRight} style={{ float: 'right' }}>X</button>
                        <ul className="list-unstyled" style={styles.alignment}>
                            {rightList}                   
                      </ul>
                      </div>
                     
    
                      : <div className="col-lg-5 col-lg-offset-1" style={styles.borders}> Aucun plagiat détecté </div> : ''} 
                                       
                </div>
*/
        let leftFilePlagiarism = []

        if (this.props.activeFileLeft == -1) {
            rightList = ''
        } else if (this.props.activeFileLeft != -1 && this.props.activeFileRight == -1) {
            leftFilePlagiarism = this.props.files.filter(file => file.id == this.props.activeFileLeft)[0].plagiarism;
            if (leftFilePlagiarism.length == 0) {
                console.log("Aucun plagiat")
                rightList = <div className="col-lg-5 col-lg-offset-1" style={styles.borders}> Aucun plagiat détecté </div>
            } else {
                rightList = <div className="col-lg-5 col-lg-offset-1" style={styles.borders}><ul className="list-unstyled" style={styles.alignment}> {this.props.files.filter(file => leftFilePlagiarism.indexOf(file.id) >= 0).map(file => <File file={file} key={file.id} setActiveFile={this.props.setActiveFileRight} />)}</ul></div>
            }
        }else if(this.props.activeFileRight != -1){
            rightList = <div className="col-lg-5 col-lg-offset-1" style={styles.borders}><button onClick={this.props.removeActiveFileRight} style={{ float: 'right' }}>X</button><ul className="list-unstyled" style={styles.alignment}> {this.props.files.filter(file => file.id == this.props.activeFileRight).map((file) => <FileExpanded file={file} key={file.id}/>)}</ul></div>
            
        }
        
        /*
        if (this.props.activeFileLeft != -1 && this.props.activeFileRight == -1) {
            rightList = this.props.files.filter(file => leftFilePlagiarism.indexOf(file.id) >= 0).map(file =>
                <File
                    file={file}
                    key={file.id}
                    setActiveFile={this.props.setActiveFileRight}
                />

            )
        }
        else if (this.props.activeFileLeft != -1 && this.props.activeFileRight != -1) {
            rightList = this.props.files.filter(file => file.id == this.props.activeFileRight).map((file) =>
                <FileExpanded
                    file={file}
                    key={file.id}
                />
            )

        }*/

            // 
            let noPlagiarism = ''
        if (leftFilePlagiarism > 0 && this.props.activeFileRight != -1) {

        }



        return (
            <div>
                <div className="row">
                    <h4>Étudiants potentiellement en situation de plagiat</h4>
                </div>
                <div className="row">
                    <div className="col-lg-5" style={styles.borders}>
                        {this.props.activeFileLeft != -1 ? <button onClick={this.props.removeActiveFiles} style={{ float: 'right' }}>X</button> : ''}

                        <ul className="list-unstyled" style={styles.alignment}>
                            {leftList}
                        </ul>
                    </div>
                    {rightList}
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
        setActiveFileRight: FileActions.setActiveFileRight,
        removeActiveFileLeft: FileActions.removeActiveFileLeft,
        removeActiveFileRight: FileActions.removeActiveFileRight,
        removeActiveFiles: FileActions.removeActiveFiles
    }, dispatch)
}

export default connect(mapStateTopProps, mapDispatchToProps)(FileList)
