// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_DEPOT = 'REQUEST_DEPOT'
export const RECEIVE_DEPOT = 'RECEIVE_DEPOT'

export const REQUEST_DEPOTS_LIST = 'REQUEST_DEPOTS_LIST'
export const RECEIVE_DEPOTS_LIST = 'RECEIVE_DEPOTS_LIST'

export const REQUEST_ANALYSIS = 'REQUEST_ANALYSIS'

// ------------------------------------
// Actions
// ------------------------------------

function requestDepot (depotId) {
  return {
    type: REQUEST_DEPOT,
    id: depotId
  }
}

function receiveDepot (response) {
  return {
    type: RECEIVE_DEPOT,
    payload: response
  }
}

function requestDepotsList () {
  return {
    type: REQUEST_DEPOTS_LIST
  }
}

function receiveDepotsList (response) {
  return {
    type: RECEIVE_DEPOTS_LIST,
    payload: response
  }
}

function requestAnalysis () {
  return {
    type: REQUEST_ANALYSIS
  }
}

export const FileActions = {
  loadDepotIfNeeded,
  analyseDepot,
  loadDepotsList
}

// -----------------------------------
// Action Handlers
// -----------------------------------
const ACTION_HANDLERS = {
  [REQUEST_DEPOT]: (state, action) => ({ ...state }),
  [REQUEST_ANALYSIS]: (state, action) => ({ ...state }),
  [RECEIVE_DEPOT]: (state, action) => (parseFiles(state, action)),
  [RECEIVE_DEPOTS_LIST]: (state, action) => parseDepotsList(state, action)
}

function analyseDepot (metadata, similarityPercentage, researchPercentage) {
  return dispatch => {
    dispatch(requestAnalysis())
    return fetch(`http://s6ie1702.gel.usherbrooke.ca:8080/api/analysis?
depot=1&
metadata=${metadata}&
similarityPercentage=${similarityPercentage}&
researchPercentage=${researchPercentage}`, {method: 'POST', headers:{'Content-Type':'application/json'}})
  }
}

function loadDepot (depotId) {
  return dispatch => {
    dispatch(requestDepot(depotId))
    return fetch(`http://s6ie1702.gel.usherbrooke.ca:8080/api/depot/${depotId}`, { method: 'GET' })
       .then(response => response.json())
       .then(json => dispatch(receiveDepot(json)))
  }
}

function loadDepotIfNeeded () {
  return (dispatch, getState) => {
    var applicationReducer = getState().applicationReducer
    if (shouldLoadDepot(getState().fileReducer, applicationReducer.activeDepot)) {
      return dispatch(loadDepot(applicationReducer.activeDepot))
    }
  }
}

function shouldLoadDepot (state, depotId) {
  return state.depots.filter(depot => depot.id === depotId)[0].files === undefined
}

function parseFiles (state, action) {
  var newState = []
  var response = action.payload
  var files = response.depot.files
  var similarities = response.depot.similarities
  for (var i = 0; i < files.length; i++) {
    newState[i] = { id: files[i].id, name: files[i].name, similarities: [] }
  }

  for (i = 0; i < similarities.length; i++) {
    var file1 = similarities[i].file1
    var file2 = similarities[i].file2
    var text1 = similarities[i].text1
    var text2 = similarities[i].text2
    var percent = similarities[i].percent

    newState.filter(file => file.id === file1)[0].similarities.push({ id: file2, percent: percent, text: text1 })
    newState.filter(file => file.id === file2)[0].similarities.push({ id: file1, percent: percent, text: text2 })
  }

  var depots = state.depots.map((depot) => {
    if (depot.id !== response.depot.id) {
      // This isn't the item we care about - keep it as-is
      return depot
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...depot,
      files: [...newState]
    }
  })
  return { ...state, depots: depots }
}

function loadDepotsList () {
  return dispatch => {
    dispatch(requestDepotsList())
    return fetch('http://s6ie1702.gel.usherbrooke.ca:8080/api/depot', { method: 'GET' })
       .then(response => response.json())
       .then(json => dispatch(receiveDepotsList(json)))
  }
}

function parseDepotsList (state, action) {
  var depots = action.payload.depots
  var newDepots = []
  for (var i = 0; i < depots.length; i++) {
    newDepots.push({
      id: depots[i].id,
      name: depots[i].name,
      date: depots[i].date,
      count: depots[i].count,
      analyze: depots[i].analyze
    })
  }
  return {...state, depots: [...state.depots, ...newDepots]}
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initFile = {
  depots: []
}

export default function fileReducer (state = initFile, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
