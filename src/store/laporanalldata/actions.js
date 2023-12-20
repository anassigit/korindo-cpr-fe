import {
  GET_LAPORAN_ALL_DATA,
  GET_LOCATION_ALL_DATA,
  RESET_MESSAGE,
  RESP_GET_LAPORAN_ALL_DATA,
  RESP_GET_LOCATION_ALL_DATA
} from "./actionTypes"

export const getLaporanAllData = (req) => ({
  type: GET_LAPORAN_ALL_DATA,
  payload: req,
})

export const respGetLaporanAllData = resp => ({
  type: RESP_GET_LAPORAN_ALL_DATA,
  payload: resp,
})

export const getLocationAllData = (req) => ({
  type: GET_LOCATION_ALL_DATA,
  payload: req,
})

export const respGetLocationAllData = resp => ({
  type: RESP_GET_LOCATION_ALL_DATA,
  payload: resp,
})

export const resetMessage = resp => ({
  type: RESET_MESSAGE,
  payload: resp,
})