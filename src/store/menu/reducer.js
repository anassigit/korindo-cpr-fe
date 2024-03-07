import {
  GET_MENU,
  GET_PROJECT_LIST,
  MSGADD,
  RESET_MESSAGE,
  RESP_GET_MENU,
  RESP_GET_PROJECT_LIST
} from "./actionTypes"

const INIT_STATE = {
  msgAdd: "",
  respGetMenu: {},
  respGetProjectLst: {},
}

const menuReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case MSGADD:
      return {
        ...state,
        msgAdd:action.payload,
    }
    case RESET_MESSAGE:
      return {
        ...state,
        msgAdd: "",
        // msgEdit: "",
        // msgDelete: "",
      }
    case GET_MENU:
      return {
        ...state,
      }
    case RESP_GET_MENU:
      return {
        ...state,
        respGetMenu: action.payload,
      }
    case GET_PROJECT_LIST:
      return {
        ...state,
      }
    case RESP_GET_PROJECT_LIST:
      return {
        ...state,
        respGetProjectLst: action.payload,
      }
    default:
      return state
  }
}

export default menuReducer