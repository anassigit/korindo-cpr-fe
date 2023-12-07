import {
  DELETE_MAPPING_DEPT,
  EDIT_MAPPING_DEPT,
  GET_DEPT_LIST_ORG,
  GET_MEMBER_LIST_ORG,
  GET_ORGANIZATION_LIST,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_DEPT_LIST_ORG,
  RESP_GET_MEMBER_LIST_ORG,
  RESP_GET_ORGANIZATION_LIST,
  SAVE_MAPPING_DEPT
} from "./actionTypes"

const INIT_STATE = {
  respGetDeptListOrg: {},
  respGetOrganizationList: {},
  respGetMemberListOrg: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
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
    case GET_MEMBER_LIST_ORG:
      return {
        ...state,
      }
    case RESP_GET_MEMBER_LIST_ORG:
      return {
        ...state,
        respGetMemberListOrg: action.payload,
      }
    case SAVE_MAPPING_DEPT:
      return {
        ...state,
      }
    case EDIT_MAPPING_DEPT:
      return {
        ...state,
      }
    case DELETE_MAPPING_DEPT:
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

export default organizationReducer