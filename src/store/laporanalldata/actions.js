import {
  DOWNLOAD_ALL_DATA,
  GET_DEPT_ALL_DATA,
  GET_LAPORAN_ALL_DATA,
  GET_LOCATION_ALL_DATA,
  RESET_MESSAGE,
  RESP_DOWNLOAD,
  RESP_GET_DEPT_ALL_DATA,
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

export const getDeptAllData = (req) => ({
  type: GET_DEPT_ALL_DATA,
  payload: req,
})

export const respGetDeptAllData = resp => ({
  type: RESP_GET_DEPT_ALL_DATA,
  payload: resp,
})

export const downloadAllDataAction = req => ({
  type: DOWNLOAD_ALL_DATA,
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