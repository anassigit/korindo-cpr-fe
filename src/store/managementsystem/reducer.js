import {
  GET_LIST,
  RESP_GET_LIST
} from "./actionTypes"

const INIT_STATE = {
  respGetList: {},
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
    default:
      return state
  }
}

export default managementSystemReducer