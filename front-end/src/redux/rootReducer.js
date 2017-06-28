import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import fileReducer from './modules/file'
import settingsReducer from './modules/settings'
import applicationReducer from './modules/application'

export default combineReducers({
  fileReducer,
  settingsReducer,
  applicationReducer,
  router
})
