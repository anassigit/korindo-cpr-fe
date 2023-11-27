import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_MANUAL
} from "./actionTypes"
import {
  respGetManual
} from "./actions"

import {
  getManualBE
} from "helpers/backend_helper"

function* fetchGetManual({ payload: req }) {
  try {
    const response = yield call(getManualBE, req)
    if (response.status == 1) {
      yield put(respGetManual(response))
    } else {
      yield put(respGetManual(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetManual({ "status": 0, "message": "Error Get Data" }))
  }
}

function* manualSaga() {

  yield takeEvery(GET_MANUAL, fetchGetManual)
}

export default manualSaga
