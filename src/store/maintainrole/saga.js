import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_ROLE,
  EDIT_ROLE,
  GET_ACCESS_LIST_ROLE,
  GET_LIST_ROLE,
  GET_ROLE,
  SAVE_ROLE
} from "./actionTypes"
import {
  respGetRole,
  respGetRoleList
} from "./actions"

import {
  deleteRoleBE,
  editRoleBE,
  getRoleBE,
  getRoleListBE,
  saveRoleBE
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit } from "store/actions"

function* fetchGetRoleList({ payload: req }) {
  try {
    const response = yield call(getRoleListBE, req)
    if (response.status == 1) {
      yield put(respGetRoleList(response))
    } else {
      yield put(respGetRoleList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRoleList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetAccessList({ payload: req }) {
  try {
    const response = yield call(getRoleListBE, req)
    if (response.status == 1) {
      yield put(respGetRoleList(response))
    } else {
      yield put(respGetRoleList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRoleList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetRole({ payload: req }) {
  try {
    const response = yield call(getRoleBE, req)
    if (response.status == 1) {
      yield put(respGetRole(response))
    } else {
      yield put(respGetRole(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRole({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddRole({ payload: req }) {
  try {
    const response = yield call(saveRoleBE, req)
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

function* fetchEditRole({ payload: req }) {
  try {
    const response = yield call(editRoleBE, req)
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

function* fetchDeleteRole({ payload: req }) {
  try {
    const response = yield call(deleteRoleBE, req)
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

function* maintainRoleSaga() {

  yield takeEvery(GET_LIST_ROLE, fetchGetRoleList)
  yield takeEvery(GET_ACCESS_LIST_ROLE, fetchGetAccessList)

  yield takeEvery(GET_ROLE, fetchGetRole)

  yield takeEvery(SAVE_ROLE, fetchAddRole)
  yield takeEvery(EDIT_ROLE, fetchEditRole)
  yield takeEvery(DELETE_ROLE, fetchDeleteRole)

}

export default maintainRoleSaga