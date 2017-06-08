const xmlData = `<depot>
<id>1</id>
<files>
<file>
<id>1</id>
<name>Salut</name>
</file>
<file>
<id>2</id>
<name>Buche</name>
</file>
<file>
<id>5</id>
<name>Tes</name>
</file>
<file>
<id>6</id>
<name>Beau</name>
</file>
</files>
<similarities>
<similarity>
<file1>1</file1>
<file2>2</file2>
<percent>3</percent>
<type>4</type>
</similarity>
<similarity>
<file1>5</file1>
<file2>6</file2>
<percent>7</percent>
<type>8</type>
</similarity>
</similarities>
</depot>`

// ------------------------------------
// Constants
// ------------------------------------
export const APPEND = 'APPEND'
export const SET_ACTIVE_FILE_LEFT = 'SET_ACTIVE_FILE_LEFT'
export const SET_ACTIVE_FILE_RIGHT = 'SET_ACTIVE_FILE_RIGHT'
export const REMOVE_ACTIVE_FILE_LEFT = 'REMOVE_ACTIVE_FILE_LEFT'
export const REMOVE_ACTIVE_FILE_RIGHT = 'REMOVE_ACTIVE_FILE_RIGHT'
export const REMOVE_ACTIVE_FILES = 'REMOVE_ACTIVE_FILES'
export const LOAD_DEPOT = 'LOAD_DEPOT'

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

function loadDepot(){
  return {
    type: LOAD_DEPOT,
    payload: {
      id: 0
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
    type: REMOVE_ACTIVE_FILE_LEFT
  }
}

function removeActiveFileRight() {
  return {
    type: REMOVE_ACTIVE_FILE_RIGHT
  }
}

function removeActiveFiles() {
  return {
    type: REMOVE_ACTIVE_FILES
  }
}

export const FileActions = {
  append,
  setActiveFileLeft,
  setActiveFileRight,
  removeActiveFileLeft,
  removeActiveFileRight,
  removeActiveFiles,
  loadDepot
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [APPEND]: (state, action) => ({ ...state, files: [...state.files, action.payload] }),
  [SET_ACTIVE_FILE_LEFT]: (state, action) => ({ ...state, activeFileLeft: action.payload.id }),
  [SET_ACTIVE_FILE_RIGHT]: (state, action) => ({ ...state, activeFileRight: action.payload.id }),
  [REMOVE_ACTIVE_FILE_LEFT]: (state, action) => ({ ...state, activeFileLeft: -1 }),
  [REMOVE_ACTIVE_FILE_RIGHT]: (state, action) => ({ ...state, activeFileRight: -1 }),
  [REMOVE_ACTIVE_FILES]: (state, action) => ({ ...state, activeFileRight: -1, activeFileLeft: -1 }),
  [LOAD_DEPOT]: (state, action) => (bs(state)),
}

function bs(state){
  var parseString = require('xml2js').parseString
  var newState = []  
  parseString(xmlData, function(err, result){
    var files = result.depot.files[0].file
    var similarities = result.depot.similarities[0].similarity
    console.log(files)
    for(var i = 0;i<files.length;i++){
      newState[i] = {id:files[i].id[0], name:files[i].name[0], similarities: []}
    }

    for(var i = 0;i<similarities.length;i++){
      var file1 = similarities[i].file1[0]
      var file2 = similarities[i].file2[0]
      var percent = similarities[i].percent[0]

      newState.filter(file => file.id  == file1)[0].similarities.push({id:file2, percent: percent})
      newState.filter(file => file.id  == file2)[0].similarities.push({id:file1, percent: percent})
    }

    console.log({...state, files: [...state.files.concat(...newState)]})
  })
  return {...state, files: [...state.files.concat(...newState)]}
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
