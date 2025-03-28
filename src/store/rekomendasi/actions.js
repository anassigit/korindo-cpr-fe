import {
  ADD_RECOMMEND,
  DELETE_RECOMMEND,
  EDIT_RECOMMEND,
  GET_DEPT,
  GET_MEMBER_LIST,
  GET_RECOMMEND,
  GET_RECOMMEND_LIST,
  GET_SEARCH,
  GET_STICKER_LIST,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_DEPT,
  RESP_GET_MEMBER_LIST,
  RESP_GET_RECOMMEND,
  RESP_GET_RECOMMEND_LIST,
  RESP_GET_SEARCH,
  RESP_GET_STICKER_LIST,
  SUBMIT_RECOMMEND
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

export const getRecommendData = (req) => ({
  type: GET_RECOMMEND,
  payload: req,
})

export const respGetRecommend = resp => ({
  type: RESP_GET_RECOMMEND,
  payload: resp,
})

export const getStickerListData = (req) => ({
  type: GET_STICKER_LIST,
  payload: req,
})

export const respGetStickerList = resp => ({
  type: RESP_GET_STICKER_LIST,
  payload: resp,
})

export const addRecommend = resp => ({
  type: ADD_RECOMMEND,
  payload: resp,
})

export const editRecommend = resp => ({
  type: EDIT_RECOMMEND,
  payload: resp,
})

export const deleteRecommend = resp => ({
  type: DELETE_RECOMMEND,
  payload: resp,
})

export const submitRecommend = resp => ({
  type: SUBMIT_RECOMMEND,
  payload: resp,
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

export const resetMessage = (resp) => ({
  type: RESET_MESSAGE,
  payload: resp,
})