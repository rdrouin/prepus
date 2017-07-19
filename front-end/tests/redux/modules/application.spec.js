
import applicationReducer, * as Application from 'redux/modules/application'

describe('Application', function () {
  it('Should export a constant SET_ACTIVE_DEPOT.', function () {
    expect(Application.SET_ACTIVE_DEPOT).to.equal('SET_ACTIVE_DEPOT')
  })

  it('Should export a constant REMOVE_ACTIVE_DEPOT.', function () {
    expect(Application.REMOVE_ACTIVE_DEPOT).to.equal('REMOVE_ACTIVE_DEPOT')
  })

  it('Should export a constant SET_ACTIVE_FILE_LEFT.', function () {
    expect(Application.SET_ACTIVE_FILE_LEFT).to.equal('SET_ACTIVE_FILE_LEFT')
  })

  it('Should export a constant SET_ACTIVE_FILE_RIGHT.', function () {
    expect(Application.SET_ACTIVE_FILE_RIGHT).to.equal('SET_ACTIVE_FILE_RIGHT')
  })

  it('Should export a constant REMOVE_ACTIVE_FILE_LEFT.', function () {
    expect(Application.REMOVE_ACTIVE_FILE_LEFT).to.equal('REMOVE_ACTIVE_FILE_LEFT')
  })

  it('Should export a constant REMOVE_ACTIVE_FILE_RIGHT.', function () {
    expect(Application.REMOVE_ACTIVE_FILE_RIGHT).to.equal('REMOVE_ACTIVE_FILE_RIGHT')
  })

  it('Should export a constant REMOVE_ACTIVE_FILES.', function () {
    expect(Application.REMOVE_ACTIVE_FILES).to.equal('REMOVE_ACTIVE_FILES')
  })

  it('Should export a constant SHOW_SETTINGS.', function () {
    expect(Application.SHOW_SETTINGS).to.equal('SHOW_SETTINGS')
  })

  describe('(Reducer)', function () {
    it('Should be a function', function () {
      expect(applicationReducer).to.be.a('function')
    })

    it('Should initialize with a given state.', function () {
      let state = applicationReducer(undefined, {});

      expect(state.activeFileLeft).to.equal(-1);
      expect(state.activeFileRight).to.equal(-1);
      expect(state.activeDepot).to.equal(-1);
      expect(state.showSettings).to.equal(false);
    })

    it('Should return the previous state if an action was not matched.', function () {
      let state = applicationReducer(undefined, {})
      state = applicationReducer(state, {type: '@@@@@@@'})
      expect(state).to.equal(applicationReducer(undefined, {}))
    })
  })

  describe('setActiveFileLeft', function () {
    it('Should be a function', function () {
      expect(Application.ApplicationActions.setActiveFileLeft).to.be.a('function')
    })

    it('Should have a type', function () {
      expect(Application.ApplicationActions.setActiveFileLeft('0').type).to.be.a('string')  
    })

    it('Should have an id', function () {
      expect(Application.ApplicationActions.setActiveFileLeft('0').type).to.be.a('string')  
    })
  })

  describe('setActiveFileRight', function () {
    it('Should be a function', function () {
      expect(Application.ApplicationActions.setActiveFileRight).to.be.a('function')
    })

    it('Should have a type', function () {
      expect(Application.ApplicationActions.setActiveFileRight('0').type).to.be.a('string')  
    })

    it('Should have an id', function () {
      expect(Application.ApplicationActions.setActiveFileRight('0').type).to.be.a('string')  
    })
  })

  describe('removeActiveFileLeft', function () {
    it('Should be a function', function () {
      expect(Application.ApplicationActions.removeActiveFileLeft).to.be.a('function')
    })

    it('Should have a type', function () {
      expect(Application.ApplicationActions.setActiveFileRight('0').type).to.be.a('string')  
    })
  })

  describe('removeActiveFileRight', function () {
    it('Should be a function', function () {
      expect(Application.ApplicationActions.removeActiveFileRight).to.be.a('function')
    })

    it('Should have a type', function () {
      expect(Application.ApplicationActions.removeActiveFileRight('0').type).to.be.a('string')  
    })
  })

  describe('setActiveDepot', function () {
    it('Should be a function', function () {
      expect(Application.ApplicationActions.setActiveDepot).to.be.a('function')
    })

    it('Should have a type', function () {
      expect(Application.ApplicationActions.setActiveDepot('0').type).to.be.a('string')  
    })

    it('Should have an id', function () {
      expect(Application.ApplicationActions.setActiveDepot('0').type).to.be.a('string')  
    })
  })

  describe('removeActiveDepot', function () {
    it('Should be a function', function () {
      expect(Application.ApplicationActions.removeActiveDepot).to.be.a('function')
    })

    it('Should have a type', function () {
      expect(Application.ApplicationActions.removeActiveDepot('0').type).to.be.a('string')  
    })
  })

  describe('showSettings', function () {
    it('Should be a function', function () {
      expect(Application.ApplicationActions.showSettings).to.be.a('function')
    })

    it('Should have a type', function () {
      expect(Application.ApplicationActions.showSettings('0').type).to.be.a('string')  
    })
  })
})
