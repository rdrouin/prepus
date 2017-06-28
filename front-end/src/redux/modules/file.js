// import {fetch} from 'isomorphic-fetch'

const jsonData = `{"depot":
{"id" : "1","files" : [{"id" : "1","name" : "Document1.pdf"},
{"id" : "2","name" : "travaux2.pdf"},{"id" : "5","name" : "belo2302.pdf"},
{"id" : "6","name" : "ethique.pdf"},{"id" : "10","name" : "parfait.pdf"}],
"similarities" :
 [{"file1" : "1","file2" : "2","percent" : "3","type"  : "4"},
 {"file1" : "5","file2" : "6","percent" : "7","type"  : "8"}]}}`

const jsonData2 = `[{"depot":
{"id" : "1","files" : [{"id" : "1","name" : "Document1.pdf"},
{"id" : "2","name" : "travaux2.pdf"},{"id" : "5","name" : "belo2302.pdf"},
{"id" : "6","name" : "ethique.pdf"},{"id" : "10","name" : "parfait.pdf"}],
"similarities" :
[{"file1" : "1","file2" : "2","percent" : "3","type"  : "4"},
{"file1" : "5","file2" : "6","percent" : "7","type"  : "8"}]}},
 {"depot":
 {"id" : "2","files" : [{"id" : "1","name" : "BUCHE.pdf"},
 {"id" : "2","name" : "travaux2.pdf"},{"id" : "5","name" : "belo2302.pdf"},
 {"id" : "6","name" : "ethique.pdf"},{"id" : "10","name" : "parfait.pdf"}],
 "similarities" :
  [{"file1" : "1","file2" : "2","percent" : "3","type"  : "4"},
  {"file1" : "5","file2" : "6","percent" : "7","type"  : "8"}]}}]`

// ------------------------------------
// Constants
// ------------------------------------
export const APPEND = 'APPEND'

export const RECEIVE_FILES = 'RECEIVE_FILES'
export const REQUEST_FILE = 'REQUEST_FILE'
export const REQUEST_ANALYSIS = 'REQUEST_ANALYSIS'
export const RECEIVE_DEPOT_LIST = 'RECEIVE_DEPOT_LIST'

// ------------------------------------
// Actions
// ------------------------------------
function append (id, cip, name, size, plagiarism) {
  return {
    type: APPEND,
    payload: {
      id: id,
      cip: cip,
      name: name,
      text: [],
      size: size,
      plagiarism: plagiarism
    }
  }
}

function receiveFiles (response) {
  return {
    type: RECEIVE_FILES,
    payload: response
  }
}

function requestFiles (depotId) {
  return {
    type: REQUEST_FILE,
    id: depotId
  }
}

function requestAnalysis () {
  return {
    type: REQUEST_ANALYSIS
  }
}
function receiveDepotList (response) {
  return {
    type: RECEIVE_DEPOT_LIST,
    payload: response
  }
}

export const FileActions = {
  append,
  loadDepotIfNeeded,
  analyseDepot,
  receiveDepotList,
  loadDepotList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [APPEND]: (state, action) => ({ ...state, files: [...state.files, action.payload] }),
  [REQUEST_FILE]: (state, action) => ({ ...state }),
  [REQUEST_ANALYSIS]: (state, action) => ({ ...state }),
  [RECEIVE_FILES]: (state, action) => (bs2(state, action)),
  [RECEIVE_DEPOT_LIST]: (state, action) => bs3(state, action)
}

function analyseDepot () {
  return dispatch => {
    dispatch(requestAnalysis())
    // return fetch('http://s6ie1702.gel.usherbrooke.ca:8080/appserver/analysis?depot=1', {method: 'POST'})
  }
}

function loadDepot (depotId) {
  if (depotId === '1') {
    return dispatch => {
      dispatch(requestFiles(depotId))
      var json = JSON.parse(jsonData)
      return dispatch(receiveFiles(json))
    }
  } else if (depotId === '2') {
    return dispatch => {
      dispatch(requestFiles(depotId))
      var json = JSON.parse(jsonData2)
      return dispatch(receiveFiles(json))
    }
  }
  /* return dispatch => {
     dispatch(requestFiles())
     return fetch(`http://s6ie1702.gel.usherbrooke.ca:8080/appserver/depot`, { method: 'GET' })
       .then(response => response.json())
       .then(json => dispatch(receiveFiles(json)))
   }*/
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
  return state.depots.filter(depot => depot.id === depotId).length === 0
}

// dispatch(receiveFiles(response))
function bs2 (state, action) {
  var newState = []
  var response = action.payload
  var files = response.depot.files
  var similarities = response.depot.similarities
  var id = response.depot.id
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

  return { ...state, depots: [...state.depots, { id: id, files: [...newState] }] }
}
function loadDepotList () {
  return dispatch => {
    var json = JSON.parse(jsonData2)
    return dispatch(receiveDepotList(json))
  }
}

function bs3 (state, action) {
  var response = action.payload
  var depots = []
  for (var i = 0; i < response.length; i++) {
    depots.push({id: response[i].depot.id})
  }

  return {...state, depotsList: [...state.depotsList, ...depots]}
}

// ------------------------------------
// Reducer
// ------------------------------------

export const initFile = {
  depots: [],
  depotsList: []
}
export default function fileReducer (state = initFile, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
