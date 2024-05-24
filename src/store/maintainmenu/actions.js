<<<<<<< HEAD
import {
  DELETE_MENU,
  EDIT_MENU,
  GET_LIST_MENU,
  GET_MENU2,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_MENU2,
  RESP_GET_MENU_LIST,
  SAVE_MENU
} from "./actionTypes"

export const getMenuListDataAction = (req) => ({
  type: GET_LIST_MENU,
  payload: req,
})

export const respGetMenuList = resp => ({
  type: RESP_GET_MENU_LIST,
  payload: resp,
})

export const getMenuDataAction = (req) => ({
  type: GET_MENU2,
  payload: req,
})

export const respGetMenu2 = resp => ({
  type: RESP_GET_MENU2,
  payload: resp,
})

export const addMaintainMenu = (req) => ({
  type: SAVE_MENU,
  payload: req,
})

export const editMaintainMenu = (req) => ({
  type: EDIT_MENU,
  payload: req,
})

export const deleteMaintainMenu = (req) => ({
  type: DELETE_MENU,
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
=======
import {
  DELETE_MENU,
  EDIT_MENU,
  GET_LIST_MENU,
  GET_MENU2,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_MENU2,
  RESP_GET_MENU_LIST,
  SAVE_MENU
} from "./actionTypes"

export const getMenuListDataAction = (req) => ({
  type: GET_LIST_MENU,
  payload: req,
})

export const respGetMenuList = resp => ({
  type: RESP_GET_MENU_LIST,
  payload: resp,
})

export const getMenuDataAction = (req) => ({
  type: GET_MENU2,
  payload: req,
})

export const respGetMenu2 = resp => ({
  type: RESP_GET_MENU2,
  payload: resp,
})

export const addMaintainMenu = (req) => ({
  type: SAVE_MENU,
  payload: req,
})

export const editMaintainMenu = (req) => ({
  type: EDIT_MENU,
  payload: req,
})

export const deleteMaintainMenu = (req) => ({
  type: DELETE_MENU,
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
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
})