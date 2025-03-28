import {
  GET_MENU,
  RESP_GET_MENU
} from "./actionTypes"

const INIT_STATE = {
  respGetMenu: {},
}

const menuReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_MENU:
      return {
        ...state,
      }
    case RESP_GET_MENU:
      return {
        ...state,
        respGetMenu: action.payload,
      }
    default:
      return state
  }
}

export default menuReducer