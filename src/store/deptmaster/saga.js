import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_LIST_DEPT
} from "./actionTypes"
import {
  respGetDeptList
} from "./actions"

import {
  getDeptListBE,
} from "helpers/backend_helper"

function* fetchGetDeptList({ payload: req }) {
  debugger
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

function* deptMasterSaga() {

  yield takeEvery(GET_LIST_DEPT, fetchGetDeptList)

}

export default deptMasterSaga
