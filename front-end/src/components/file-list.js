import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FilesLeft from './file-left'
import FilesRight from './file-right'
import ControlPanel from './control-panel'
import Header from '../components/header'


export default class FileList extends React.Component {

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
                <div>

                    <div>
                        <Header />
                        <div className="row">
                            <h4>Étudiants potentiellement en situation de plagiat</h4>
                        </div>
                        <div className="row">
                            <div className="col-lg-5" style={styles.borders}>
                                <ul className="list-unstyled" style={styles.alignment}>
                                    <FilesLeft />
                                </ul>
                            </div>
                            <FilesRight />
                        </div>
                    </div>
                    <ControlPanel />
                </div>
            </div>
        )
    }
}

//                            {this.props.activeFileLeft != -1 ? <button onClick={this.props.removeActiveFiles} style={{ float: 'right' }}>X</button> : ''}
  /*   
*/