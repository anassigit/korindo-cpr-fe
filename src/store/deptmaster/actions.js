import {
  GET_LIST,
  GET_LIST_DEPT,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_DEPT_LIST,
} from "./actionTypes"

export const getDeptListDataAction = (req) => ({
  type: GET_LIST_DEPT,
  payload: req,
})

export const respGetDeptList = resp => ({
  type: RESP_GET_DEPT_LIST,
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

export const resetMessage = resp => ({
  type: RESET_MESSAGE,
  payload: resp,
})