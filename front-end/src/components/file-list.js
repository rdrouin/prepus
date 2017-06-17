import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

<<<<<<< HEAD
import FilesLeft from './file-left'
import FilesRight from './file-right'
import ControlPanel from './control-panel'
=======
import File from './file'
import FileExpanded from './file-expanded'
import FileLeft from './file-left'
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
>>>>>>> fix

export default class FileList extends React.Component {
    render() {
<<<<<<< HEAD
        return (
            <div>
                <div className="row">
                    <h4>Étudiants potentiellement en situation de plagiat</h4>
=======
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

     /*  let leftList = ''
        if (this.props.activeFileLeft == -1) {
            if (this.props.similarities == true) {
                leftList = this.props.files.filter(file => file.similarities.length > 0)
                leftList = leftList.map(file =>
                    <File
                        file={file}
                        key={file.id}
                        setActiveFile={this.props.setActiveFileLeft}
                    />
                )
            }
            else {
                leftList = this.props.files.map(file =>
                    <File
                        file={file}
                        key={file.id}
                        setActiveFile={this.props.setActiveFileLeft}
                    />
                )
            }
        }
        else if (this.props.activeFileLeft  > 0) {
            leftList = this.props.files.filter(file => file.id == this.props.activeFileLeft).map((file) =>
                <FileExpanded
                    file={file}
                    key={file.id}
                />
            )
        }*/

        // Right File 
        let rightList = ''

        let leftFileSimilarities = []

        if (this.props.activeFileLeft == -1) {
            rightList = ''
        } else if (this.props.activeFileLeft != -1 && this.props.activeFileRight == -1) {
            leftFileSimilarities = this.props.files.filter(file => file.id == this.props.activeFileLeft)[0].similarities;

            let rightFilesIds = leftFileSimilarities.map(file => file.id);
            rightFilesIds = rightFilesIds.filter((file, pos) => (rightFilesIds.indexOf(file) == pos));

            if (leftFileSimilarities.length == 0) {
                rightList = <div className="col-lg-5 col-lg-offset-1" style={styles.borders}> Aucun plagiat détecté </div>
            } else {
                var leftFile = this.props.files.filter(file => file.id == this.props.activeFileLeft)
                rightList = <div className="col-lg-5 col-lg-offset-1" style={styles.borders}><ul className="list-unstyled" style={styles.alignment}> {this.props.files.filter(file => rightFilesIds == file.id).map(file => <File file={file} key={file.id} setActiveFile={this.props.setActiveFileRight} />)}</ul></div>
            }

        } else if (this.props.activeFileRight != -1) {
            rightList = <div className="col-lg-5 col-lg-offset-1" style={styles.borders}><button onClick={this.props.removeActiveFileRight} style={{ float: 'right' }}>X</button><ul className="list-unstyled" style={styles.alignment}> {this.props.files.filter(file => file.id == this.props.activeFileRight).map((file) => <FileExpanded file={file} key={file.id} />)}</ul></div>
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
                                <FileLeft />
                            </ul>
                        </div>
                        {rightList}
                    </div>
                    {this.props.activeFileLeft == -1 ? <button onClick={this.loadDepot}>Load</button> : ''}
                    <br />
                    <input type="checkbox" name="vehicle" value="Car" onClick={this.showSimilaritiesOnly} />Show Similarities Only
                    <br/>

                    <button onClick={this.analyseDepot}>Analyse</button>

>>>>>>> fix
                </div>
                <div className="row">
                    <FilesLeft />
                    <FilesRight />
                </div>
                <ControlPanel />
            </div>
        )
    }
<<<<<<< HEAD
}
=======
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
>>>>>>> fix
