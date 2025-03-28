import {
  DELETE_POSITION,
  EDIT_POSITION,
  GET_POSITION2,
  GET_LIST_POSITION,
  GET_LIST_LOCATION3,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_POSITION2,
  RESP_GET_POSITION_LIST,
  RESP_GET_LOCATION_LIST3,
  SAVE_POSITION,
  GET_LIST_LEVEL2,
  RESP_GET_LEVEL_LIST2
} from "./actionTypes"

const INIT_STATE = {
  respGetPositionList: {},
  respGetLocationList3: {},
  respGetLevelList2: {},
  respGetPosition2: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
}

const positionMasterReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LIST_POSITION:
      return {
        ...state,
      }
    case RESP_GET_POSITION_LIST:
      return {
        ...state,
        respGetPositionList: action.payload,
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
    case GET_LIST_LEVEL2:
      return {
        ...state,
      }
    case RESP_GET_LEVEL_LIST2:
      return {
        ...state,
        respGetLevelList2: action.payload,
      }
    case GET_POSITION2:
      return {
        ...state,
      }
    case RESP_GET_POSITION2:
      return {
        ...state,
        respGetPosition2: action.payload,
      }
    case SAVE_POSITION:
      return {
        ...state,
      }
    case EDIT_POSITION:
      return {
        ...state,
      }
    case DELETE_POSITION:
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

export default positionMasterReducer