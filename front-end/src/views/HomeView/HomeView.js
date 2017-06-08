import React, { Component } from 'react'


import FileList from '../../components/file-list'

export default class HomeView extends Component {
  render () {
    return (
      <div className='container'>
        <FileList/>
      </div>
    )
  }
}
