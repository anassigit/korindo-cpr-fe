import {
  DELETE_POSITION,
  EDIT_POSITION,
  GET_POSITION2,
  GET_LIST_POSITION,
  GET_LIST_LOCATION3,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_POSITION2,
  RESP_GET_POSITION_LIST,
  RESP_GET_LOCATION_LIST3,
  SAVE_POSITION,
  GET_LIST_LEVEL2,
  RESP_GET_LEVEL_LIST2
} from "./actionTypes"

export const getPositionListDataAction = (req) => ({
  type: GET_LIST_POSITION,
  payload: req,
})

export const respGetPositionList = resp => ({
  type: RESP_GET_POSITION_LIST,
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

export const getLevelListDataAction2 = (req) => ({
  type: GET_LIST_LEVEL2,
  payload: req,
})

export const respGetLevelList2 = resp => ({
  type: RESP_GET_LEVEL_LIST2,
  payload: resp,
})

export const getPositionDataAction = (req) => ({
  type: GET_POSITION2,
  payload: req,
})

export const respGetPosition2 = resp => ({
  type: RESP_GET_POSITION2,
  payload: resp,
})

export const addPositionMaster = (req) => ({
  type: SAVE_POSITION,
  payload: req,
})

export const editPositionMaster = (req) => ({
  type: EDIT_POSITION,
  payload: req,
})

export const deletePositionMaster = (req) => ({
  type: DELETE_POSITION,
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