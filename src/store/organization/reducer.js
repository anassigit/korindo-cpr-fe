import {
  GET_DEPT_LIST_ORG,
  GET_ORGANIZATION_LIST,
  RESP_GET_DEPT_LIST_ORG,
  RESP_GET_ORGANIZATION_LIST
} from "./actionTypes"

const INIT_STATE = {
  respGetDeptListOrg: {},
  respGetOrganizationList: {},
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
    default:
      return state
  }
}

export default organizationReducer