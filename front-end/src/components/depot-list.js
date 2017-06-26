import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { DepotActions } from '../redux/modules/depot'
import Depot from './depots'

class Depots extends Component {

  constructor (props) {
    super(props)
    this.loadDepotList = this.loadDepotList.bind(this)
    this.props.loadDepotList()
  }

  loadDepotList () {
    this.props.loadDepotList()
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
    if (this.props.depotsList !== undefined) {
    }

    return (
      <div className="col-lg-5" style={styles.borders}>
        <ul className="list-unstyled" style={styles.alignment}>
          {this.props.depotsList.map(depot => <Depot depot={depot} />)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    depotsList: state.depotReducer.depotsList,
    activeDepot: state.depotReducer.activeDepot
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loadDepotList: DepotActions.loadDepotList,
    setActiveDepot: DepotActions.setActiveDepot
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Depots)
