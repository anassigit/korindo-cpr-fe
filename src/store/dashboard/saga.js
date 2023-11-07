import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_BEST_LIST, GET_BEST_OF_MONTH_LIST, GET_BEST_OF_YEAR_LIST, GET_DETAIL_INFLUENCER, GET_REPORT_LIST
} from "./actionTypes"
import {
  respGetBestList, respGetBestOfMonthList, respGetBestOfYearList, respGetDetailInfluencer, respGetReportList
} from "./actions"

import {
  getBestListBE, getBestOfMonthListBE, getBestOfYearListBE, getDetailInfluencerBE, getReportListBE
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

function* fetchGetBestOfYearList({ payload: req }) {
  try {
    const response = yield call(getBestOfYearListBE, req)
    if (response.status == 1) {
      yield put(respGetBestOfYearList(response))
    } else {
      yield put(respGetBestOfYearList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetBestOfYearList({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetDetailInfluencer({ payload: req }) {
  try {
    const response = yield call(getDetailInfluencerBE, req)
    if (response.status == 1) {
      yield put(respGetDetailInfluencer(response))
    } else {
      yield put(respGetDetailInfluencer(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDetailInfluencer({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetReportList({ payload: req }) {
  try {
    const response = yield call(getReportListBE, req)
    if (response.status == 1) {
      yield put(respGetReportList(response))
    } else {
      yield put(respGetReportList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetReportList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* dashboardSaga() {

  yield takeEvery(GET_BEST_LIST, fetchGetBestList)
  yield takeEvery(GET_BEST_OF_MONTH_LIST, fetchGetBestOfMonthList)
  yield takeEvery(GET_BEST_OF_YEAR_LIST, fetchGetBestOfYearList)
  yield takeEvery(GET_DETAIL_INFLUENCER, fetchGetDetailInfluencer)
  yield takeEvery(GET_REPORT_LIST, fetchGetReportList)

}

export default dashboardSaga
