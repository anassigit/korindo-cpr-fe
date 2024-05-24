import { call, put, takeEvery } from "redux-saga/effects"

import {
  ADD_EMPLOYEE_OF,
  DELETE_EMPLOYEE_OF,
  EDIT_EMPLOYEE_OF,
  GET_CANDIDATE,
  GET_CANDIDATE_LIST,
  GET_KEYWORD_LIST,
  GET_LIST, GET_LOCATION_LIST, GET_YEAR_LIST
} from "./actionTypes"
import {
  respGetCandidate,
  respGetCandidateList,
  respGetKeywordList,
  respGetList, respGetLocationList, respGetYearList
} from "./actions"

import {
  addEmployeeOfBE,
  deleteEmployeeOfBE,
  editEmployeeOfBE,
  getCandidateBE,
  getCandidateListBE,
  getKeywordListBE,
  getListEmployeeOfMonthYearBE, getLocationListBE, getYearListBE
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit } from "store/actions"

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
function* fetchGetCandidate({ payload: req }) {
  try {
    const response = yield call(getCandidateBE, req)
    if (response.status == 1) {
      yield put(respGetCandidate(response))
    } else {
      yield put(respGetCandidate(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetCandidate({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetKeywordList({ payload: req }) {
  try {
    const response = yield call(getKeywordListBE, req)
    if (response.status == 1) {
      yield put(respGetKeywordList(response))
    } else {
      yield put(respGetKeywordList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetKeywordList({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetLocationList({ payload: req }) {
  try {
    const response = yield call(getLocationListBE, req)
    if (response.status == 1) {
      yield put(respGetLocationList(response))
    } else {
      yield put(respGetLocationList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLocationList({ "status": 0, "message": "Error Get Data" }))
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
function* fetchEditEmployeeOf({ payload: req }) {
  try {
    const response = yield call(editEmployeeOfBE, req)
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
function* fetchDeleteEmployeeOf({ payload: req }) {
  try {
    const response = yield call(deleteEmployeeOfBE, req)
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

function* employeeOfMonYeaSaga() {

  yield takeEvery(GET_LIST, fetchGetList)
  yield takeEvery(GET_YEAR_LIST, fetchGetYearList)
  yield takeEvery(GET_CANDIDATE_LIST, fetchGetCandidateList)
  yield takeEvery(GET_CANDIDATE, fetchGetCandidate)
  yield takeEvery(GET_KEYWORD_LIST, fetchGetKeywordList)
  yield takeEvery(GET_LOCATION_LIST, fetchGetLocationList)
  yield takeEvery(ADD_EMPLOYEE_OF, fetchAddEmployeeOf)
  yield takeEvery(EDIT_EMPLOYEE_OF, fetchEditEmployeeOf)
  yield takeEvery(DELETE_EMPLOYEE_OF, fetchDeleteEmployeeOf)

}

export default employeeOfMonYeaSaga
