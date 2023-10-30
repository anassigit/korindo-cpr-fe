import { call, put, takeEvery } from "redux-saga/effects"

import {
  ADD_RECOMMEND,
  DELETE_RECOMMEND,
  GET_DEPT,
  GET_MEMBER_LIST,
  GET_RECOMMEND_LIST,
  GET_SEARCH,
  GET_STICKER_LIST,
  MSG_ADD
} from "./actionTypes"
import {
  msgAdd,
  msgDelete,
  respGetDept,
  respGetMemberList, respGetRecommendList, respGetSearch, respGetStickerList
} from "./actions"

import {
  addRecommendBE,
  deleteRecommendBE,
  getDeptBE,
  getMemberListBE, getRecommendListBE, getSearchBE, getStickerListBE
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

function* fetchGetStickerList({ payload: req }) {
  try {
    const response = yield call(getStickerListBE, req)
    if (response.status == 1) {
      yield put(respGetStickerList(response))
    } else {
      yield put(respGetStickerList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetStickerList({ "status": 0, "message": "Error Get Data" }))
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

function* fetchAddRekomendasi({ payload: req }) {
  try {
    const response = yield call(addRecommendBE, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchDeleteRekomendasi({ payload: req }) {
  try {
    const response = yield call(deleteRecommendBE, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({ "status": 0, "message": "Error Get Data" }))
  }
}

function* rekomendasiSaga() {

  yield takeEvery(GET_DEPT, fetchGetDept)
  yield takeEvery(GET_MEMBER_LIST, fetchGetMemberList)
  yield takeEvery(GET_SEARCH, fetchGetSearch)
  yield takeEvery(GET_STICKER_LIST, fetchGetStickerList)
  yield takeEvery(GET_RECOMMEND_LIST, fetchGetRecommendList)
  yield takeEvery(ADD_RECOMMEND, fetchAddRekomendasi)
  yield takeEvery(DELETE_RECOMMEND, fetchDeleteRekomendasi)

}

export default rekomendasiSaga
