import {
    call,
    put,
    takeEvery,
    all
  } from "redux-saga/effects"

import { 
  addProjecListBE, addScheduleBE, getProjectListBE,
} from "helpers/backend_helper"

import { 
  addProjectList,
    respGetProjectList, 
    msgAdd,
} from "./actions"

import {
  ADD_PROJECT_LIST,
  ADD_SCHEDULE,
  GET_PROJECT_LIST,
} from "./actionTypes"

function* fetchGetAllProjectList({ payload: req}) {
    try {
        const response = yield call(getProjectListBE, req)
        if (response.status == 1) {
          yield put(respGetProjectList(response))
        } else {
          yield put(respGetProjectList(response))
        }
      } catch (error) {
        console.log(error);
        yield put(respGetProjectList({ "status": 0, "message": "Error Get Data" }))
      }
}

function* fetchAddProjectList({ payload: req }) {
  try {
    const response = yield call(addProjecListBE, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddSchedule({ payload: req }) {
  try {
    const response = yield call(addScheduleBE, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Get Data" }))
  }
}

function* dashBoardSaga() {
    yield takeEvery(GET_PROJECT_LIST, fetchGetAllProjectList)
    yield takeEvery(ADD_PROJECT_LIST, fetchAddProjectList)
    yield takeEvery(ADD_SCHEDULE, fetchAddSchedule)
}

export default dashBoardSaga