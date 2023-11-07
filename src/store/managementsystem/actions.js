import {
  GET_LIST,
  RESP_GET_LIST
} from "./actionTypes"

export const getListData = (req) => ({
  type: GET_LIST,
  payload: req,
})

export const respGetList = resp => ({
  type: RESP_GET_LIST,
  payload: resp,
})