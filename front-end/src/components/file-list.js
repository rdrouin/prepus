import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FilesLeft from './file-left'
import FilesRight from './file-right'
import ControlPanel from './control-panel'

export default class FileList extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <h4>Étudiants potentiellement en situation de plagiat</h4>
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