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

export const getDeptData = (req) => ({
  type: GET_DEPT,
  payload: req,
})

export const respGetDept = resp => ({
  type: RESP_GET_DEPT,
  payload: resp,
})

export const getDetailDeptData = (req) => ({
  type: GET_DETAIL_DEPT,
  payload: req,
})

export const respGetDetailDept = resp => ({
  type: RESP_GET_DETAIL_DEPT,
  payload: resp,
})

export const getMemberListData = (req) => ({
  type: GET_MEMBER_LIST,
  payload: req,
})

export const respGetMemberList = resp => ({
  type: RESP_GET_MEMBER_LIST,
  payload: resp,
})

export const getMemberDetailData = (req) => ({
  type: GET_MEMBER_DETAIL,
  payload: req,
})

export const respGetMemberDetail = resp => ({
  type: RESP_GET_MEMBER_DETAIL,
  payload: resp,
})

export const getSearchData = (req) => ({
  type: GET_SEARCH,
  payload: req,
})

export const respGetSearch = resp => ({
  type: RESP_GET_SEARCH,
  payload: resp,
})

export const getServiceDeptData = (req) => ({
  type: GET_SERVICE_DEPT,
  payload: req,
})

export const respGetServiceDept = resp => ({
  type: RESP_GET_SERVICE_DEPT,
  payload: resp,
})

export const getServiceMemberData = (req) => ({
  type: GET_SERVICE_MEMBER,
  payload: req,
})

export const respGetServiceMember = resp => ({
  type: RESP_GET_SERVICE_MEMBER,
  payload: resp,
})

export const editServiceDept = resp => ({
  type: EDIT_SERVICE_DEPT,
  payload: resp,
})

export const editServiceMember = resp => ({
  type: EDIT_SERVICE_MEMBER,
  payload: resp,
})

export const msgEdit = resp => ({
  type: MSG_EDIT,
  payload: resp,
})

export const resetMessage = (resp) => ({
  type: RESET_MESSAGE,
  payload: resp,
})

export const resetMessageMemberDtl = (resp) => ({
  type: RESET_MESSAGE_MEMBER_DETAIL,
  payload: resp,
})
