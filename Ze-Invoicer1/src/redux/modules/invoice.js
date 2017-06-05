// ------------------------------------
// Constants
// ------------------------------------
export const APPEND = 'APPEND'

// ------------------------------------
// Actions
// ------------------------------------
function append(cip, name) {
  return {
    type: APPEND,
    payload: {
      id: '',
      cip: cip,
      name: name,
      text: [],
      size: '',
      plagiarism: []
    }
  }
}

export const FileActions = {
  append
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [APPEND]: (state, action) => (appendFile(state, action))
}

function appendFile(state, action){
  let newFiles = state.files
  newFiles.push(action.payload)
  return {...state, files: newFiles}
}

// ------------------------------------
// Reducer
// ------------------------------------

export const initFile = {
  files: []
}
export default function fileReducer(state = initFile, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
