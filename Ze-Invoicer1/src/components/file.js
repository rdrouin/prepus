import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { FileActions } from '../redux/modules/invoice'

import { file } from '../redux/modules/invoice'

class FileForm extends Component {
  static propTypes = {
    file: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.onAppend = this.onAppend.bind(this)
  }


  onAppend () {
    this.props.append("123","ABC")
  }

  render () {
           var styles = {
            alignment: {
                textAlign: 'left' 
            },
            borders: {
                border:1,
                borderStyle:'solid',
                borderColor:'gray',
                borderRadius:5,
                marginTop: 20

            }
        }
    return (
      <div>
        <div className="row">
            <h4>Étudiants potentiellement en situation de plagiat</h4>      
        </div>
        <div className="row">
            <div className="col-lg-6" style={styles.borders}> 
                <ul className="list-unstyled" style={styles.alignment}>
                    <p>{this.props.files[0].name}</p>
                </ul>
            </div>
        </div>
        <button onClick={this.onAppend}>Test</button>
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    files: state.fileReducer.files
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    append: FileActions.append }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FileForm)