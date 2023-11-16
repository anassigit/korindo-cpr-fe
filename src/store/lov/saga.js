import { call, put, takeEvery } from "redux-saga/effects"

import {
  LOV_CANDIDATE
} from "./actionTypes"
import { msgLov } from "./actions"

import {
  getLovCandidateBE
} from "helpers/backend_helper"


function* fetchGetCandidate({ payload: req }) {
  try {
    const response = yield call(getLovCandidateBE, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* lovSaga() {
    

  yield takeEvery(LOV_CANDIDATE, fetchGetCandidate)

}

export default lovSaga
