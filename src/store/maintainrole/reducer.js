import {
  DELETE_ROLE,
  EDIT_ROLE,
  GET_ROLE,
  GET_LIST_ROLE,
  GET_LIST_LOCATION3,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_ROLE,
  RESP_GET_ROLE_LIST,
  RESP_GET_LOCATION_LIST3,
  SAVE_ROLE,
  GET_LIST_LEVEL,
  RESP_GET_LEVEL_LIST,
  GET_ACCESS_LIST_ROLE,
  RESP_GET_ACCESS_LIST_ROLE
} from "./actionTypes"

const INIT_STATE = {
  respGetRoleList: {},
  respGetAccessList: {},
  respGetRole: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
}

const maintainRoleReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LIST_ROLE:
      return {
        ...state,
      }
    case RESP_GET_ROLE_LIST:
      return {
        ...state,
        respGetRoleList: action.payload,
      }
    case GET_ACCESS_LIST_ROLE:
      return {
        ...state,
      }
    case RESP_GET_ACCESS_LIST_ROLE:
      return {
        ...state,
        respGetAccessList: action.payload,
      }
    case GET_ROLE:
      return {
        ...state,
      }
    case RESP_GET_ROLE:
      return {
        ...state,
        respGetRole: action.payload,
      }
    case SAVE_ROLE:
      return {
        ...state,
      }
    case EDIT_ROLE:
      return {
        ...state,
      }
    case DELETE_ROLE:
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

export default maintainRoleReducer