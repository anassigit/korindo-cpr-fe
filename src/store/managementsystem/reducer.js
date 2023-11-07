import {
  GET_LIST,
  GET_YEAR_LIST,
  RESP_GET_LIST,
  RESP_GET_YEAR_LIST
} from "./actionTypes"

const INIT_STATE = {
  respGetList: {},
  respGetYearList: {},
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
    default:
      return state
  }
}

export default managementSystemReducer