import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_SETTING,
  EDIT_SETTING,
  GET_SETTING2,
  GET_LIST_SETTING, GET_LIST_LOCATION3, SAVE_SETTING
} from "./actionTypes"
import {
  respGetSetting2,
  respGetSettingList,
  respGetLocationList3
} from "./actions"

import {
  deleteSettingBE,
  editSettingBE,
  getSettingBE2,
  getSettingListBE, getLocationListBE3, saveSettingBE,
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit, respGetSetting } from "store/actions"

function* fetchGetSettingList({ payload: req }) {
  try {
    const response = yield call(getSettingListBE, req)
    if (response.status == 1) {
      yield put(respGetSettingList(response))
    } else {
      yield put(respGetSettingList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetSettingList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetSetting({ payload: req }) {
  try {
    const response = yield call(getSettingBE2, req)
    if (response.status == 1) {
      yield put(respGetSetting2(response))
    } else {
      yield put(respGetSetting2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetSetting2({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddSetting({ payload: req }) {
  try {
    const response = yield call(saveSettingBE, req)
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

function* fetchEditSetting({ payload: req }) {
  try {
    const response = yield call(editSettingBE, req)
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

function* fetchDeleteSetting({ payload: req }) {
  try {
    const response = yield call(deleteSettingBE, req)
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

function* settingMasterSaga() {

  yield takeEvery(GET_LIST_SETTING, fetchGetSettingList)

  yield takeEvery(GET_SETTING2, fetchGetSetting)

  yield takeEvery(SAVE_SETTING, fetchAddSetting)
  yield takeEvery(EDIT_SETTING, fetchEditSetting)
  yield takeEvery(DELETE_SETTING, fetchDeleteSetting)

}

export default settingMasterSaga
