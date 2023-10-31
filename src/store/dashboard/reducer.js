import {
  GET_BEST_LIST,
  RESP_GET_BEST_LIST
} from "./actionTypes"

const INIT_STATE = {
  respGetBestList: {},
}

const dashboardReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_BEST_LIST:
      return {
        ...state,
      }
    case RESP_GET_BEST_LIST:
      return {
        ...state,
        respGetBestList: action.payload,
      }
    default:
      return state
  }
}

export default dashboardReducer