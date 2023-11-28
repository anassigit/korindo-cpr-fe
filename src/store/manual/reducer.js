import {
  GET_MANUAL,
  GET_MANUAL_PDF,
  GET_MANUAL_VIDEO,
  RESET_MESSAGE,
  RESP_GET_MANUAL,
  RESP_GET_MANUAL_PDF,
  RESP_GET_MANUAL_VIDEO
} from "./actionTypes"

const INIT_STATE = {
  respGetManualPDF: {},
  respGetManualVideo: {},
}

const manualReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_MANUAL_PDF:
      return {
        ...state,
      }
    case RESP_GET_MANUAL_PDF:
      return {
        ...state,
        respGetManualPDF: action.payload,
      }
    case GET_MANUAL_VIDEO:
      return {
        ...state,
      }
    case RESP_GET_MANUAL_VIDEO:
      return {
        ...state,
        respGetManualVideo: action.payload,
      }
    default:
      return state
  }
}

export default manualReducer