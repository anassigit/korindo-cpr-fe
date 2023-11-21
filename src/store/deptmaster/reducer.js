import {
  GET_LIST_DEPT,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_DEPT_LIST,
} from "./actionTypes"

const INIT_STATE = {
  respGetDeptList: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
}

const deptMasterReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LIST_DEPT:
      return {
        ...state,
      }
    case RESP_GET_DEPT_LIST:
      return {
        ...state,
        respGetDeptList: action.payload,
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

export default deptMasterReducer