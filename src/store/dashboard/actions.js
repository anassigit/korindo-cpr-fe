import {
  GET_BEST_LIST,
  RESP_GET_BEST_LIST
} from "./actionTypes"

export const getBestListData = (req) => ({
  type: GET_BEST_LIST,
  payload: req,
})

export const respGetBestList = resp => ({
  type: RESP_GET_BEST_LIST,
  payload: resp,
})
