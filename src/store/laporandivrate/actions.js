<<<<<<< HEAD
import {
  DOWNLOAD_DIV_RATE,
  GET_DEPT_DIV_RATE,
  GET_LAPORAN_DIV_RATE,
  GET_LOCATION_DIV_RATE,
  RESET_MESSAGE,
  RESP_DOWNLOAD,
  RESP_GET_DEPT_DIV_RATE,
  RESP_GET_LAPORAN_DIV_RATE,
  RESP_GET_LOCATION_DIV_RATE
} from "./actionTypes"

export const getLaporanDivRate = (req) => ({
  type: GET_LAPORAN_DIV_RATE,
  payload: req,
})

export const respGetLaporanDivRate = resp => ({
  type: RESP_GET_LAPORAN_DIV_RATE,
  payload: resp,
})

export const getLocationDivRate = (req) => ({
  type: GET_LOCATION_DIV_RATE,
  payload: req,
})

export const respGetLocationDivRate = resp => ({
  type: RESP_GET_LOCATION_DIV_RATE,
  payload: resp,
})

export const getDeptDivRate = (req) => ({
  type: GET_DEPT_DIV_RATE,
  payload: req,
})

export const respGetDeptDivRate = resp => ({
  type: RESP_GET_DEPT_DIV_RATE,
  payload: resp,
})

export const downloadDivRateAction = req => ({
  type: DOWNLOAD_DIV_RATE,
  payload: req,
})

export const respDownload = resp => ({
  type: RESP_DOWNLOAD,
  payload: resp,
})

export const resetMessage = resp => ({
  type: RESET_MESSAGE,
  payload: resp,
=======
import {
  DOWNLOAD_DIV_RATE,
  GET_DEPT_DIV_RATE,
  GET_LAPORAN_DIV_RATE,
  GET_LOCATION_DIV_RATE,
  RESET_MESSAGE,
  RESP_DOWNLOAD,
  RESP_GET_DEPT_DIV_RATE,
  RESP_GET_LAPORAN_DIV_RATE,
  RESP_GET_LOCATION_DIV_RATE
} from "./actionTypes"

export const getLaporanDivRate = (req) => ({
  type: GET_LAPORAN_DIV_RATE,
  payload: req,
})

export const respGetLaporanDivRate = resp => ({
  type: RESP_GET_LAPORAN_DIV_RATE,
  payload: resp,
})

export const getLocationDivRate = (req) => ({
  type: GET_LOCATION_DIV_RATE,
  payload: req,
})

export const respGetLocationDivRate = resp => ({
  type: RESP_GET_LOCATION_DIV_RATE,
  payload: resp,
})

export const getDeptDivRate = (req) => ({
  type: GET_DEPT_DIV_RATE,
  payload: req,
})

export const respGetDeptDivRate = resp => ({
  type: RESP_GET_DEPT_DIV_RATE,
  payload: resp,
})

export const downloadDivRateAction = req => ({
  type: DOWNLOAD_DIV_RATE,
  payload: req,
})

export const respDownload = resp => ({
  type: RESP_DOWNLOAD,
  payload: resp,
})

export const resetMessage = resp => ({
  type: RESET_MESSAGE,
  payload: resp,
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
})