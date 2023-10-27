import {
  GET_DEPT,
  GET_MEMBER_LIST,
  GET_RECOMMEND_LIST,
  GET_SEARCH,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_DEPT,
  RESP_GET_MEMBER_LIST,
  RESP_GET_RECOMMEND_LIST,
  RESP_GET_SEARCH
} from "./actionTypes"

export const getDeptData = (req) => ({
  type: GET_DEPT,
  payload: req,
})

export const respGetDept = resp => ({
  type: RESP_GET_DEPT,
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

export const getSearchData = (req) => ({
  type: GET_SEARCH,
  payload: req,
})

export const respGetSearch = resp => ({
  type: RESP_GET_SEARCH,
  payload: resp,
})

export const getRecommendListData = (req) => ({
  type: GET_RECOMMEND_LIST,
  payload: req,
})

export const respGetRecommendList = resp => ({
  type: RESP_GET_RECOMMEND_LIST,
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