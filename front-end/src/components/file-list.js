import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import File from './file'
import FileExpanded from './file-expanded'
import FilesLeft from './file-left'
import FilesRight from './file-right'
import { FileActions } from '../redux/modules/file'
import Header from '../components/header'

class FileList extends Component {

    static propTypes = {
        files: PropTypes.array
    }

   constructor(props) {
        super(props)
        let id = ''
        this.id = 1
        this.onAppend = this.onAppend.bind(this)
        this.loadDepot = this.loadDepot.bind(this)
        this.showSimilaritiesOnly = this.showSimilaritiesOnly.bind(this)
        this.analyseDepot = this.analyseDepot.bind(this)
    }

    loadDepot() {
        this.props.loadDepot()
    }

    showSimilaritiesOnly() {
        this.props.showSimilaritiesOnly()
    }

    analyseDepot() {
        this.props.analyseDepot()
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
            return (
               
                <div>
                    <Header />
                    <div className="row">
                        <h4>Étudiants potentiellement en situation de plagiat</h4>
                    </div>
                    <div className="row">
                        <div className="col-lg-5" style={styles.borders}>
                            {this.props.activeFileLeft != -1 ? <button onClick={this.props.removeActiveFiles} style={{ float: 'right' }}>X</button> : ''}

                            <ul className="list-unstyled" style={styles.alignment}>
                                <FilesLeft />
                            </ul>
                        </div>
                        <FilesRight />
                    </div>
                    {this.props.activeFileLeft == -1 ? <button onClick={this.loadDepot}>Load</button> : ''}
                    <br />
                    <input type="checkbox" name="vehicle" value="Car" onClick={this.showSimilaritiesOnly} />Show Similarities Only
                    <br/>
                    <button onClick={this.analyseDepot}>Analyse</button>

                </div>
            )
        }
    }

function mapStateTopProps(state) {
    return {
        files: state.fileReducer.files,
        activeFileLeft: state.fileReducer.activeFileLeft,
        activeFileRight: state.fileReducer.activeFileRight,
        similarities: state.fileReducer.similarities
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        append: FileActions.append,
        setActiveFileLeft: FileActions.setActiveFileLeft,
        setActiveFileRight: FileActions.setActiveFileRight,
        removeActiveFileLeft: FileActions.removeActiveFileLeft,
        removeActiveFileRight: FileActions.removeActiveFileRight,
        removeActiveFiles: FileActions.removeActiveFiles,
        loadDepot: FileActions.loadDepot,
        showSimilaritiesOnly: FileActions.showSimilaritiesOnly,
        analyseDepot: FileActions.analyseDepot
    }, dispatch)
}

export default connect(mapStateTopProps, mapDispatchToProps)(FileList)