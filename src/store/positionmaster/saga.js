import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_POSITION,
  EDIT_POSITION,
  GET_POSITION2,
  GET_LIST_POSITION, GET_LIST_LOCATION3, SAVE_POSITION
} from "./actionTypes"
import {
  respGetPosition2,
  respGetPositionList,
  respGetLocationList3
} from "./actions"

import {
  deletePositionBE,
  editPositionBE,
  getPositionBE2,
  getPositionListBE, getLocationListBE3, savePositionBE,
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit, respGetPosition } from "store/actions"

function* fetchGetPositionList({ payload: req }) {
  try {
    const response = yield call(getPositionListBE, req)
    if (response.status == 1) {
      yield put(respGetPositionList(response))
    } else {
      yield put(respGetPositionList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetPositionList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetLocationList3({ payload: req }) {
  try {
    const response = yield call(getLocationListBE3, req)
    if (response.status == 1) {
      yield put(respGetLocationList3(response))
    } else {
      yield put(respGetLocationList3(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLocationList3({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetPosition({ payload: req }) {
  try {
    const response = yield call(getPositionBE2, req)
    if (response.status == 1) {
      yield put(respGetPosition2(response))
    } else {
      yield put(respGetPosition2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetPosition2({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddPosition({ payload: req }) {
  try {
    const response = yield call(savePositionBE, req)
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

function* fetchEditPosition({ payload: req }) {
  try {
    const response = yield call(editPositionBE, req)
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

function* fetchDeletePosition({ payload: req }) {
  try {
    const response = yield call(deletePositionBE, req)
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

function* positionMasterSaga() {

  yield takeEvery(GET_LIST_POSITION, fetchGetPositionList)
  yield takeEvery(GET_LIST_LOCATION3, fetchGetLocationList3)

  yield takeEvery(GET_POSITION2, fetchGetPosition)

  yield takeEvery(SAVE_POSITION, fetchAddPosition)
  yield takeEvery(EDIT_POSITION, fetchEditPosition)
  yield takeEvery(DELETE_POSITION, fetchDeletePosition)

}

export default positionMasterSaga
