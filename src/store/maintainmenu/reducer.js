import {
  DELETE_MENU,
  EDIT_MENU,
  GET_LIST_MENU,
  GET_MENU2,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_MENU2,
  RESP_GET_MENU_LIST,
  SAVE_MENU
} from "./actionTypes"

const INIT_STATE = {
  respGetMenuList: {},
  respGetMenu2: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
}

const maintainMenuReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LIST_MENU:
      return {
        ...state,
      }
    case RESP_GET_MENU_LIST:
      return {
        ...state,
        respGetMenuList: action.payload,
      }
    case GET_MENU2:
      return {
        ...state,
      }
    case RESP_GET_MENU2:
      return {
        ...state,
        respGetMenu2: action.payload,
      }
    case SAVE_MENU:
      return {
        ...state,
      }
    case EDIT_MENU:
      return {
        ...state,
      }
    case DELETE_MENU:
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
        msgAdd: '',
        msgEdit: '',
        msgDelete: '',
      }
    default:
      return state
  }
}

export default maintainMenuReducer