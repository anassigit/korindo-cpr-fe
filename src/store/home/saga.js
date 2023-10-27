import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_DEPT,
  GET_MEMBER_LIST,
  GET_RECOMMEND_LIST,
  GET_SEARCH
} from "./actionTypes"
import {
  respGetDept,
  respGetMemberList, respGetRecommendList, respGetSearch
} from "./actions"

import {
  getDeptBE,
  getMemberListBE, getRecommendListBE, getSearchBE
} from "helpers/backend_helper"

function* fetchGetDept({ payload: req }) {
  try {
    const response = yield call(getDeptBE, req)
    if (response.status == 1) {
      yield put(respGetDept(response))
    } else {
      yield put(respGetDept(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDept({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetMemberList({ payload: req }) {
  try {
    const response = yield call(getMemberListBE, req)
    if (response.status == 1) {
      yield put(respGetMemberList(response))
    } else {
      yield put(respGetMemberList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMemberList({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetSearch({ payload: req }) {
  try {
    const response = yield call(getSearchBE, req)
    if (response.status == 1) {
      yield put(respGetSearch(response))
    } else {
      yield put(respGetSearch(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetSearch({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetRecommendList({ payload: req }) {
  try {
    const response = yield call(getRecommendListBE, req)
    if (response.status == 1) {
      yield put(respGetRecommendList(response))
    } else {
      yield put(respGetRecommendList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRecommendList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* rekomendasiSaga() {

  yield takeEvery(GET_DEPT, fetchGetDept)
  yield takeEvery(GET_MEMBER_LIST, fetchGetMemberList)
  yield takeEvery(GET_SEARCH, fetchGetSearch)
  yield takeEvery(GET_RECOMMEND_LIST, fetchGetRecommendList)

}

export default rekomendasiSaga
