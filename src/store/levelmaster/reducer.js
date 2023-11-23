import {
  DELETE_LEVEL,
  EDIT_LEVEL,
  GET_LEVEL2,
  GET_LIST_LEVEL,
  GET_LIST_LOCATION3,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_LEVEL2,
  RESP_GET_LEVEL_LIST,
  RESP_GET_LOCATION_LIST3,
  SAVE_LEVEL
} from "./actionTypes"

const INIT_STATE = {
  respGetLevelList: {},
  respGetLocationList3: {},
  respGetLevel2: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
}

const levelMasterReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LIST_LEVEL:
      return {
        ...state,
      }
    case RESP_GET_LEVEL_LIST:
      return {
        ...state,
        respGetLevelList: action.payload,
      }
    case GET_LIST_LOCATION3:
      return {
        ...state,
      }
    case RESP_GET_LOCATION_LIST3:
      return {
        ...state,
        respGetLocationList3: action.payload,
      }
    case GET_LEVEL2:
      return {
        ...state,
      }
    case RESP_GET_LEVEL2:
      return {
        ...state,
        respGetLevel2: action.payload,
      }
    case SAVE_LEVEL:
      return {
        ...state,
      }
    case EDIT_LEVEL:
      return {
        ...state,
      }
    case DELETE_LEVEL:
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

export default levelMasterReducer