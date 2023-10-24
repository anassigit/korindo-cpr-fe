import {
  EDIT_SERVICE_DEPT,
  EDIT_SERVICE_MEMBER,
  GET_DEPT,
  GET_DETAIL_DEPT,
  GET_MEMBER_DETAIL,
  GET_MEMBER_LIST,
  GET_SEARCH,
  GET_SERVICE_DEPT,
  GET_SERVICE_MEMBER,
  MSG_EDIT,
  RESET_MESSAGE,
  RESET_MESSAGE_MEMBER_DETAIL,
  RESP_GET_DEPT,
  RESP_GET_DETAIL_DEPT,
  RESP_GET_MEMBER_DETAIL,
  RESP_GET_MEMBER_LIST,
  RESP_GET_SEARCH,
  RESP_GET_SERVICE_DEPT,
  RESP_GET_SERVICE_MEMBER
} from "./actionTypes"

const INIT_STATE = {
  respGetDept: {},
  respGetDetailDept: {},
  respGetMemberList: {},
  respGetMemberDetail: {},
  respGetSearch: {},
  getServiceMemberData: {},
  getServiceDeptData: {},
  respGetServiceMember: {},
  respGetServiceDept: {},
  msgEdit: '',
}

const rekomendasiReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_DEPT:
      return {
        ...state,
      }
    case RESP_GET_DEPT:
      return {
        ...state,
        respGetDept: action.payload,
      }
    case GET_DETAIL_DEPT:
      return {
        ...state,
      }
    case RESP_GET_DETAIL_DEPT:
      return {
        ...state,
        respGetDetailDept: action.payload,
      }
    case GET_MEMBER_LIST:
      return {
        ...state,
      }
    case RESP_GET_MEMBER_LIST:
      return {
        ...state,
        respGetMemberList: action.payload,
      }
    case GET_MEMBER_DETAIL:
      return {
        ...state,
      }
    case RESP_GET_MEMBER_DETAIL:
      return {
        ...state,
        respGetMemberDetail: action.payload,
      }
    case GET_SEARCH:
      return {
        ...state,
      }
    case RESP_GET_SEARCH:
      return {
        ...state,
        respGetSearch: action.payload,
      }
    case GET_SERVICE_MEMBER:
      return {
        ...state,
        getServiceMemberData: action.payload,
      }
    case GET_SERVICE_DEPT:
      return {
        ...state,
        getServiceDeptData: action.payload,
      }
    case RESP_GET_SERVICE_MEMBER:
      return {
        ...state,
        respGetServiceMember: action.payload,
      }
    case RESP_GET_SERVICE_DEPT:
      return {
        ...state,
        respGetServiceDept: action.payload,
      }
    case RESET_MESSAGE_MEMBER_DETAIL:
      return {
        ...state,
        respGetMemberDetail: {},
      }
    case EDIT_SERVICE_DEPT:
      return {
        ...state,
      }
    case EDIT_SERVICE_MEMBER:
      return {
        ...state,
      }
    case MSG_EDIT:
      return {
        ...state,
        msgEdit: action.payload,
      }
    case RESET_MESSAGE:
      return {
        ...state,
        respGetDept: {},
        respGetDetailDept: {},
        respGetMemberList: {},
        respGetMemberDetail: {},
        respGetSearch: {},
        getServiceMemberData: {},
        getServiceDeptData: {},
        respGetServiceMember: {},
        respGetServiceDept: {},
        msgEdit: '',
      }
    default:
      return state
  }
}

export default rekomendasiReducer