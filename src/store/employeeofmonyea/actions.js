import {
  ADD_EMPLOYEE_OF,
  DELETE_EMPLOYEE_OF,
  EDIT_EMPLOYEE_OF,
  GET_CANDIDATE,
  GET_CANDIDATE_LIST,
  GET_KEYWORD_LIST,
  GET_LIST,
  GET_LOCATION_LIST,
  GET_YEAR_LIST,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_CANDIDATE,
  RESP_GET_CANDIDATE_LIST,
  RESP_GET_KEYWORD_LIST,
  RESP_GET_LIST,
  RESP_GET_LOCATION_LIST,
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

export const getCandidateData = (req) => ({
  type: GET_CANDIDATE,
  payload: req,
})

export const respGetCandidate = resp => ({
  type: RESP_GET_CANDIDATE,
  payload: resp,
})

export const getKeywordListData = (req) => ({
  type: GET_KEYWORD_LIST,
  payload: req,
})

export const respGetKeywordList = resp => ({
  type: RESP_GET_KEYWORD_LIST,
  payload: resp,
})

export const getLocationListData = (req) => ({
  type: GET_LOCATION_LIST,
  payload: req,
})

export const respGetLocationList = resp => ({
  type: RESP_GET_LOCATION_LIST,
  payload: resp,
})

export const addEmployeeOf = (req) => ({
  type: ADD_EMPLOYEE_OF,
  payload: req,
})

export const editEmployeeOf = (req) => ({
  type: EDIT_EMPLOYEE_OF,
  payload: req,
})

export const deleteEmployeeOf = (req) => ({
  type: DELETE_EMPLOYEE_OF,
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