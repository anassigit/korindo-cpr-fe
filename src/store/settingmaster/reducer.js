import {
  DELETE_SETTING,
  EDIT_SETTING,
  GET_SETTING2,
  GET_LIST_SETTING,
  GET_LIST_LOCATION3,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_SETTING2,
  RESP_GET_SETTING_LIST,
  RESP_GET_LOCATION_LIST3,
  SAVE_SETTING,
  GET_LIST_LEVEL2,
  RESP_GET_LEVEL_LIST2
} from "./actionTypes"

const INIT_STATE = {
  respGetSettingList: {},
  respGetSetting2: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
}

const settingMasterReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LIST_SETTING:
      return {
        ...state,
      }
    case RESP_GET_SETTING_LIST:
      return {
        ...state,
        respGetSettingList: action.payload,
      }
    case GET_SETTING2:
      return {
        ...state,
      }
    case RESP_GET_SETTING2:
      return {
        ...state,
        respGetSetting2: action.payload,
      }
    case SAVE_SETTING:
      return {
        ...state,
      }
    case EDIT_SETTING:
      return {
        ...state,
      }
    case DELETE_SETTING:
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

export default settingMasterReducer