<<<<<<< HEAD
import { call, put, takeEvery } from "redux-saga/effects"

import {
  DOWNLOAD_REKAP,
  GET_DEPT_REKAP,
  GET_LAPORAN_REKAP, GET_LOCATION_REKAP
} from "./actionTypes"
import {
  respDownload,
  respGetDeptRekap,
  respGetLaporanRekap, respGetLocationRekap
} from "./actions"

import {
  downloadRekap,
  getDeptAllDataBE,
  getDeptRekapBE,
  getLaporanRekapBE, getLocationAllDataBE, getLocationRekapBE
} from "helpers/backend_helper"

function* fetchGetLaporanRekap({ payload: req }) {
  try {
    const response = yield call(getLaporanRekapBE, req)
    if (response.status == 1) {
      yield put(respGetLaporanRekap(response))
    } else {
      yield put(respGetLaporanRekap(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLaporanRekap({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetLocationRekap({ payload: req }) {
  try {
    const response = yield call(getLocationAllDataBE, req)
    if (response.status == 1) {
      yield put(respGetLocationRekap(response))
    } else {
      yield put(respGetLocationRekap(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLocationRekap({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetDeptRekap({ payload: req }) {
  try {
    const response = yield call(getDeptAllDataBE, req)
    if (response.status == 1) {
      yield put(respGetDeptRekap(response))
    } else {
      yield put(respGetDeptRekap(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDeptRekap({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchdownloadExcelRekap({ payload: req }) {
  try {
    yield put(respDownload(''))
    const response = yield call(downloadRekap, req)
    if (response === undefined) {
      yield put(respDownload('Success'))
    }
  } catch (error) {
    console.log(error);
  }
}

function* laporanRekapSaga() {

  yield takeEvery(GET_LAPORAN_REKAP, fetchGetLaporanRekap)
  yield takeEvery(GET_LOCATION_REKAP, fetchGetLocationRekap)
  yield takeEvery(GET_DEPT_REKAP, fetchGetDeptRekap)
  yield takeEvery(DOWNLOAD_REKAP, fetchdownloadExcelRekap)

}

=======
import { call, put, takeEvery } from "redux-saga/effects"

import {
  DOWNLOAD_REKAP,
  GET_DEPT_REKAP,
  GET_LAPORAN_REKAP, GET_LOCATION_REKAP
} from "./actionTypes"
import {
  respDownload,
  respGetDeptRekap,
  respGetLaporanRekap, respGetLocationRekap
} from "./actions"

import {
  downloadRekap,
  getDeptAllDataBE,
  getDeptRekapBE,
  getLaporanRekapBE, getLocationAllDataBE, getLocationRekapBE
} from "helpers/backend_helper"

function* fetchGetLaporanRekap({ payload: req }) {
  try {
    const response = yield call(getLaporanRekapBE, req)
    if (response.status == 1) {
      yield put(respGetLaporanRekap(response))
    } else {
      yield put(respGetLaporanRekap(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLaporanRekap({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetLocationRekap({ payload: req }) {
  try {
    const response = yield call(getLocationAllDataBE, req)
    if (response.status == 1) {
      yield put(respGetLocationRekap(response))
    } else {
      yield put(respGetLocationRekap(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLocationRekap({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetDeptRekap({ payload: req }) {
  try {
    const response = yield call(getDeptAllDataBE, req)
    if (response.status == 1) {
      yield put(respGetDeptRekap(response))
    } else {
      yield put(respGetDeptRekap(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDeptRekap({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchdownloadExcelRekap({ payload: req }) {
  try {
    yield put(respDownload(''))
    const response = yield call(downloadRekap, req)
    if (response === undefined) {
      yield put(respDownload('Success'))
    }
  } catch (error) {
    console.log(error);
  }
}

function* laporanRekapSaga() {

  yield takeEvery(GET_LAPORAN_REKAP, fetchGetLaporanRekap)
  yield takeEvery(GET_LOCATION_REKAP, fetchGetLocationRekap)
  yield takeEvery(GET_DEPT_REKAP, fetchGetDeptRekap)
  yield takeEvery(DOWNLOAD_REKAP, fetchdownloadExcelRekap)

}

>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
export default laporanRekapSaga