import {
  GET_DEPT_LIST_ORG,
  GET_ORGANIZATION_LIST,
  MSG_ADD,
  RESET_MESSAGE,
  RESP_GET_DEPT_LIST_ORG,
  RESP_GET_ORGANIZATION_LIST,
  SAVE_MAPPING_DEPT
} from "./actionTypes"

const INIT_STATE = {
  respGetDeptListOrg: {},
  respGetOrganizationList: {},
  msgAdd: '',
}

const organizationReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_DEPT_LIST_ORG:
      return {
        ...state,
      }
    case RESP_GET_DEPT_LIST_ORG:
      return {
        ...state,
        respGetDeptListOrg: action.payload,
      }
    case GET_ORGANIZATION_LIST:
      return {
        ...state,
      }
    case RESP_GET_ORGANIZATION_LIST:
      return {
        ...state,
        respGetOrganizationList: action.payload,
      }
    case SAVE_MAPPING_DEPT:
      return {
        ...state,
      }
    case MSG_ADD:
      return {
        ...state,
        msgAdd: action.payload,
      }
    case RESET_MESSAGE:
      return {
        ...state,
        msgAdd: '',
      }
    default:
      return state
  }
}

export default organizationReducer