<<<<<<< HEAD
import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_LEVEL,
  EDIT_LEVEL,
  GET_LEVEL2,
  GET_LIST_LEVEL, GET_LIST_LOCATION3, SAVE_LEVEL
} from "./actionTypes"
import {
  respGetLevel2,
  respGetLevelList,
  respGetLocationList3
} from "./actions"

import {
  deleteLevelBE,
  editLevelBE,
  getLevelBE2,
  getLevelListBE, getLocationListBE3, saveLevelBE,
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit, respGetLevel } from "store/actions"

function* fetchGetLevelList({ payload: req }) {
  try {
    const response = yield call(getLevelListBE, req)
    if (response.status == 1) {
      yield put(respGetLevelList(response))
    } else {
      yield put(respGetLevelList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLevelList({ "status": 0, "message": "Error Get Data" }))
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

function* fetchGetLevel({ payload: req }) {
  try {
    const response = yield call(getLevelBE2, req)
    if (response.status == 1) {
      yield put(respGetLevel2(response))
    } else {
      yield put(respGetLevel2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLevel2({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddLevel({ payload: req }) {
  try {
    const response = yield call(saveLevelBE, req)
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

function* fetchEditLevel({ payload: req }) {
  try {
    const response = yield call(editLevelBE, req)
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

function* fetchDeleteLevel({ payload: req }) {
  try {
    const response = yield call(deleteLevelBE, req)
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

function* levelMasterSaga() {

  yield takeEvery(GET_LIST_LEVEL, fetchGetLevelList)
  yield takeEvery(GET_LIST_LOCATION3, fetchGetLocationList3)

  yield takeEvery(GET_LEVEL2, fetchGetLevel)

  yield takeEvery(SAVE_LEVEL, fetchAddLevel)
  yield takeEvery(EDIT_LEVEL, fetchEditLevel)
  yield takeEvery(DELETE_LEVEL, fetchDeleteLevel)

}

export default levelMasterSaga
=======
import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_LEVEL,
  EDIT_LEVEL,
  GET_LEVEL2,
  GET_LIST_LEVEL, GET_LIST_LOCATION3, SAVE_LEVEL
} from "./actionTypes"
import {
  respGetLevel2,
  respGetLevelList,
  respGetLocationList3
} from "./actions"

import {
  deleteLevelBE,
  editLevelBE,
  getLevelBE2,
  getLevelListBE, getLocationListBE3, saveLevelBE,
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit, respGetLevel } from "store/actions"

function* fetchGetLevelList({ payload: req }) {
  try {
    const response = yield call(getLevelListBE, req)
    if (response.status == 1) {
      yield put(respGetLevelList(response))
    } else {
      yield put(respGetLevelList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLevelList({ "status": 0, "message": "Error Get Data" }))
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

function* fetchGetLevel({ payload: req }) {
  try {
    const response = yield call(getLevelBE2, req)
    if (response.status == 1) {
      yield put(respGetLevel2(response))
    } else {
      yield put(respGetLevel2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLevel2({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddLevel({ payload: req }) {
  try {
    const response = yield call(saveLevelBE, req)
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

function* fetchEditLevel({ payload: req }) {
  try {
    const response = yield call(editLevelBE, req)
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

function* fetchDeleteLevel({ payload: req }) {
  try {
    const response = yield call(deleteLevelBE, req)
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

function* levelMasterSaga() {

  yield takeEvery(GET_LIST_LEVEL, fetchGetLevelList)
  yield takeEvery(GET_LIST_LOCATION3, fetchGetLocationList3)

  yield takeEvery(GET_LEVEL2, fetchGetLevel)

  yield takeEvery(SAVE_LEVEL, fetchAddLevel)
  yield takeEvery(EDIT_LEVEL, fetchEditLevel)
  yield takeEvery(DELETE_LEVEL, fetchDeleteLevel)

}

export default levelMasterSaga
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
