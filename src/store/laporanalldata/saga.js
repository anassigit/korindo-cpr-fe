import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_LAPORAN_ALL_DATA, GET_LOCATION_ALL_DATA
} from "./actionTypes"
import {
  respGetLaporanAllData, respGetLocationAllData
} from "./actions"

import {
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

function* laporanAllDataSaga() {

  yield takeEvery(GET_LAPORAN_ALL_DATA, fetchGetLaporanAllData)
  yield takeEvery(GET_LOCATION_ALL_DATA, fetchGetLocationAllData)

}

export default laporanAllDataSaga