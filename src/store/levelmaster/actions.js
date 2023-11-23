import {
  DELETE_LEVEL,
  EDIT_LEVEL,
  GET_LEVEL2,
  GET_LIST_LEVEL,
  GET_LIST_LOCATION3,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_LEVEL2,
  RESP_GET_LEVEL_LIST,
  RESP_GET_LOCATION_LIST3,
  SAVE_LEVEL
} from "./actionTypes"

export const getLevelListDataAction = (req) => ({
  type: GET_LIST_LEVEL,
  payload: req,
})

export const respGetLevelList = resp => ({
  type: RESP_GET_LEVEL_LIST,
  payload: resp,
})

export const getLocationListDataAction3 = (req) => ({
  type: GET_LIST_LOCATION3,
  payload: req,
})

export const respGetLocationList3 = resp => ({
  type: RESP_GET_LOCATION_LIST3,
  payload: resp,
})

export const getLevelDataAction = (req) => ({
  type: GET_LEVEL2,
  payload: req,
})

export const respGetLevel2 = resp => ({
  type: RESP_GET_LEVEL2,
  payload: resp,
})

export const addLevelMaster = (req) => ({
  type: SAVE_LEVEL,
  payload: req,
})

export const editLevelMaster = (req) => ({
  type: EDIT_LEVEL,
  payload: req,
})

export const deleteLevelMaster = (req) => ({
  type: DELETE_LEVEL,
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