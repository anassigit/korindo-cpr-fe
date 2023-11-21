import {
  GET_LIST,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_LIST
} from "./actionTypes"

const INIT_STATE = {
  respGetList: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
}

const locationMasterReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
      }
    case RESP_GET_LIST:
      return {
        ...state,
        respGetList: action.payload,
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