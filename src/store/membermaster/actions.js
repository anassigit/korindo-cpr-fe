import {
  DELETE_MEMBER,
  EDIT_MEMBER,
  GET_MEMBER2,
  GET_LIST_MEMBER,
  GET_LIST_LOCATION5,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_MEMBER2,
  RESP_GET_MEMBER_LIST,
  RESP_GET_LOCATION_LIST5,
  SAVE_MEMBER
} from "./actionTypes"

export const getMemberListDataAction = (req) => ({
  type: GET_LIST_MEMBER,
  payload: req,
})

export const respGetMemberList = resp => ({
  type: RESP_GET_MEMBER_LIST,
  payload: resp,
})

export const getLocationListDataAction5 = (req) => ({
  type: GET_LIST_LOCATION5,
  payload: req,
})

export const respGetLocationList5 = resp => ({
  type: RESP_GET_LOCATION_LIST5,
  payload: resp,
})

export const getMemberDataAction = (req) => ({
  type: GET_MEMBER2,
  payload: req,
})

export const respGetMember2 = resp => ({
  type: RESP_GET_MEMBER2,
  payload: resp,
})

export const addMemberMaster = (req) => ({
  type: SAVE_MEMBER,
  payload: req,
})

export const editMemberMaster = (req) => ({
  type: EDIT_MEMBER,
  payload: req,
})

export const deleteMemberMaster = (req) => ({
  type: DELETE_MEMBER,
  payload: req,
})

export const msgAdd = resp => ({
  type: MSG_ADD,
  payload: resp,
})

export const msgEdit = resp => ({
  type: MSG_EDIT,
  payload: resp,
})

export const msgDelete = resp => ({
  type: MSG_DELETE,
  payload: resp,
})

export const resetMessage = resp => ({
  type: RESET_MESSAGE,
  payload: resp,
})