import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_BEST_LIST
} from "./actionTypes"
import {
  respGetBestList
} from "./actions"

import {
  getBestListBE
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

function* dashboardSaga() {

  yield takeEvery(GET_BEST_LIST, fetchGetBestList)

}

export default dashboardSaga
