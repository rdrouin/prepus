import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SettingsActions } from '../redux/modules/settings'
import { ApplicationActions } from '../redux/modules/application'

class Settings extends Component {
  constructor (props) {
    super(props)
    this.showSimilaritiesOnly = this.showSimilaritiesOnly.bind(this)
    this.showSettings = this.showSettings.bind(this)
  }
  showSimilaritiesOnly () {
    this.props.showSimilaritiesOnly()
  }
  showSettings () {
    this.props.showSettings()
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
      <div>
        <div className="row">
          <h4>Settings</h4>
          <button onClick={this.props.showSettings} style={{ float: 'right' }}>X</button>
          <div className="col-lg-6" style={styles.borders}>
            <ul className="list-unstyled" style={styles.alignment}>
              <input type="checkbox" name="vehicle" value="Car"
                onClick={this.showSimilaritiesOnly}
                defaultChecked={this.props.similarities ? 'checked' : ''} />
              <span>Show Similarities Only</span>
            </ul>
          </div>
        </div>
      </div>

    )
  }
}
function mapStateTopProps (state) {
  return {
    similarities: state.settingsReducer.similarities,
    showSettings: state.applicationReducer.showSettings
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    showSimilaritiesOnly: SettingsActions.showSimilaritiesOnly,
    showSettings: ApplicationActions.showSettings
  }, dispatch)
}
export default connect(mapStateTopProps, mapDispatchToProps)(Settings)
