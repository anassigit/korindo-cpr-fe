import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_MANUAL_PDF, GET_MANUAL_VIDEO
} from "./actionTypes"
import {
  respGetManual, respGetManualPDF, respGetManualVideo
} from "./actions"

import {
  getManualPDFBE, getManualVideoBE
} from "helpers/backend_helper"

function* fetchGetManualPDF({ payload: req }) {
  try {
    const response = yield call(getManualPDFBE, req)
    if (response.status == 1) {
      yield put(respGetManualPDF(response))
    } else {
      yield put(respGetManualPDF(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetManualPDF({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetManualVideo({ payload: req }) {
  try {
    const response = yield call(getManualVideoBE, req)
    if (response.status == 1) {
      yield put(respGetManualVideo(response))
    } else {
      yield put(respGetManualVideo(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetManualVideo({ "status": 0, "message": "Error Get Data" }))
  }
}

function* manualSaga() {

  yield takeEvery(GET_MANUAL_PDF, fetchGetManualPDF)
  yield takeEvery(GET_MANUAL_VIDEO, fetchGetManualVideo)
}

export default manualSaga
