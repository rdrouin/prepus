// ------------------------------------
// Constants
// ------------------------------------

export const SET_ACTIVE_DEPOT = 'SET_ACTIVE_DEPOT'
export const REMOVE_ACTIVE_DEPOT = 'REMOVE_ACTIVE_DEPOT'
export const SET_ACTIVE_FILE_LEFT = 'SET_ACTIVE_FILE_LEFT'
export const SET_ACTIVE_FILE_RIGHT = 'SET_ACTIVE_FILE_RIGHT'
export const REMOVE_ACTIVE_FILE_LEFT = 'REMOVE_ACTIVE_FILE_LEFT'
export const REMOVE_ACTIVE_FILE_RIGHT = 'REMOVE_ACTIVE_FILE_RIGHT'
export const REMOVE_ACTIVE_FILES = 'REMOVE_ACTIVE_FILES'
export const SHOW_SETTINGS = 'SHOW_SETTINGS'
export const HIDE_SETTINGS = 'SHOW_SETTINGS'

// ------------------------------------
// Actions
// ------------------------------------

function setActiveFileLeft (id) {
  return {
    type: SET_ACTIVE_FILE_LEFT,
    id: id
  }
}

function setActiveFileRight (id) {
  return {
    type: SET_ACTIVE_FILE_RIGHT,
    id: id
  }
}

function removeActiveFileLeft () {
  return {
    type: REMOVE_ACTIVE_FILE_LEFT
  }
}

function removeActiveFileRight () {
  return {
    type: REMOVE_ACTIVE_FILE_RIGHT
  }
}

function removeActiveFiles () {
  return {
    type: REMOVE_ACTIVE_FILES
  }
}

function setActiveDepot (id) {
  return {
    type: SET_ACTIVE_DEPOT,
    id: id
  }
}
function removeActiveDepot () {
  return {
    type: REMOVE_ACTIVE_DEPOT
  }
}
function showSettings () {
  return {
    type: SHOW_SETTINGS
  }
}

export const ApplicationActions = {
  setActiveFileLeft,
  setActiveFileRight,
  removeActiveFileLeft,
  removeActiveFileRight,
  removeActiveFiles,
  setActiveDepot,
  removeActiveDepot,
  showSettings
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_ACTIVE_FILE_LEFT]: (state, action) => ({ ...state, activeFileLeft: action.id }),
  [SET_ACTIVE_FILE_RIGHT]: (state, action) => ({ ...state, activeFileRight: action.id }),
  [REMOVE_ACTIVE_FILE_LEFT]: (state, action) => ({ ...state, activeFileLeft: -1 }),
  [REMOVE_ACTIVE_FILE_RIGHT]: (state, action) => ({ ...state, activeFileRight: -1 }),
  [REMOVE_ACTIVE_FILES]: (state, action) => ({ ...state, activeFileRight: -1, activeFileLeft: -1 }),
  [SET_ACTIVE_DEPOT]: (state, action) => ({...state, activeDepot: action.id}),
  [REMOVE_ACTIVE_DEPOT]: (state, action) => ({...state, activeDepot: -1}),
  [SHOW_SETTINGS]: (state, action) => ({...state, showSettings: !state.showSettings})
}

// ------------------------------------
// Reducer
// ------------------------------------

export const initApplication = {
  activeFileLeft: -1,
  activeFileRight: -1,
  activeDepot: -1,
  showSettings: false
}
export default function applicationReducer (state = initApplication, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
