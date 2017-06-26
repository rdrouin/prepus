import React, { Component } from 'react'

import Depots from '../../components/depot-list'
// import Files from '../../components/file-list'

import Header from '../../components/header'

export default class HomeView extends Component {
  render () {
    return (
      <div className='container'>
        <Header />
        <Depots />
      </div>
    )
  }
}
