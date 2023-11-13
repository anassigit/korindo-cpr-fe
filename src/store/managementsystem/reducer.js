import {
  ADD_EMPLOYEE_OF,
  GET_CANDIDATE_LIST,
  GET_LIST,
  GET_YEAR_LIST,
  MSG_ADD,
  RESP_GET_CANDIDATE_LIST,
  RESP_GET_LIST,
  RESP_GET_YEAR_LIST
} from "./actionTypes"

const INIT_STATE = {
  respGetList: {},
  respGetYearList: {},
  respGetCandidateList: {},
  msgAdd: '',
}

const managementSystemReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
      }
    case RESP_GET_LIST:
      return {
        ...state,
        respGetList: action.payload,
      }
    case GET_YEAR_LIST:
      return {
        ...state,
      }
    case RESP_GET_YEAR_LIST:
      return {
        ...state,
        respGetYearList: action.payload,
      }
    case GET_CANDIDATE_LIST:
      return {
        ...state,
      }
    case RESP_GET_CANDIDATE_LIST:
      return {
        ...state,
        respGetCandidateList: action.payload,
      }
    case ADD_EMPLOYEE_OF:
      return {
        ...state,
      }
    case MSG_ADD:
      return {
        ...state,
        msgAdd: action.payload,
      }
    case MSG_ADD:
      return {
        ...state,
        respGetList: {},
        respGetYearList: {},
        respGetCandidateList: {},
        msgAdd: '',
      }
    default:
      return state
  }
}

export default managementSystemReducer