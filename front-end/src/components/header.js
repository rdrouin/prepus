import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ApplicationActions } from '../redux/modules/application'

class Header extends Component {
  constructor (props) {
    super(props)
    this.showSettings = this.props.showSettings.bind(this)
  }
  render () {
    let style = {
      backgroundColor: 'blue',
      marginTop: 0,
      h1: {
        verticalAlign: 'middle',
        lineHeight: 3,
        marginBottom: 0
      },
      cog: {
        fontSize: '2em',
        lineHeight: 3
      }
    }
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header navbar-left">
              <h1 style={style.h1}>Anti-Plagiat</h1>
            </div>
            <a onClick={this.props.showSettings}>
              <span className="glyphicon glyphicon-cog navbar-right" aria-hidden="true" style={style.cog}></span>
            </a>
          </div>
        </nav>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    showSettings: state.applicationReducer.showSettings
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setActiveFileRight: ApplicationActions.setActiveFileRight,
    removeActiveFileRight: ApplicationActions.removeActiveFileRight,
    removeActiveFiles: ApplicationActions.removeActiveFiles,
    showSettings: ApplicationActions.showSettings
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
