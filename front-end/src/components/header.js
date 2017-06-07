import React, { Component } from 'react'

import logo from '../../images/logo.svg'


export default class InvoicePreviewHeader extends Component {
    render() {
        let style = {
            backgroundColor: 'blue',
            marginTop: 0,
            h1: {
                verticalAlign: 'middle',
                lineHeight: 3,
                marginBottom: 0,
            },
            cog:{
                fontSize: '2em',
                lineHeight: 3
            }
        }
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header navbar-left">
                        <h1 style={style.h1}>Anti-Plagiat</h1>
                    </div>
                    <a href=""><span className="glyphicon glyphicon-cog navbar-right" aria-hidden="true" style={style.cog}></span></a>
                </div>
            </nav>
        )
    }
}
