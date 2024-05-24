<<<<<<< HEAD
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
=======
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
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
})