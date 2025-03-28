import {
  ADD_EMPLOYEE_OF,
  DELETE_EMPLOYEE_OF,
  EDIT_EMPLOYEE_OF,
  GET_CANDIDATE,
  GET_CANDIDATE_LIST,
  GET_KEYWORD_LIST,
  GET_LIST,
  GET_LOCATION_LIST,
  GET_YEAR_LIST,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_CANDIDATE,
  RESP_GET_CANDIDATE_LIST,
  RESP_GET_KEYWORD_LIST,
  RESP_GET_LIST,
  RESP_GET_LOCATION_LIST,
  RESP_GET_YEAR_LIST
} from "./actionTypes"

const INIT_STATE = {
  respGetList: {},
  respGetYearList: {},
  respGetCandidateList: {},
  respGetCandidate: {},
  respGetLocationList: {},
  respGetKeywordList: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
}

const employeeOfMonYeaReducer = (state = INIT_STATE, action) => {

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
    case GET_CANDIDATE:
      return {
        ...state,
      }
    case RESP_GET_CANDIDATE:
      return {
        ...state,
        respGetCandidate: action.payload,
      }
    case GET_KEYWORD_LIST:
      return {
        ...state,
      }
    case RESP_GET_KEYWORD_LIST:
      return {
        ...state,
        respGetKeywordList: action.payload,
      }
    case GET_LOCATION_LIST:
      return {
        ...state,
      }
    case RESP_GET_LOCATION_LIST:
      return {
        ...state,
        respGetLocationList: action.payload,
      }
    case ADD_EMPLOYEE_OF:
      return {
        ...state,
      }
    case EDIT_EMPLOYEE_OF:
      return {
        ...state,
      }
    case DELETE_EMPLOYEE_OF:
      return {
        ...state,
      }
    case MSG_ADD:
      return {
        ...state,
        msgAdd: action.payload,
      }
    case MSG_EDIT:
      return {
        ...state,
        msgEdit: action.payload,
      }
    case MSG_DELETE:
      return {
        ...state,
        msgDelete: action.payload,
      }
    case RESET_MESSAGE:
      return {
        ...state,
        respGetList: {},
        respGetYearList: {},
        respGetCandidateList: {},
        respGetCandidate: {},
        respGetLocationList: {},
        respGetKeywordList: {},
        msgAdd: '',
        msgEdit: '',
        msgDelete: '',
      }
    default:
      return state
  }
}

export default employeeOfMonYeaReducer