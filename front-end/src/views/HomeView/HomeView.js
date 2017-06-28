import React, { Component } from 'react'
import { connect } from 'react-redux'

import Depots from '../../components/depot-list'
import Settings from '../../components/settings'
import Header from '../../components/header'

class HomeView extends Component {
  render () {
    let content = ''
    if (this.props.showSettings) {
      content = <Settings />
    } else {
      content = <Depots />
    }
    return (
      <div className='container'>
        <Header />
        {content}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    showSettings: state.applicationReducer.showSettings
  }
}
export default connect(mapStateToProps)(HomeView)
