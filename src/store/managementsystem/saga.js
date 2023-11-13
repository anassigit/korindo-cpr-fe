import { call, put, takeEvery } from "redux-saga/effects"

import {
  ADD_EMPLOYEE_OF,
  GET_CANDIDATE_LIST,
  GET_LIST, GET_YEAR_LIST
} from "./actionTypes"
import {
  respGetCandidateList,
  respGetList, respGetYearList
} from "./actions"

import {
  addEmployeeOfBE,
  getCandidateListBE,
  getListEmployeeOfMonthYearBE, getYearListBE
} from "helpers/backend_helper"
import { msgAdd } from "store/actions"

function* fetchGetList({ payload: req }) {
  try {
    const response = yield call(getListEmployeeOfMonthYearBE, req)
    if (response.status == 1) {
      yield put(respGetList(response))
    } else {
      yield put(respGetList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetList({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetYearList({ payload: req }) {
  try {
    const response = yield call(getYearListBE, req)
    if (response.status == 1) {
      yield put(respGetYearList(response))
    } else {
      yield put(respGetYearList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetYearList({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetCandidateList({ payload: req }) {
  try {
    const response = yield call(getCandidateListBE, req)
    if (response.status == 1) {
      yield put(respGetCandidateList(response))
    } else {
      yield put(respGetCandidateList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetCandidateList({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchAddEmployeeOf({ payload: req }) {
  try {
    const response = yield call(addEmployeeOfBE, req)
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

function* managementSystemSaga() {

  yield takeEvery(GET_LIST, fetchGetList)
  yield takeEvery(GET_YEAR_LIST, fetchGetYearList)
  yield takeEvery(GET_CANDIDATE_LIST, fetchGetCandidateList)
  yield takeEvery(ADD_EMPLOYEE_OF, fetchAddEmployeeOf)

}

export default managementSystemSaga
