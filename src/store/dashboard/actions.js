import {
  ADD_REPORT,
  GET_BEST_LIST,
  GET_BEST_OF_MONTH_LIST,
  GET_BEST_OF_YEAR_LIST,
  GET_DETAIL_INFLUENCER,
  GET_LIST1,
  GET_REPORT_LIST,
  MSG_ADD,
  RESET_MESSAGE,
  RESP_GET_BEST_LIST,
  RESP_GET_BEST_OF_MONTH_LIST,
  RESP_GET_BEST_OF_YEAR_LIST,
  RESP_GET_DETAIL_INFLUENCER,
  RESP_GET_LIST,
  RESP_GET_REPORT_LIST
} from "./actionTypes"

export const getListData = (req) => ({
  type: GET_LIST1,
  payload: req,
})

export const respGetList1 = resp => ({
  type: RESP_GET_LIST,
  payload: resp,
})

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

export const getBestOfYearListData = (req) => ({
  type: GET_BEST_OF_YEAR_LIST,
  payload: req,
})

export const respGetBestOfYearList = resp => ({
  type: RESP_GET_BEST_OF_YEAR_LIST,
  payload: resp,
})

export const getDetailInfluencerData = (req) => ({
  type: GET_DETAIL_INFLUENCER,
  payload: req,
})

export const respGetDetailInfluencer = resp => ({
  type: RESP_GET_DETAIL_INFLUENCER,
  payload: resp,
})

export const getReportListData = (req) => ({
  type: GET_REPORT_LIST,
  payload: req,
})

export const respGetReportList = resp => ({
  type: RESP_GET_REPORT_LIST,
  payload: resp,
})

export const addReport = (req) => ({
  type: ADD_REPORT,
  payload: req,
})

export const msgAdd = resp => ({
  type: MSG_ADD,
  payload: resp,
})

export const resetMessage = resp => ({
  type: RESET_MESSAGE,
  payload: resp,
})