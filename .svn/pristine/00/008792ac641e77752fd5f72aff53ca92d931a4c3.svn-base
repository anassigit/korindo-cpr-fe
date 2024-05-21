import {
  DELETE_MEMBER,
  EDIT_MEMBER,
  GET_MEMBER2,
  GET_LIST_MEMBER,
  GET_LIST_LOCATION5,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_MEMBER2,
  RESP_GET_MEMBER_LIST,
  RESP_GET_LOCATION_LIST5,
  SAVE_MEMBER
} from "./actionTypes"

const INIT_STATE = {
  respGetMemberList: {},
  respGetLocationList5: {},
  respGetMember2: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
}

const memberMasterReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LIST_MEMBER:
      return {
        ...state,
      }
    case RESP_GET_MEMBER_LIST:
      return {
        ...state,
        respGetMemberList: action.payload,
      }
    case GET_LIST_LOCATION5:
      return {
        ...state,
      }
    case RESP_GET_LOCATION_LIST5:
      return {
        ...state,
        respGetLocationList5: action.payload,
      }
    case GET_MEMBER2:
      return {
        ...state,
      }
    case RESP_GET_MEMBER2:
      return {
        ...state,
        respGetMember2: action.payload,
      }
    case SAVE_MEMBER:
      return {
        ...state,
      }
    case EDIT_MEMBER:
      return {
        ...state,
      }
    case DELETE_MEMBER:
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

export default memberMasterReducer