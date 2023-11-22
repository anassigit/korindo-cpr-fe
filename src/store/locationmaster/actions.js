import {
  DELETE_LOCATION,
  EDIT_LOCATION,
  GET_LOCATION2,
  GET_LIST_LOCATION,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_LOCATION2,
  RESP_GET_LOCATION_LIST,
  SAVE_LOCATION
} from "./actionTypes"

export const getLocationListDataAction = (req) => ({
  type: GET_LIST_LOCATION,
  payload: req,
})

export const respGetLocationList = resp => ({
  type: RESP_GET_LOCATION_LIST,
  payload: resp,
})

export const getLocationDataAction = (req) => ({
  type: GET_LOCATION2,
  payload: req,
})

export const respGetLocation2 = resp => ({
  type: RESP_GET_LOCATION2,
  payload: resp,
})

export const addLocationMaster = (req) => ({
  type: SAVE_LOCATION,
  payload: req,
})

export const editLocationMaster = (req) => ({
  type: EDIT_LOCATION,
  payload: req,
})

export const deleteLocationMaster = (req) => ({
  type: DELETE_LOCATION,
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