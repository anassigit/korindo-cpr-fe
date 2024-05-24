<<<<<<< HEAD
import {
  GET_SEND_DETAIL,
  RESET_MESSAGE,
  RESP_GET_SEND_DETAIL
} from "./actionTypes"

const INIT_STATE = {
  respGetHistoryPemberian: {},
}

const historyPemberianReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    
    case GET_SEND_DETAIL:
      return {
        ...state,
      }
    case RESP_GET_SEND_DETAIL:
      return {
        ...state,
        respGetHistoryPemberian: action.payload,
      }
    default:
      return state
  }
}

=======
import {
  GET_SEND_DETAIL,
  RESET_MESSAGE,
  RESP_GET_SEND_DETAIL
} from "./actionTypes"

const INIT_STATE = {
  respGetHistoryPemberian: {},
}

const historyPemberianReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    
    case GET_SEND_DETAIL:
      return {
        ...state,
      }
    case RESP_GET_SEND_DETAIL:
      return {
        ...state,
        respGetHistoryPemberian: action.payload,
      }
    default:
      return state
  }
}

>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
export default historyPemberianReducer