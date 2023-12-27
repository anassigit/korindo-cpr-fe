import {
  EDIT_REPORT,
  GET_LIST_REPORT2,
  GET_STATUS_REPORT,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_STATUS_REPORT,
  RESP_GET_REPORT_LIST2
} from "./actionTypes"

const INIT_STATE = {
  respGetReportList2: {},
  respGetStatusReport: {},
  msgEdit: '',
}

const managementBoardReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LIST_REPORT2:
      return {
        ...state,
      }
    case RESP_GET_REPORT_LIST2:
      return {
        ...state,
        respGetReportList2: action.payload,
      }
    case GET_STATUS_REPORT:
      return {
        ...state,
      }
    case RESP_GET_STATUS_REPORT:
      return {
        ...state,
        respGetStatusReport: action.payload,
      }
    case EDIT_REPORT:
      return {
        ...state,
      }
    case MSG_EDIT:
      return {
        ...state,
        msgEdit: action.payload,
      }
    case RESET_MESSAGE:
      return {
        ...state,
        msgEdit: '',
      }
    default:
      return state
  }
}

export default managementBoardReducer