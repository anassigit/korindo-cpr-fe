import {
  GET_MANUAL,
  RESP_GET_MANUAL
} from "./actionTypes"

export const getManualData = (req) => ({
  type: GET_MANUAL,
  payload: req,
})

export const respGetManual = resp => ({
  type: RESP_GET_MANUAL,
  payload: resp,
})
