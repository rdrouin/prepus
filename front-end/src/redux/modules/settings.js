// ------------------------------------
// Constants
// ------------------------------------

export const SHOW_SIMILARITIES_ONLY = 'SHOW_SIMILARITIES_ONLY'
export const SHOW_METADATA = 'SHOW_METADATA'
export const SIMILARITIES_PERCENTAGE = 'SIMILARITIES_PERCENTAGE'
export const RESEARCH_PERCENTAGE = 'RESEARCH_PERCENTAGE'

// ------------------------------------
// Actions
// ------------------------------------

function showSimilaritiesOnly () {
  return {
    type: SHOW_SIMILARITIES_ONLY
  }
}
function showMetadata () {
  return {
    type: SHOW_METADATA
  }
}
function similaritiesPercentage (percentage) {
  return {
    type: SIMILARITIES_PERCENTAGE,
    percentage: percentage
  }
}
function researchPercentage (percentage) {
  return {
    type: RESEARCH_PERCENTAGE,
    percentage: percentage
  }
}

export const SettingsActions = {
  showSimilaritiesOnly,
  showMetadata,
  similaritiesPercentage,
  researchPercentage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_SIMILARITIES_ONLY]: (state, action) => ({ ...state, similarities: !state.similarities }),
  [SHOW_METADATA]: (state, action) => ({ ...state, metadata: !state.metadata }),
  [SIMILARITIES_PERCENTAGE]: (state, action) => ({ ...state, similarity: action.percentage }),
  [RESEARCH_PERCENTAGE]: (state, action) => ({ ...state, research: action.percentage })
}

// ------------------------------------
// Reducer
// ------------------------------------

export const initSettings = {
  similarities: 0,
  similarity: 30,
  research: 30,
  metadata: 0
}
export default function settingsReducer (state = initSettings, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
