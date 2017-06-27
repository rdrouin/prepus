// ------------------------------------
// Constants
// ------------------------------------

export const SHOW_SIMILARITIES_ONLY = 'SHOW_SIMILARITIES_ONLY'

// ------------------------------------
// Actions
// ------------------------------------

function showSimilaritiesOnly () {
  return {
    type: SHOW_SIMILARITIES_ONLY
  }
}

export const SettingsActions = {
  showSimilaritiesOnly
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_SIMILARITIES_ONLY]: (state, action) => ({ ...state, similarities: !state.similarities })
}

// ------------------------------------
// Reducer
// ------------------------------------

export const initSettings = {
  similarities: 0
}
export default function settingsReducer (state = initSettings, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
