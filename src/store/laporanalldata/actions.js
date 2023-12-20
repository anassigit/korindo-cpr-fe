import {
  GET_LAPORAN_ALL_DATA,
  RESET_MESSAGE,
  RESP_GET_LAPORAN_ALL_DATA
} from "./actionTypes"

export const getLaporanAllData = (req) => ({
  type: GET_LAPORAN_ALL_DATA,
  payload: req,
})

export const respGetLaporanAllData = resp => ({
  type: RESP_GET_LAPORAN_ALL_DATA,
  payload: resp,
})

export const resetMessage = resp => ({
  type: RESET_MESSAGE,
  payload: resp,
})