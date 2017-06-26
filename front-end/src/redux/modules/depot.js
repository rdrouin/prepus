/* const jsonData = `{"depot":
{"id" : "1","files" : [{"id" : "1","name" : "Document1.pdf"},
{"id" : "2","name" : "travaux2.pdf"},{"id" : "5","name" : "belo2302.pdf"},
{"id" : "6","name" : "ethique.pdf"},{"id" : "10","name" : "parfait.pdf"}],
"similarities" :
 [{"file1" : "1","file2" : "2","percent" : "3","type"  : "4"},
 {"file1" : "5","file2" : "6","percent" : "7","type"  : "8"}]}}` */

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
export const RECEIVE_DEPOT_LIST = 'RECEIVE_DEPOT_LIST'
export const SET_ACTIVE_DEPOT = 'SET_ACTIVE_DEPOT'

// ------------------------------------
// Actions
// ------------------------------------

function receiveDepotList (response) {
  return {
    type: RECEIVE_DEPOT_LIST,
    payload: response
  }
}

function setActiveDepot (id) {
  return {
    type: SET_ACTIVE_DEPOT,
    id: id
  }
}

export const DepotActions = {
  receiveDepotList,
  loadDepotList,
  setActiveDepot
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_DEPOT_LIST]: (state, action) => bs3(state, action),
  [SET_ACTIVE_DEPOT]: (state, action) => ({...state, activeDepot: action.id})
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
    depots.push(response[i].depot.id)
  }

  return {...state, depotsList: [...state.depotsList, ...depots]}
}

// ------------------------------------
// Reducer
// ------------------------------------

export const initDepot = {
  activeDepot: -1,
  depotsList: []
}
export default function depotReducer (state = initDepot, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
