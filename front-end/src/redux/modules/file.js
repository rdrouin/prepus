// import {fetch} from 'isomorphic-fetch'
/*
const jsonData = `{"depot":
{"id" : "1","files" : [{"id" : "1","name" : "Document1.pdf"},
{"id" : "2","name" : "travaux2.pdf"},{"id" : "5","name" : "belo2302.pdf"},
{"id" : "6","name" : "ethique.pdf"},{"id" : "10","name" : "parfait.pdf"}],
"similarities" :
 [{"file1" : "1","file2" : "2","percent" : "3","type"  : "4"},
 {"file1" : "5","file2" : "6","percent" : "7","type"  : "8"}]}}`

const jsonDataFinalBaton = `{"depot":
  {"id":"2",
  "files":[
    {"id": "1","name":"blablop.docx"},
    {"id": "5","name":"texteidentique1.docx"},
    {"id": "4","name":"texteidentique1.docx"},
    {"id": "3","name":"m2.docx"},
    {"id": "2","name":"meta1.docx"}
  ],"similarities":[
    {"file1":"4","file2":"5","percent":"100","type":"1"},
    {"file1":"5","file2":"4","percent":"100","type":"1"}
  ]}
}`

const jsonDepotsList = `{"depots":[
  {"id": "1","name":"Rapport 1"},
  {"id": "2","name":"Rapport final"},
  {"id": "3","name":"Rapport labo"}
]}`
*/
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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_DEPOT]: (state, action) => ({ ...state }),
  [REQUEST_ANALYSIS]: (state, action) => ({ ...state }),
  [RECEIVE_DEPOT]: (state, action) => (parseFiles(state, action)),
  [RECEIVE_DEPOTS_LIST]: (state, action) => parseDepotsList(state, action)
}

function analyseDepot () {
  return dispatch => {
    dispatch(requestAnalysis())
    return fetch('http://s6ie1702.gel.usherbrooke.ca:8080/api/analysis?depot=1', {method: 'POST'})
  }
}

function loadDepot (depotId) {
  /* if (depotId === '1') {
    return dispatch => {
      dispatch(requestDepot(depotId))
      var json = JSON.parse(jsonData)
      return dispatch(receiveDepot(json))
    }
  } else if (depotId === '2') {
    return dispatch => {
      dispatch(requestDepot(depotId))
      var json = JSON.parse(jsonDataFinalBaton)
      return dispatch(receiveDepot(json))
    }
  } */
  return dispatch => {
    dispatch(requestDepot())
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

// dispatch(receiveDepot(response))
function parseFiles (state, action) {
  var newState = []
  var response = action.payload
  var files = response.depot.files
  var similarities = response.depot.similarities
  // var id = response.depot.id
  for (var i = 0; i < files.length; i++) {
    newState[i] = { id: files[i].id, name: files[i].name, similarities: [] }
  }

  for (i = 0; i < similarities.length; i++) {
    var file1 = similarities[i].file1
    var file2 = similarities[i].file2
    var percent = similarities[i].percent

    newState.filter(file => file.id === file1)[0].similarities.push({ id: file2, percent: percent })
    newState.filter(file => file.id === file2)[0].similarities.push({ id: file1, percent: percent })
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
/*
  return dispatch => {
    dispatch(requestDepotsList())
    var json = JSON.parse(jsonDepotsList)
    return dispatch(receiveDepotsList(json))
  }*/
function parseDepotsList (state, action) {
  var depots = action.payload.depots
  var newDepots = []
  for (var i = 0; i < depots.length; i++) {
    newDepots.push({id: depots[i].id, name: depots[i].name})
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
