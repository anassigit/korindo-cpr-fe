import { call, put, takeEvery } from "redux-saga/effects"

import {
  DOWNLOAD_ALL_DATA,
  GET_DEPT_ALL_DATA,
  GET_LAPORAN_ALL_DATA, GET_LOCATION_ALL_DATA
} from "./actionTypes"
import {
  respGetDeptAllData,
  respGetLaporanAllData, respGetLocationAllData
} from "./actions"

import {
  downloadAllData,
  getDeptAllDataBE,
  getLaporanAllDataBE, getLocationAllDataBE
} from "helpers/backend_helper"

function* fetchGetLaporanAllData({ payload: req }) {
  try {
    const response = yield call(getLaporanAllDataBE, req)
    if (response.status == 1) {
      yield put(respGetLaporanAllData(response))
    } else {
      yield put(respGetLaporanAllData(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLaporanAllData({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetLocationAllData({ payload: req }) {
  try {
    const response = yield call(getLocationAllDataBE, req)
    if (response.status == 1) {
      yield put(respGetLocationAllData(response))
    } else {
      yield put(respGetLocationAllData(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLocationAllData({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetDeptAllData({ payload: req }) {
  try {
    const response = yield call(getDeptAllDataBE, req)
    if (response.status == 1) {
      yield put(respGetDeptAllData(response))
    } else {
      yield put(respGetDeptAllData(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDeptAllData({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchdownloadExcelAllData({ payload: req }) {
  try {
    yield call(downloadAllData, req)
  } catch (error) {
    console.log(error);
  }
}

function* laporanAllDataSaga() {

  yield takeEvery(GET_LAPORAN_ALL_DATA, fetchGetLaporanAllData)
  yield takeEvery(GET_LOCATION_ALL_DATA, fetchGetLocationAllData)
  yield takeEvery(GET_DEPT_ALL_DATA, fetchGetDeptAllData)
  yield takeEvery(DOWNLOAD_ALL_DATA, fetchdownloadExcelAllData)

}

export default laporanAllDataSaga