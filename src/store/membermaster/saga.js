import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_MEMBER,
  EDIT_MEMBER,
  GET_LIST_LOCATION5,
  GET_LIST_MEMBER,
  GET_MEMBER2,
  SAVE_MEMBER
} from "./actionTypes"
import {
  respGetLocationList5,
  respGetMember2,
  respGetMemberList
} from "./actions"

import {
  deleteMemberBE,
  editMemberBE,
  getLocationListBE5,
  getMemberBE2,
  getMemberListBE2,
  saveMemberBE
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit } from "store/actions"

function* fetchGetMemberList({ payload: req }) {
  try {
    const response = yield call(getMemberListBE2, req)
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

function* fetchGetLocationList5({ payload: req }) {
  try {
    const response = yield call(getLocationListBE5, req)
    if (response.status == 1) {
      yield put(respGetLocationList5(response))
    } else {
      yield put(respGetLocationList5(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLocationList5({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetMember({ payload: req }) {
  try {
    const response = yield call(getMemberBE2, req)
    if (response.status == 1) {
      yield put(respGetMember2(response))
    } else {
      yield put(respGetMember2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMember2({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddMember({ payload: req }) {
  try {
    const response = yield call(saveMemberBE, req)
    if (response.status == 1) {
      yield put(msgAdd(response))
    } else {
      yield put(msgAdd(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Save Data" }))
  }
}

function* fetchEditMember({ payload: req }) {
  try {
    
    const response = yield call(editMemberBE, req)
    if (response.status == 1) {
      yield put(msgEdit(response))
    } else {
      yield put(msgEdit(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Edit Data" }))
  }
}

function* fetchDeleteMember({ payload: req }) {
  try {
    const response = yield call(deleteMemberBE, req)
    if (response.status == 1) {
      yield put(msgDelete(response))
    } else {
      yield put(msgDelete(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgDelete({ "status": 0, "message": "Error Delete Data" }))
  }
}

function* memberMasterSaga() {

  yield takeEvery(GET_LIST_MEMBER, fetchGetMemberList)
  yield takeEvery(GET_LIST_LOCATION5, fetchGetLocationList5)

  yield takeEvery(GET_MEMBER2, fetchGetMember)

  yield takeEvery(SAVE_MEMBER, fetchAddMember)
  yield takeEvery(EDIT_MEMBER, fetchEditMember)
  yield takeEvery(DELETE_MEMBER, fetchDeleteMember)

}

export default memberMasterSaga
