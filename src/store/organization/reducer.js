<<<<<<< HEAD
import {
  DELETE_MAPPING_DEPT,
  DELETE_MAPPING_MEMBER,
  EDIT_MAPPING_DEPT,
  EDIT_MAPPING_MEMBER,
  GET_DEPT_LIST_ORG,
  GET_MEMBER_LIST_FOR_ADD,
  GET_MEMBER_LIST_ORG,
  GET_ORGANIZATION_LIST,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESET_SCORE_ORGANIZATION,
  RESP_GET_DEPT_LIST_ORG,
  RESP_GET_MEMBER_LIST_FOR_ADD,
  RESP_GET_MEMBER_LIST_ORG,
  RESP_GET_ORGANIZATION_LIST,
  RESP_RESET_SCORE_ORGANIZATION,
  SAVE_MAPPING_DEPT,
  SAVE_MAPPING_MEMBER
} from "./actionTypes"

const INIT_STATE = {
  respGetDeptListOrg: {},
  respGetOrganizationList: {},
  respGetMemberListOrg: {},
  respGetMemberListForAdd: {},
  respResetScoreOrganization: {},
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
    case GET_MEMBER_LIST_FOR_ADD:
      return {
        ...state,
      }
    case RESP_GET_MEMBER_LIST_FOR_ADD:
      return {
        ...state,
        respGetMemberListForAdd: action.payload,
      }
    case RESET_SCORE_ORGANIZATION:
      return {
        ...state,
      }
    case RESP_RESET_SCORE_ORGANIZATION:
      return {
        ...state,
        respResetScoreOrganization: action.payload,
      }
    case SAVE_MAPPING_DEPT:
      return {
        ...state,
      }
    case SAVE_MAPPING_MEMBER:
      return {
        ...state,
      }
    case EDIT_MAPPING_DEPT:
      return {
        ...state,
      }
    case EDIT_MAPPING_MEMBER:
      return {
        ...state,
      }
    case DELETE_MAPPING_DEPT:
      return {
        ...state,
      }
    case DELETE_MAPPING_MEMBER:
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
  DELETE_MAPPING_DEPT,
  DELETE_MAPPING_MEMBER,
  EDIT_MAPPING_DEPT,
  EDIT_MAPPING_MEMBER,
  GET_DEPT_LIST_ORG,
  GET_MEMBER_LIST_FOR_ADD,
  GET_MEMBER_LIST_ORG,
  GET_ORGANIZATION_LIST,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESET_SCORE_ORGANIZATION,
  RESP_GET_DEPT_LIST_ORG,
  RESP_GET_MEMBER_LIST_FOR_ADD,
  RESP_GET_MEMBER_LIST_ORG,
  RESP_GET_ORGANIZATION_LIST,
  RESP_RESET_SCORE_ORGANIZATION,
  SAVE_MAPPING_DEPT,
  SAVE_MAPPING_MEMBER
} from "./actionTypes"

const INIT_STATE = {
  respGetDeptListOrg: {},
  respGetOrganizationList: {},
  respGetMemberListOrg: {},
  respGetMemberListForAdd: {},
  respResetScoreOrganization: {},
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
    case GET_MEMBER_LIST_FOR_ADD:
      return {
        ...state,
      }
    case RESP_GET_MEMBER_LIST_FOR_ADD:
      return {
        ...state,
        respGetMemberListForAdd: action.payload,
      }
    case RESET_SCORE_ORGANIZATION:
      return {
        ...state,
      }
    case RESP_RESET_SCORE_ORGANIZATION:
      return {
        ...state,
        respResetScoreOrganization: action.payload,
      }
    case SAVE_MAPPING_DEPT:
      return {
        ...state,
      }
    case SAVE_MAPPING_MEMBER:
      return {
        ...state,
      }
    case EDIT_MAPPING_DEPT:
      return {
        ...state,
      }
    case EDIT_MAPPING_MEMBER:
      return {
        ...state,
      }
    case DELETE_MAPPING_DEPT:
      return {
        ...state,
      }
    case DELETE_MAPPING_MEMBER:
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
export default organizationReducer