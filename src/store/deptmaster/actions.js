import {
  DELETE_DEPT,
  EDIT_DEPT,
  GET_DEPT2,
  GET_LIST_DEPT,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_DEPT2,
  RESP_GET_DEPT_LIST,
  SAVE_DEPT
} from "./actionTypes"

export const getDeptListDataAction = (req) => ({
  type: GET_LIST_DEPT,
  payload: req,
})

export const respGetDeptList = resp => ({
  type: RESP_GET_DEPT_LIST,
  payload: resp,
})

export const getDeptDataAction = (req) => ({
  type: GET_DEPT2,
  payload: req,
})

export const respGetDept2 = resp => ({
  type: RESP_GET_DEPT2,
  payload: resp,
})

export const addDeptMaster = (req) => ({
  type: SAVE_DEPT,
  payload: req,
})

export const editDeptMaster = (req) => ({
  type: EDIT_DEPT,
  payload: req,
})

export const deleteDeptMaster = (req) => ({
  type: DELETE_DEPT,
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