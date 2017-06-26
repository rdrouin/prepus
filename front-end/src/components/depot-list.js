import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { DepotActions } from '../redux/modules/depot'
import Depot from './depots'

class Depots extends Component {

  constructor(props) {
    super(props)
        this.loadDepotList = this.loadDepotList.bind(this)

    }
    loadDepotList() {
        this.props.loadDepotList()
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
      <div className="col-lg-5" style={styles.borders}>
        <ul className="list-unstyled" style={styles.alignment}> 
             <button onClick={this.loadDepotList}>Load</button>        
            {this.props.depots.map(depot => <Depot />)}
        </ul>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    depots: state.fileReducer.depots,
    activeDepot: state.fileReducer.activeDepot
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadDepotList: DepotActions.loadDepotList
    }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Depots)