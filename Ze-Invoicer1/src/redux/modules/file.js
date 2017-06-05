// ------------------------------------
// Constants
// ------------------------------------
export const APPEND = 'APPEND'
export const SET_ACTIVE_FILE_LEFT = 'SET_ACTIVE_FILE_LEFT'
export const SET_ACTIVE_FILE_RIGHT = 'SET_ACTIVE_FILE_RIGHT'
export const REMOVE_ACTIVE_FILE_LEFT = 'REMOVE_ACTIVE_FILE_LEFT'
export const REMOVE_ACTIVE_FILE_RIGHT = 'REMOVE_ACTIVE_FILE_RIGHT'

// ------------------------------------
// Actions
// ------------------------------------
function append(id, cip, name, size, plagiarism) {
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

function setActiveFileLeft(id) {
  return {
    type: SET_ACTIVE_FILE_LEFT,
    payload: {
      id: id
    }
  }
}

function setActiveFileRight(id) {
  return {
    type: SET_ACTIVE_FILE_RIGHT,
    payload: {
      id: id
    }
  }
}
function removeActiveFileLeft() {
  return {
    type: REMOVE_ACTIVE_FILE_LEFT,
    payload: {
      id: -1
    }
  }
}
function removeActiveFileRight() {
  return {
    type: REMOVE_ACTIVE_FILE_RIGHT,
    payload: {
      id: -1
    }
  }
}
export const FileActions = {
  append,
  setActiveFileLeft,
  setActiveFileRight,
  removeActiveFileLeft,
  removeActiveFileRight
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [APPEND]: (state, action) => ({ ...state, files: [...state.files, action.payload] }),
  [SET_ACTIVE_FILE_LEFT]: (state, action) => ({ ...state, activeFileLeft: action.payload.id }),
  [SET_ACTIVE_FILE_RIGHT]: (state, action) => ({ ...state, activeFileRight: action.payload.id }),
  [REMOVE_ACTIVE_FILE_LEFT]: (state,action) => ({...state, activeFileLeft: action.payload.id}),
  [REMOVE_ACTIVE_FILE_RIGHT]: (state,action) => ({...state, activeFileRight: action.payload.id})
}

// ------------------------------------
// Reducer
// ------------------------------------

export const initFile = {
  activeFileLeft: -1,
  activeFileRight: -1,
  files: []
}
export default function fileReducer(state = initFile, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
