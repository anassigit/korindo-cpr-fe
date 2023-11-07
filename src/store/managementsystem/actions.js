import {
  GET_LIST,
  GET_YEAR_LIST,
  RESP_GET_LIST,
  RESP_GET_YEAR_LIST
} from "./actionTypes"

export const getListData = (req) => ({
  type: GET_LIST,
  payload: req,
})

export const respGetList = resp => ({
  type: RESP_GET_LIST,
  payload: resp,
})

export const getYearListData = (req) => ({
  type: GET_YEAR_LIST,
  payload: req,
})

export const respGetYearList = resp => ({
  type: RESP_GET_YEAR_LIST,
  payload: resp,
})