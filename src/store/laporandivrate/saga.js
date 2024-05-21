import { call, put, takeEvery } from "redux-saga/effects"

import {
  DOWNLOAD_DIV_RATE,
  GET_DEPT_DIV_RATE,
  GET_LAPORAN_DIV_RATE, GET_LOCATION_DIV_RATE
} from "./actionTypes"
import {
  respDownload,
  respGetDeptDivRate,
  respGetLaporanDivRate, respGetLocationDivRate
} from "./actions"

import {
  downloadDivRate,
  getDeptAllDataBE,
  getLaporanAllDataBE,
  getLaporanDivRateBE,
  getLocationAllDataBE
} from "helpers/backend_helper"

function* fetchGetLaporanDivRate({ payload: req }) {
  try {
    const response = yield call(getLaporanDivRateBE, req)
    if (response.status == 1) {
      yield put(respGetLaporanDivRate(response))
    } else {
      yield put(respGetLaporanDivRate(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLaporanDivRate({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetLocationDivRate({ payload: req }) {
  try {
    const response = yield call(getLocationAllDataBE, req)
    if (response.status == 1) {
      yield put(respGetLocationDivRate(response))
    } else {
      yield put(respGetLocationDivRate(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLocationDivRate({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetDeptDivRate({ payload: req }) {
  try {
    const response = yield call(getDeptAllDataBE, req)
    if (response.status == 1) {
      yield put(respGetDeptDivRate(response))
    } else {
      yield put(respGetDeptDivRate(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDeptDivRate({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchdownloadExcelDivRate({ payload: req }) {
  try {
    yield put(respDownload(''))
    const response = yield call(downloadDivRate, req)
    if (response === undefined) {
      yield put(respDownload('Success'))
    }
  } catch (error) {
    console.log(error);
  }
}

function* laporanDivRateSaga() {

  yield takeEvery(GET_LAPORAN_DIV_RATE, fetchGetLaporanDivRate)
  yield takeEvery(GET_LOCATION_DIV_RATE, fetchGetLocationDivRate)
  yield takeEvery(GET_DEPT_DIV_RATE, fetchGetDeptDivRate)
  yield takeEvery(DOWNLOAD_DIV_RATE, fetchdownloadExcelDivRate)

}

export default laporanDivRateSaga