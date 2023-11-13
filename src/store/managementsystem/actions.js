import {
  ADD_EMPLOYEE_OF,
  GET_CANDIDATE_LIST,
  GET_LIST,
  GET_YEAR_LIST,
  MSG_ADD,
  RESET_MESSAGE,
  RESP_GET_CANDIDATE_LIST,
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

export const getCandidateListData = (req) => ({
  type: GET_CANDIDATE_LIST,
  payload: req,
})

export const respGetCandidateList = resp => ({
  type: RESP_GET_CANDIDATE_LIST,
  payload: resp,
})

export const addEmployeeOf = (req) => ({
  type: ADD_EMPLOYEE_OF,
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