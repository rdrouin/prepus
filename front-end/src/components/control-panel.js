import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import File from './file'
import FileExpanded from './file-expanded'
import FilesList from './file-list'
import { FileActions } from '../redux/modules/file'

class ControlPanel extends Component {

    constructor(props) {
        super(props)
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
    render() {

        return (
            <div>
            {console.log(FileActions)}
                {this.props.activeFileLeft == -1 ? <button onClick={this.loadDepot}>Load</button> : ''}
                <br />
                <input type="checkbox" name="vehicle" value="Car" onClick={this.showSimilaritiesOnly} />Show Similarities Only
                    <br />
                <button onClick={this.analyseDepot}>Analyse</button>

            </div>

        )
    }
}

function mapStateTopProps(state) {
    return {
        activeFileLeft: state.fileReducer.activeFileLeft,
        similarities: state.fileReducer.similarities

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadDepot: FileActions.loadDepot,
        showSimilaritiesOnly: FileActions.showSimilaritiesOnly,
        analyseDepot: FileActions.analyseDepot

    }, dispatch)
}
export default connect(mapStateTopProps, mapDispatchToProps)(ControlPanel)
