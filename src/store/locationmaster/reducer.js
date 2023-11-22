import {
  DELETE_LOCATION,
  EDIT_LOCATION,
  GET_LOCATION2,
  GET_LIST_LOCATION,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_LOCATION2,
  RESP_GET_LOCATION_LIST,
  SAVE_LOCATION
} from "./actionTypes"

const INIT_STATE = {
  respGetLocationList: {},
  respGetLocation2: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
}

const locationMasterReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LIST_LOCATION:
      return {
        ...state,
      }
    case RESP_GET_LOCATION_LIST:
      return {
        ...state,
        respGetLocationList: action.payload,
      }
    case GET_LOCATION2:
      return {
        ...state,
      }
    case RESP_GET_LOCATION2:
      return {
        ...state,
        respGetLocation2: action.payload,
      }
    case SAVE_LOCATION:
      return {
        ...state,
      }
    case EDIT_LOCATION:
      return {
        ...state,
      }
    case DELETE_LOCATION:
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

export default locationMasterReducer