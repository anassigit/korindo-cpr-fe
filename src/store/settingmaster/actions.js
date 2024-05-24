import {
  DELETE_SETTING,
  EDIT_SETTING,
  GET_SETTING2,
  GET_LIST_SETTING,
  GET_LIST_LOCATION3,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_SETTING2,
  RESP_GET_SETTING_LIST,
  RESP_GET_LOCATION_LIST3,
  SAVE_SETTING,
  GET_LIST_LEVEL2,
  RESP_GET_LEVEL_LIST2
} from "./actionTypes"

export const getSettingListDataAction = (req) => ({
  type: GET_LIST_SETTING,
  payload: req,
})

export const respGetSettingList = resp => ({
  type: RESP_GET_SETTING_LIST,
  payload: resp,
})

export const getSettingDataAction = (req) => ({
  type: GET_SETTING2,
  payload: req,
})

export const respGetSetting2 = resp => ({
  type: RESP_GET_SETTING2,
  payload: resp,
})

export const addSettingMaster = (req) => ({
  type: SAVE_SETTING,
  payload: req,
})

export const editSettingMaster = (req) => ({
  type: EDIT_SETTING,
  payload: req,
})

export const deleteSettingMaster = (req) => ({
  type: DELETE_SETTING,
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