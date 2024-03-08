import {
  GET_MENU,
  RESP_GET_MENU
} from "./actionTypes"

export const getMenuData = (req) => ({
  type: GET_MENU,
  payload: req,
})

export const respGetMenu = resp => ({
  type: RESP_GET_MENU,
  payload: resp,
})