<<<<<<< HEAD
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
  RESP_GET_ACCESS_LIST_ROLE,
  GET_USER_LIST_ROLE,
  RESP_GET_USER_LIST_ROLE,
  SAVE_APPLICATION_ROLE_ACCESS,
  EDIT_APPLICATION_ROLE_ACCESS,
  DELETE_APPLICATION_ROLE_ACCESS,
  RESP_GET_ACCESS_ROLE,
  GET_ACCESS_ROLE,
  RESP_GET_MENU_ROLE_LIST,
  SAVE_APPLICATION_ROLE_USER,
  EDIT_APPLICATION_ROLE_USER,
  DELETE_APPLICATION_ROLE_USER,
  GET_MENU_ROLE_LIST
} from "./actionTypes"

const INIT_STATE = {
  respGetRoleList: {},
  respGetAccessList: {},
  respGetUserRoleList: {},
  respGetAccessRole: {},
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
    case GET_USER_LIST_ROLE:
      return {
        ...state,
      }
    case RESP_GET_USER_LIST_ROLE:
      return {
        ...state,
        respGetUserRoleList: action.payload,
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
    case GET_ACCESS_ROLE:
      return {
        ...state,
      }
    case RESP_GET_ACCESS_ROLE:
      return {
        ...state,
        respGetAccessRole: action.payload,
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
    case SAVE_APPLICATION_ROLE_ACCESS:
      return {
        ...state,
      }
    case EDIT_APPLICATION_ROLE_ACCESS:
      return {
        ...state,
      }
    case DELETE_APPLICATION_ROLE_ACCESS:
      return {
        ...state,
      }
    case SAVE_APPLICATION_ROLE_USER:
      return {
        ...state,
      }
    case EDIT_APPLICATION_ROLE_USER:
      return {
        ...state,
      }
    case DELETE_APPLICATION_ROLE_USER:
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

=======
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
  RESP_GET_ACCESS_LIST_ROLE,
  GET_USER_LIST_ROLE,
  RESP_GET_USER_LIST_ROLE,
  SAVE_APPLICATION_ROLE_ACCESS,
  EDIT_APPLICATION_ROLE_ACCESS,
  DELETE_APPLICATION_ROLE_ACCESS,
  RESP_GET_ACCESS_ROLE,
  GET_ACCESS_ROLE,
  RESP_GET_MENU_ROLE_LIST,
  SAVE_APPLICATION_ROLE_USER,
  EDIT_APPLICATION_ROLE_USER,
  DELETE_APPLICATION_ROLE_USER,
  GET_MENU_ROLE_LIST
} from "./actionTypes"

const INIT_STATE = {
  respGetRoleList: {},
  respGetAccessList: {},
  respGetUserRoleList: {},
  respGetAccessRole: {},
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
    case GET_USER_LIST_ROLE:
      return {
        ...state,
      }
    case RESP_GET_USER_LIST_ROLE:
      return {
        ...state,
        respGetUserRoleList: action.payload,
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
    case GET_ACCESS_ROLE:
      return {
        ...state,
      }
    case RESP_GET_ACCESS_ROLE:
      return {
        ...state,
        respGetAccessRole: action.payload,
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
    case SAVE_APPLICATION_ROLE_ACCESS:
      return {
        ...state,
      }
    case EDIT_APPLICATION_ROLE_ACCESS:
      return {
        ...state,
      }
    case DELETE_APPLICATION_ROLE_ACCESS:
      return {
        ...state,
      }
    case SAVE_APPLICATION_ROLE_USER:
      return {
        ...state,
      }
    case EDIT_APPLICATION_ROLE_USER:
      return {
        ...state,
      }
    case DELETE_APPLICATION_ROLE_USER:
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

>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
export default maintainRoleReducer