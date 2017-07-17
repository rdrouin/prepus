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
    this.showMetadata = this.showMetadata.bind(this)
    this.similaritiesPercentage = this.similaritiesPercentage.bind(this)
    this.researchPercentage = this.researchPercentage.bind(this)
  }

  showSimilaritiesOnly () {
    this.props.showSimilaritiesOnly()
  }

  showSettings () {
    this.props.showSettings()
  }

  showMetadata () {
    this.props.showMetadata()
  }

  similaritiesPercentage () {
    var input = document.getElementById('SimilarityPercentage')
    this.props.similaritiesPercentage(input.value)
  }

  researchPercentage () {
    var input = document.getElementById('ResearchPercentage')
    this.props.researchPercentage(input.value)
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
              <li>
                <input type="checkbox" name="showSimilaritiesOnly"
                  onClick={this.showSimilaritiesOnly}
                  defaultChecked={this.props.similarities ? 'checked' : ''} />
                <span>Show Similarities Only</span>
              </li>
              <li>
                <input type="checkbox" name="ShowMetadata" onClick={this.showMetadata}
                  defaultChecked={this.props.metadata ? 'checked' : ''} />
                <span>Show Metadata</span>
              </li>
              <li>
                Similarity Percentage:
                <input type="number" id="SimilarityPercentage" min="0" max="100"
                  value={this.props.similarity}
                  onChange={this.similaritiesPercentage}
                />
              </li>
              <li>
                Research Percentage:
                <input type="number" id="ResearchPercentage" min="1" max="100"
                  value={this.props.research}
                  onChange={this.researchPercentage}
                />
              </li>
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
    similarity: state.settingsReducer.similarity,
    research: state.settingsReducer.research,
    metadata: state.settingsReducer.metadata,
    showSettings: state.applicationReducer.showSettings
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    showSimilaritiesOnly: SettingsActions.showSimilaritiesOnly,
    showMetadata: SettingsActions.showMetadata,
    similaritiesPercentage: SettingsActions.similaritiesPercentage,
    researchPercentage: SettingsActions.researchPercentage,
    showSettings: ApplicationActions.showSettings
  }, dispatch)
}
export default connect(mapStateTopProps, mapDispatchToProps)(Settings)
