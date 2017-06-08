<<<<<<< HEAD
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
=======
//import fetch from 'isomorphic-fetch'

const jsonData = `{"depot":{"id" : "1","files" : [{"id" : "1","name" : "Salut"},{"id" : "2","name" : "Buche"},{"id" : "5","name" : "Tes"},{"id" : "6","name" : "Beau"}],"similarities" : [{"file1" : "1","file2" : "2","percent" : "3","type"  : "4"},{"file1" : "5","file2" : "6","percent" : "7","type"  : "8"}]}}
`
>>>>>>> API en JSON

// ------------------------------------
// Constants
// ------------------------------------
export const APPEND = 'APPEND'
export const SET_ACTIVE_FILE_LEFT = 'SET_ACTIVE_FILE_LEFT'
export const SET_ACTIVE_FILE_RIGHT = 'SET_ACTIVE_FILE_RIGHT'
export const REMOVE_ACTIVE_FILE_LEFT = 'REMOVE_ACTIVE_FILE_LEFT'
export const REMOVE_ACTIVE_FILE_RIGHT = 'REMOVE_ACTIVE_FILE_RIGHT'
export const REMOVE_ACTIVE_FILES = 'REMOVE_ACTIVE_FILES'
<<<<<<< HEAD
export const LOAD_DEPOT = 'LOAD_DEPOT'
<<<<<<< HEAD
=======
export const SHOW_SIMILARITIES_ONLY = 'SHOW_SIMILARITIES_ONLY'
=======
export const RECEIVE_FILES = 'RECEIVE_FILES'
export const REQUEST_FILE = 'REQUEST_FILE'
export const REQUEST_ANALYSIS = 'REQUEST_ANALYSIS'
>>>>>>> API en JSON
>>>>>>> API en JSON

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

<<<<<<< HEAD
function loadDepot(){
=======
<<<<<<< HEAD
function loadDepot() {
>>>>>>> API en JSON
  return {
    type: LOAD_DEPOT,
    payload: {
      id: 0
    }
  }
}

=======
>>>>>>> API en JSON
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

function receiveFiles(response){
  return {
    type: RECEIVE_FILES,
    payload: response
  }
}

function requestFiles() {
  return {
    type: REQUEST_FILE
  }
}

function requestAnalysis() {
  return {
    type: REQUEST_ANALYSIS
  }
}


export const FileActions = {
  append,
  setActiveFileLeft,
  setActiveFileRight,
  removeActiveFileLeft,
  removeActiveFileRight,
  removeActiveFiles,
<<<<<<< HEAD
  loadDepot
=======
  loadDepot,
  showSimilaritiesOnly,
  analyseDepot
>>>>>>> API en JSON
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
<<<<<<< HEAD
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
<<<<<<< HEAD
  return {...state, files: [...state.files.concat(...newState)]}
=======
  return { ...state, files: [...state.files.concat(...newState)] }
=======
  [REQUEST_FILE]: (state, action) => ({...state}),
  [REQUEST_ANALYSIS]: (state, action) => ({...state}),
  [RECEIVE_FILES]: (state, action) => (bs2(state, action)),
}


/*
function loadDepot(){
  return dispatch => {
    dispatch(requestFiles())
    return fetch(`https://api.github.com/users/mralexgray/repos`, {method: 'GET'})
    .then(response => response.json())
    .then(json => dispatch(receiveFiles(json)))
  }
}*/

function analyseDepot() {
  return dispatch => {
    dispatch(requestAnalysis())
    return fetch(`http://s6ie1702.gel.usherbrooke.ca:8080/appserver/analysis?depot=1`, {method: 'POST'})
  }
>>>>>>> API en JSON
}

function loadDepot(){
  return dispatch => {
    dispatch(requestFiles())
    return fetch(`http://s6ie1702.gel.usherbrooke.ca:8080/appserver/depot`, {method: 'GET'})
    .then(response => response.json())
    .then(json => dispatch(receiveFiles(json)))
  }
>>>>>>> API en JSON
}

//dispatch(receiveFiles(response))
function bs2(state, action) {
  var newState = []
  var response = action.payload

  console.log("SERVER DATA!!")
  console.log(response)
  var files = response.depot.files
  var similarities = response.depot.similarities
  for(var i = 0;i<files.length;i++){
    newState[i] = {id:files[i].id, name:files[i].name, similarities: []}
  }

  for(var i = 0;i<similarities.length;i++){
    var file1 = similarities[i].file1
    var file2 = similarities[i].file2
    var percent = similarities[i].percent

    newState.filter(file => file.id  == file1)[0].similarities.push({id:file2, percent: percent})
    newState.filter(file => file.id  == file2)[0].similarities.push({id:file1, percent: percent})
  }
  console.log("newState")
  console.log(newState)
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
