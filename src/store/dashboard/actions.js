import {
  GET_BEST_LIST,
  GET_BEST_OF_MONTH_LIST,
  RESP_GET_BEST_LIST,
  RESP_GET_BEST_OF_MONTH_LIST
} from "./actionTypes"

export const getBestListData = (req) => ({
  type: GET_BEST_LIST,
  payload: req,
})

export const respGetBestList = resp => ({
  type: RESP_GET_BEST_LIST,
  payload: resp,
})

export const getBestOfMonthListData = (req) => ({
  type: GET_BEST_OF_MONTH_LIST,
  payload: req,
})

export const respGetBestOfMonthList = resp => ({
  type: RESP_GET_BEST_OF_MONTH_LIST,
  payload: resp,
})
