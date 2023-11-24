import {
  LOV_CANDIDATE,
  LOV_DIV,
  LOV_LEVEL,
  LOV_MENU,
  LOV_MENU_PARENT,
  LOV_USER,
  MSG_LOV
} from "./actionTypes"

export const getCandidateLov = (resp) => ({
  type: LOV_CANDIDATE,
  payload: resp,
})

export const getLevelLov = (resp) => ({
  type: LOV_LEVEL,
  payload: resp,
})

export const msgLov = (resp) => ({
  type: MSG_LOV,
  payload: resp,
})




