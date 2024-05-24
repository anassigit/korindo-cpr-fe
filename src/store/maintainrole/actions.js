import {
  DELETE_APPLICATION_ROLE_ACCESS,
  DELETE_APPLICATION_ROLE_USER,
  DELETE_ROLE,
  EDIT_APPLICATION_ROLE_ACCESS,
  EDIT_APPLICATION_ROLE_USER,
  EDIT_ROLE,
  GET_ACCESS_LIST_ROLE,
  GET_ACCESS_ROLE,
  GET_LIST_ROLE,
  GET_ROLE,
  GET_USER_LIST_ROLE,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_ACCESS_LIST_ROLE,
  RESP_GET_ACCESS_ROLE,
  RESP_GET_ROLE,
  RESP_GET_ROLE_LIST,
  RESP_GET_USER_LIST_ROLE,
  SAVE_APPLICATION_ROLE_ACCESS,
  SAVE_APPLICATION_ROLE_USER,
  SAVE_ROLE
} from "./actionTypes"

export const getRoleListDataAction = (req) => ({
  type: GET_LIST_ROLE,
  payload: req,
})

export const respGetRoleList = resp => ({
  type: RESP_GET_ROLE_LIST,
  payload: resp,
})

export const getAccessListDataAction = (req) => ({
  type: GET_ACCESS_LIST_ROLE,
  payload: req,
})

export const respGetAccessList = resp => ({
  type: RESP_GET_ACCESS_LIST_ROLE,
  payload: resp,
})

export const getUserRoleListDataAction = (req) => ({
  type: GET_USER_LIST_ROLE,
  payload: req,
})

export const respGetUserRoleList = resp => ({
  type: RESP_GET_USER_LIST_ROLE,
  payload: resp,
})

export const getRoleDataAction = (req) => ({
  type: GET_ROLE,
  payload: req,
})

export const respGetRole = resp => ({
  type: RESP_GET_ROLE,
  payload: resp,
})

export const getAccessRoleDataAction = (req) => ({
  type: GET_ACCESS_ROLE,
  payload: req,
})

export const respGetAccessRole = resp => ({
  type: RESP_GET_ACCESS_ROLE,
  payload: resp,
})

export const addRole = (req) => ({
  type: SAVE_ROLE,
  payload: req,
})

export const addApplicationRoleAccess = (req) => ({
  type: SAVE_APPLICATION_ROLE_ACCESS,
  payload: req,
})

export const addApplicationRoleUser = (req) => ({
  type: SAVE_APPLICATION_ROLE_USER,
  payload: req,
})

export const editRole = (req) => ({
  type: EDIT_ROLE,
  payload: req,
})

export const editApplicationRoleAccess = (req) => ({
  type: EDIT_APPLICATION_ROLE_ACCESS,
  payload: req,
})

export const editApplicationRoleUser = (req) => ({
  type: EDIT_APPLICATION_ROLE_USER,
  payload: req,
})

export const deleteRole = (req) => ({
  type: DELETE_ROLE,
  payload: req,
})

export const deleteApplicationRoleAccess = (req) => ({
  type: DELETE_APPLICATION_ROLE_ACCESS,
  payload: req,
})

export const deleteApplicationRoleUser = (req) => ({
  type: DELETE_APPLICATION_ROLE_USER,
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