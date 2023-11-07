import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_LIST
} from "./actionTypes"
import {
  respGetList
} from "./actions"

import {
  getListEmployeeOfMonthYearBE
} from "helpers/backend_helper"

function* fetchGetList({ payload: req }) {
  try {
    const response = yield call(getListEmployeeOfMonthYearBE, req)
    if (response.status == 1) {
      yield put(respGetList(response))
    } else {
      yield put(respGetList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* managementSystemSaga() {

  yield takeEvery(GET_LIST, fetchGetList)

}

export default managementSystemSaga
