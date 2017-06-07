import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import fileReducer from './modules/file'

export default combineReducers({
  fileReducer,
  router
})
