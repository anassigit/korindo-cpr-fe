import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_LAPORAN_ALL_DATA
} from "./actionTypes"
import {
  respGetLaporanAllData
} from "./actions"

import {
  getLaporanAllDataBE
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

function* laporanAllDataSaga() {

  yield takeEvery(GET_LAPORAN_ALL_DATA, fetchGetLaporanAllData)

}

export default laporanAllDataSaga