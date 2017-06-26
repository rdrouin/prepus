import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import fileReducer from './modules/file'
import depotReducer from './modules/depot'

export default combineReducers({
  fileReducer,
  depotReducer,
  router
})
