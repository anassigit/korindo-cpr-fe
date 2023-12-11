import { call, put, takeEvery } from "redux-saga/effects"

import {
  LOV_CANDIDATE, LOV_DEPT_LIST_ORG, LOV_LEVEL, LOV_POSITION_AND_LEVEL
} from "./actionTypes"
import { msgLov } from "./actions"

import {
  getLovCandidateBE,
  getLovDeptListOrgBE,
  getLovLevelBE,
  getPositionAndLevelListBE
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

function* fetchGetLevel({ payload: req }) {
  try {
    const response = yield call(getLovLevelBE, req)
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

function* fetchGetDeptListOrg({ payload: req }) {
  try {
    const response = yield call(getLovDeptListOrgBE, req)
    if (response.status == 1) {
      yield put(msgLov(response))
    } else {
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetPositionAndLevelList({ payload: req }) {
  try {
    const response = yield call(getPositionAndLevelListBE, req)
    if (response.status == 1) {
      yield put(msgLov(response))
    } else {
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({ "status": 0, "message": "Error Get Data" }))
  }
}

function* lovSaga() {
    
  yield takeEvery(LOV_CANDIDATE, fetchGetCandidate)
  yield takeEvery(LOV_LEVEL, fetchGetLevel)
  yield takeEvery(LOV_DEPT_LIST_ORG, fetchGetDeptListOrg)
  yield takeEvery(LOV_POSITION_AND_LEVEL, fetchGetPositionAndLevelList)

}

export default lovSaga
