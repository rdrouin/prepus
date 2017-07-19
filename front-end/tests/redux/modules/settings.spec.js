
import settingsReducer, * as Settings from 'redux/modules/settings'

describe('Settings', function () {
  it('Should export a constant SHOW_SIMILARITIES_ONLY.', function () {
    expect(Settings.SHOW_SIMILARITIES_ONLY).to.equal('SHOW_SIMILARITIES_ONLY')
  })

  it('Should export a constant SHOW_METADATA.', function () {
    expect(Settings.SHOW_METADATA).to.equal('SHOW_METADATA')
  })

  it('Should export a constant SIMILARITIES_PERCENTAGE.', function () {
    expect(Settings.SIMILARITIES_PERCENTAGE).to.equal('SIMILARITIES_PERCENTAGE')
  })

  it('Should export a constant RESEARCH_PERCENTAGE.', function () {
    expect(Settings.RESEARCH_PERCENTAGE).to.equal('RESEARCH_PERCENTAGE')
  })

  describe('(Reducer)', function () {
    it('Should be a function', function () {
      expect(settingsReducer).to.be.a('function')
    })

    it('Should initialize with a given state.', function () {
      let state = settingsReducer(undefined, {});

      expect(state.similarities).to.equal(0);
      expect(state.similarity).to.equal(30);
      expect(state.research).to.equal(30);
      expect(state.metadata).to.equal(0);
    })

    it('Should return the previous state if an action was not matched.', function () {
      let state = settingsReducer(undefined, {})
      state = settingsReducer(state, {type: '@@@@@@@'})
      expect(state).to.equal(settingsReducer(undefined, {}))
    })
  })
  describe('showSimilaritiesOnly', function () {
    it('Should be a function', function () {
      expect(Settings.SettingsActions.showSimilaritiesOnly).to.be.a('function')
    })

    it('Should have a type', function () {
      expect(Settings.SettingsActions.showSimilaritiesOnly().type).to.be.a('string')  
    })
  })

  describe('showMetadata', function () {
    it('Should be a function', function () {
      expect(Settings.SettingsActions.showMetadata).to.be.a('function')
    })

    it('Should have a type', function () {
      expect(Settings.SettingsActions.showMetadata().type).to.be.a('string')  
    })
  })

  describe('similaritiesPercentage', function () {
    it('Should be a function', function () {
      expect(Settings.SettingsActions.similaritiesPercentage).to.be.a('function')
    })

    it('Should have a type', function () {
      expect(Settings.SettingsActions.similaritiesPercentage(90).type).to.be.a('string')  
    })

    it('Should have a percentage', function () {
      expect(Settings.SettingsActions.similaritiesPercentage(90).percentage).to.be.a('number')  
    })
  })

  describe('researchPercentage', function () {
    it('Should be a function', function () {
      expect(Settings.SettingsActions.researchPercentage).to.be.a('function')
    })

    it('Should have a type', function () {
      expect(Settings.SettingsActions.researchPercentage(90).type).to.be.a('string')  
    })

    it('Should have a percentage', function () {
      expect(Settings.SettingsActions.researchPercentage(90).percentage).to.be.a('number')  
    })
  })
})
