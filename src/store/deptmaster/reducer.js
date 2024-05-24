<<<<<<< HEAD
import {
  DELETE_DEPT,
  EDIT_DEPT,
  GET_DEPT2,
  GET_LIST_DEPT,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_DEPT2,
  RESP_GET_DEPT_LIST,
  SAVE_DEPT
} from "./actionTypes"

const INIT_STATE = {
  respGetDeptList: {},
  respGetDept2: {},
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
    case GET_DEPT2:
      return {
        ...state,
      }
    case RESP_GET_DEPT2:
      return {
        ...state,
        respGetDept2: action.payload,
      }
    case SAVE_DEPT:
      return {
        ...state,
      }
    case EDIT_DEPT:
      return {
        ...state,
      }
    case DELETE_DEPT:
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
  DELETE_DEPT,
  EDIT_DEPT,
  GET_DEPT2,
  GET_LIST_DEPT,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_DEPT2,
  RESP_GET_DEPT_LIST,
  SAVE_DEPT
} from "./actionTypes"

const INIT_STATE = {
  respGetDeptList: {},
  respGetDept2: {},
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
    case GET_DEPT2:
      return {
        ...state,
      }
    case RESP_GET_DEPT2:
      return {
        ...state,
        respGetDept2: action.payload,
      }
    case SAVE_DEPT:
      return {
        ...state,
      }
    case EDIT_DEPT:
      return {
        ...state,
      }
    case DELETE_DEPT:
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
export default deptMasterReducer