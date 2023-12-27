import {
  DELETE_REPORT,
  EDIT_REPORT,
  GET_LIST_REPORT2,
  GET_STATUS_REPORT,
  GET_REPORT2,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_STATUS_REPORT,
  RESP_GET_REPORT2,
  RESP_GET_REPORT_LIST2,
  SAVE_REPORT
} from "./actionTypes"

export const getReportListDataAction = (req) => ({
  type: GET_LIST_REPORT2,
  payload: req,
})

export const respGetReportList2 = resp => ({
  type: RESP_GET_REPORT_LIST2,
  payload: resp,
})

export const getStatusReport = (req) => ({
  type: GET_STATUS_REPORT,
  payload: req,
})

export const respGetStatusReport = resp => ({
  type: RESP_GET_STATUS_REPORT,
  payload: resp,
})

export const editMaintainReport = (req) => ({
  type: EDIT_REPORT,
  payload: req,
})

export const msgEdit = resp => ({
  type: MSG_EDIT,
  payload: resp,
})

export const resetMessage = resp => ({
  type: RESET_MESSAGE,
  payload: resp,
})