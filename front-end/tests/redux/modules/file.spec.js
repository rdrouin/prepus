
import fileReducer, * as File from 'redux/modules/file.js'

describe('File', function () {
  it('Should export a constant REQUEST_DEPOT.', function () {
    expect(File.REQUEST_DEPOT).to.equal('REQUEST_DEPOT')
  })

  it('Should export a constant RECEIVE_DEPOT.', function () {
    expect(File.RECEIVE_DEPOT).to.equal('RECEIVE_DEPOT')
  })

  it('Should export a constant REQUEST_DEPOTS_LIST.', function () {
    expect(File.REQUEST_DEPOTS_LIST).to.equal('REQUEST_DEPOTS_LIST')
  })

  it('Should export a constant RECEIVE_DEPOTS_LIST.', function () {
    expect(File.RECEIVE_DEPOTS_LIST).to.equal('RECEIVE_DEPOTS_LIST')
  })

  it('Should export a constant REQUEST_ANALYSIS.', function () {
    expect(File.REQUEST_ANALYSIS).to.equal('REQUEST_ANALYSIS')
  })

  describe('(Reducer)', function () {
    it('Should be a function.', function () {
      expect(fileReducer).to.be.a('function')
    })

    it('Should initialize with a state of depots = []', function () {
      let state = fileReducer(undefined, {})
      expect(state.depots).to.be.a('array')
      expect(state.depots.length).to.equal(0)
    })

    it('Should return the previous state if an action was not matched.', function () {
      let state = fileReducer(undefined, {})
      state = fileReducer(state, {type: '@@@@@@@'})
      expect(state).to.equal(fileReducer(undefined, {}))
    })
  })

  describe('loadDepotIfNeeded', function () {
    it('Should be a function', function () {
      expect(File.FileActions.loadDepotIfNeeded).to.be.a('function')
    })
  })

  describe('analyseDepot', function () {
    it('Should be a function', function () {
      expect(File.FileActions.analyseDepot).to.be.a('function')
    })
  })

  describe('loadDepotsList', function () {
    it('Should be a function', function () {
      expect(File.FileActions.loadDepotsList).to.be.a('function')
    })
  })
})
