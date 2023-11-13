import {
  LOV_DIV,
  LOV_MENU,
  LOV_MENU_PARENT,
  LOV_USER,
  MSG_LOV
} from "./actionTypes"

const INIT_STATE = {
  resp: { data: [] },
}

const getLovData = (state = INIT_STATE, action) => {

  switch (action.type) {
    case LOV_MENU_PARENT:
      return {
        ...state,
      }
    case LOV_USER:
      return {
        ...state,
      }
    case LOV_DIV:
      return {
        ...state,
      }
    case LOV_MENU:
      return {
        ...state,
      }
    case MSG_LOV:
      return {
        ...state,
        resp: action.payload,
      }
    default:
      return state
  }
}

export default getLovData