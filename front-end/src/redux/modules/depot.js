const jsonData = '{"depot":{"id" : "1","files" : [{"id" : "1","name" : "Document1.pdf"},{"id" : "2","name" : "travaux2.pdf"},{"id" : "5","name" : "belo2302.pdf"},{"id" : "6","name" : "ethique.pdf"},{"id" : "10","name" : "parfait.pdf"}],"similarities" : [{"file1" : "1","file2" : "2","percent" : "3","type"  : "4"},{"file1" : "5","file2" : "6","percent" : "7","type"  : "8"}]}}'
const jsonData2 = '{"depot":{"id" : "2","files" : [{"id" : "1","name" : "BUCHE.pdf"},{"id" : "2","name" : "travaux2.pdf"},{"id" : "5","name" : "belo2302.pdf"},{"id" : "6","name" : "ethique.pdf"},{"id" : "10","name" : "parfait.pdf"}],"similarities" : [{"file1" : "1","file2" : "2","percent" : "3","type"  : "4"},{"file1" : "5","file2" : "6","percent" : "7","type"  : "8"}]}}'

// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_DEPOT_LIST = 'RECEIVE_DEPOT_LIST'


// ------------------------------------
// Actions
// ------------------------------------

function receiveDepotList() {
  return {
    type: RECEIVE_DEPOT_LIST
  }
}

export const DepotActions = {
  receiveDepotList,
  loadDepotList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_DEPOT_LIST]: (state, action)=> (bs3(state, action)),
  
}

function loadDepotList(){  
    return dispatch => {
    dispatch(receiveDepotList())
    return console.log('OK')
  }
}

function bs3(state,action) {
    console.log("In")
  
  return { ...state, depots: [...state.depots, { id: id, files: [...newState] }] }
}

// ------------------------------------
// Reducer
// ------------------------------------

export const initDepot = {
  activeFileLeft: -1,
  activeFileRight: -1,
  similarities: 0,
  activeDepot: 1,
  depots: []
}
export default function fileReducer(state = initDepot, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
