import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_LIST, GET_YEAR_LIST
} from "./actionTypes"
import {
  respGetList, respGetYearList
} from "./actions"

import {
  getListEmployeeOfMonthYearBE, getYearListBE
} from "helpers/backend_helper"

function* fetchGetList({ payload: req }) {
  debugger
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
function* fetchGetYearList({ payload: req }) {
  try {
    const response = yield call(getYearListBE, req)
    if (response.status == 1) {
      yield put(respGetYearList(response))
    } else {
      yield put(respGetYearList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetYearList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* managementSystemSaga() {

  yield takeEvery(GET_LIST, fetchGetList)
  yield takeEvery(GET_YEAR_LIST, fetchGetYearList)

}

export default managementSystemSaga
