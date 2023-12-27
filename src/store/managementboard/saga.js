import { call, put, takeEvery } from "redux-saga/effects"

import {
  EDIT_REPORT,
  GET_LIST_REPORT2,
  GET_LOCATION_REPORT
} from "./actionTypes"
import {
  respGetLocationReport,
  respGetReportList2
} from "./actions"

import {
  editReportBE,
  getLocationReportBE,
  getMaintainReportBE,
  getMaintainReportListBE
} from "helpers/backend_helper"
import { msgEdit } from "store/actions"

function* fetchGetReportList({ payload: req }) {
  try {
    const response = yield call(getMaintainReportListBE, req)
    if (response.status == 1) {
      yield put(respGetReportList2(response))
    } else {
      yield put(respGetReportList2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetReportList2({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetLocationReport({ payload: req }) {
  try {
    const response = yield call(getLocationReportBE, req)
    if (response.status == 1) {
      yield put(respGetLocationReport(response))
    } else {
      yield put(respGetLocationReport(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLocationReport({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchEditReport({ payload: req }) {
  try {
    
    const response = yield call(editReportBE, req)
    if (response.status == 1) {
      yield put(msgEdit(response))
    } else {
      yield put(msgEdit(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Edit Data" }))
  }
}

function* managementBoardSaga() {

  yield takeEvery(GET_LIST_REPORT2, fetchGetReportList)

  yield takeEvery(GET_LOCATION_REPORT, fetchGetLocationReport)

  yield takeEvery(EDIT_REPORT, fetchEditReport)

}

export default managementBoardSaga
