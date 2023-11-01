import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_BEST_LIST, GET_BEST_OF_MONTH_LIST
} from "./actionTypes"
import {
  respGetBestList, respGetBestOfMonthList
} from "./actions"

import {
  getBestListBE, getBestOfMonthListBE
} from "helpers/backend_helper"

function* fetchGetBestList({ payload: req }) {
  try {
    const response = yield call(getBestListBE, req)
    if (response.status == 1) {
      yield put(respGetBestList(response))
    } else {
      yield put(respGetBestList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetBestList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetBestOfMonthList({ payload: req }) {
  try {
    const response = yield call(getBestOfMonthListBE, req)
    if (response.status == 1) {
      yield put(respGetBestOfMonthList(response))
    } else {
      yield put(respGetBestOfMonthList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetBestOfMonthList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* dashboardSaga() {

  yield takeEvery(GET_BEST_LIST, fetchGetBestList)
  yield takeEvery(GET_BEST_OF_MONTH_LIST, fetchGetBestOfMonthList)

}

export default dashboardSaga
