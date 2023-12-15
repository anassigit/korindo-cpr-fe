import { call, put, takeEvery } from "redux-saga/effects";


import {
  GET_SEND_DETAIL
} from "./actionTypes";

import {
  getSendDetailRestBE
} from "helpers/backend_helper";
import { respGetHistoryPemberian } from "./actions";

function* fetchGetSendDetailList({ payload: req }) {
  try {
    const response = yield call(getSendDetailRestBE, req)
    if (response.status == 1) {
      yield put(respGetHistoryPemberian(response))
    } else {
      yield put(respGetHistoryPemberian(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetHistoryPemberian({ "status": 0, "message": "Error Get Data" }))
  }
}

function* historyPemberianSaga() {
  
  yield takeEvery(GET_SEND_DETAIL, fetchGetSendDetailList)

}

export default historyPemberianSaga
