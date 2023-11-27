import {
  GET_MANUAL,
  RESET_MESSAGE,
  RESP_GET_MANUAL
} from "./actionTypes"

const INIT_STATE = {
  respGetManual: {},
}

const manualReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_MANUAL:
      return {
        ...state,
      }
    case RESP_GET_MANUAL:
      return {
        ...state,
        respGetManual: action.payload,
      }
    default:
      return state
  }
}

export default manualReducer