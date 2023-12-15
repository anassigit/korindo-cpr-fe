import {
  GET_SEND_DETAIL,
  RESP_GET_SEND_DETAIL
} from "./actionTypes"

export const getHistoryPemberianData = (req) => ({
  type: GET_SEND_DETAIL,
  payload: req,
})

export const respGetHistoryPemberian = resp => ({
  type: RESP_GET_SEND_DETAIL,
  payload: resp,
})
