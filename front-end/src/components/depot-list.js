import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { FileActions } from '../redux/modules/file'
import { ApplicationActions } from '../redux/modules/application'

import Depot from './depot'
import FileList from './file-list'

class DepotList extends Component {

  constructor (props) {
    super(props)
    this.props.loadDepotsList()
  }

  render () {
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
      this.props.activeDepot === -1
      ? <div className="col-lg-5" style={styles.borders}>
        <ul className="list-unstyled" style={styles.alignment}>
          {this.props.depots.map(depot => <Depot
            depot={depot}
            setActiveDepot={this.props.setActiveDepot}
            key={depot.id}
          />)}
        </ul>
      </div>
      : <FileList />
    )
  }
}

function mapStateToProps (state) {
  return {
    depots: state.fileReducer.depots,
    activeDepot: state.applicationReducer.activeDepot
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loadDepotsList: FileActions.loadDepotsList,
    setActiveDepot: ApplicationActions.setActiveDepot
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(DepotList)
