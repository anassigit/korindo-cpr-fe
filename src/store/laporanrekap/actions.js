import {
  DOWNLOAD_REKAP,
  GET_DEPT_REKAP,
  GET_LAPORAN_REKAP,
  GET_LOCATION_REKAP,
  RESET_MESSAGE,
  RESP_DOWNLOAD,
  RESP_GET_DEPT_REKAP,
  RESP_GET_LAPORAN_REKAP,
  RESP_GET_LOCATION_REKAP
} from "./actionTypes"

export const getLaporanRekap = (req) => ({
  type: GET_LAPORAN_REKAP,
  payload: req,
})

export const respGetLaporanRekap = resp => ({
  type: RESP_GET_LAPORAN_REKAP,
  payload: resp,
})

export const getLocationRekap = (req) => ({
  type: GET_LOCATION_REKAP,
  payload: req,
})

export const respGetLocationRekap = resp => ({
  type: RESP_GET_LOCATION_REKAP,
  payload: resp,
})

export const getDeptRekap = (req) => ({
  type: GET_DEPT_REKAP,
  payload: req,
})

export const respGetDeptRekap = resp => ({
  type: RESP_GET_DEPT_REKAP,
  payload: resp,
})

export const downloadRekapAction = req => ({
  type: DOWNLOAD_REKAP,
  payload: req,
})

export const respDownload = resp => ({
  type: RESP_DOWNLOAD,
  payload: resp,
})

export const resetMessage = resp => ({
  type: RESET_MESSAGE,
  payload: resp,
})