import { call, put, takeEvery } from "redux-saga/effects"

import {
  LOV_CANDIDATE, LOV_DEPT_LIST_ORG, LOV_LEVEL, LOV_MEMBER_LIST, LOV_MENU_PARENT_LIST, LOV_MENU_ROLE_LIST, LOV_POSITION_AND_LEVEL, LOV_USER_ROLE_LIST
} from "./actionTypes"
import { msgLov } from "./actions"

import {
  getLovCandidateBE,
  getLovDeptListOrgBE,
  getLovLevelBE,
  getLovMemberListBE,
  getLovParentMenuListBE,
  getMemberRoleListBE,
  getMenuListBE,
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

function* fetchGetMenuRoleList({ payload: req }) {
  try {
    const response = yield call(getMenuListBE, req)
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

function* fetchGetUserRoleList({ payload: req }) {
  try {
    const response = yield call(getMemberRoleListBE, req)
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

function* fetchGetMemberList({ payload: req }) {
  try {
    const response = yield call(getLovMemberListBE, req)
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

function* fetchGetMenuParentList({ payload: req }) {
  try {
    const response = yield call(getLovParentMenuListBE, req)
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
  yield takeEvery(LOV_MENU_ROLE_LIST, fetchGetMenuRoleList)
  yield takeEvery(LOV_USER_ROLE_LIST, fetchGetUserRoleList)
  yield takeEvery(LOV_MEMBER_LIST, fetchGetMemberList)
  yield takeEvery(LOV_MENU_PARENT_LIST, fetchGetMenuParentList)

}

export default lovSaga
