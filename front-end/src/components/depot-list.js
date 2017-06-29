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
    return (
      this.props.activeDepot === -1
        ? <div className="row">
          <div className="col-lg-10 ">
            <h3>Dépots</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nom</th>
                  <th>Nombre de fichiers</th>
                  <th>Date de fermeture</th>
                </tr>
              </thead>
              <tbody>
                {this.props.depots.map(depot => <Depot
                  depot={depot}
                  setActiveDepot={this.props.setActiveDepot}
                  key={depot.id}
                />)}
              </tbody>
            </table>
          </div>
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
