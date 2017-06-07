import React, { Component } from 'react'

import logo from '../../images/logo.svg'


export default class InvoicePreviewHeader extends Component {
  render () {
    return (
      <header className='header'>
        <div className='grid grid--middle'>
          <div className='grid__col--3'><img src={logo} style={{width: '46px'}}/></div>
          <div className='grid__col--3'><strong>{contactInformation.name}</strong></div>
          <div className='grid__col--6 text-right'><strong>{contactInformation.adress}</strong></div>
        </div>
      </header>
    )
  }
}
