import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_DEPT,
  EDIT_DEPT,
  GET_DEPT2,
  GET_LIST_DEPT, SAVE_DEPT
} from "./actionTypes"
import {
  respGetDept2,
  respGetDeptList
} from "./actions"

import {
  deleteDeptBE,
  editDeptBE,
  getDeptBE2,
  getDeptListBE, saveDeptBE,
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit, respGetDept } from "store/actions"

function* fetchGetDeptList({ payload: req }) {
  try {
    const response = yield call(getDeptListBE, req)
    if (response.status == 1) {
      yield put(respGetDeptList(response))
    } else {
      yield put(respGetDeptList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDeptList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetDept({ payload: req }) {
  try {
    const response = yield call(getDeptBE2, req)
    if (response.status == 1) {
      yield put(respGetDept2(response))
    } else {
      yield put(respGetDept2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDept2({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddDept({ payload: req }) {
  try {
    const response = yield call(saveDeptBE, req)
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

function* fetchEditDept({ payload: req }) {
  try {
    const response = yield call(editDeptBE, req)
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

function* fetchDeleteDept({ payload: req }) {
  try {
    const response = yield call(deleteDeptBE, req)
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

function* deptMasterSaga() {

  yield takeEvery(GET_LIST_DEPT, fetchGetDeptList)

  yield takeEvery(GET_DEPT2, fetchGetDept)

  yield takeEvery(SAVE_DEPT, fetchAddDept)
  yield takeEvery(EDIT_DEPT, fetchEditDept)
  yield takeEvery(DELETE_DEPT, fetchDeleteDept)

}

export default deptMasterSaga
