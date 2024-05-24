<<<<<<< HEAD
import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_LOCATION,
  EDIT_LOCATION,
  GET_LIST_LOCATION,
  GET_LOCATION2,
  SAVE_LOCATION
} from "./actionTypes"
import {
  respGetLocation2,
  respGetLocationList
} from "./actions"

import {
  deleteLocationBE,
  editLocationBE,
  getLocationBE,
  getLocationListBE2, saveLocationBE
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit } from "store/actions"

function* fetchGetLocationList({ payload: req }) {
  try {
    const response = yield call(getLocationListBE2, req)
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

function* fetchGetLocation({ payload: req }) {
  try {
    const response = yield call(getLocationBE, req)
    if (response.status == 1) {
      yield put(respGetLocation2(response))
    } else {
      yield put(respGetLocation2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLocation2({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddLocation({ payload: req }) {
  try {
    const response = yield call(saveLocationBE, req)
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

function* fetchEditLocation({ payload: req }) {
  try {
    const response = yield call(editLocationBE, req)
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

function* fetchDeleteLocation({ payload: req }) {
  try {
    const response = yield call(deleteLocationBE, req)
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

function* locationMasterSaga() {

  yield takeEvery(GET_LIST_LOCATION, fetchGetLocationList)

  yield takeEvery(GET_LOCATION2, fetchGetLocation)

  yield takeEvery(SAVE_LOCATION, fetchAddLocation)
  yield takeEvery(EDIT_LOCATION, fetchEditLocation)
  yield takeEvery(DELETE_LOCATION, fetchDeleteLocation)

}

export default locationMasterSaga
=======
import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_LOCATION,
  EDIT_LOCATION,
  GET_LIST_LOCATION,
  GET_LOCATION2,
  SAVE_LOCATION
} from "./actionTypes"
import {
  respGetLocation2,
  respGetLocationList
} from "./actions"

import {
  deleteLocationBE,
  editLocationBE,
  getLocationBE,
  getLocationListBE2, saveLocationBE
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit } from "store/actions"

function* fetchGetLocationList({ payload: req }) {
  try {
    const response = yield call(getLocationListBE2, req)
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

function* fetchGetLocation({ payload: req }) {
  try {
    const response = yield call(getLocationBE, req)
    if (response.status == 1) {
      yield put(respGetLocation2(response))
    } else {
      yield put(respGetLocation2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetLocation2({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddLocation({ payload: req }) {
  try {
    const response = yield call(saveLocationBE, req)
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

function* fetchEditLocation({ payload: req }) {
  try {
    const response = yield call(editLocationBE, req)
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

function* fetchDeleteLocation({ payload: req }) {
  try {
    const response = yield call(deleteLocationBE, req)
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

function* locationMasterSaga() {

  yield takeEvery(GET_LIST_LOCATION, fetchGetLocationList)

  yield takeEvery(GET_LOCATION2, fetchGetLocation)

  yield takeEvery(SAVE_LOCATION, fetchAddLocation)
  yield takeEvery(EDIT_LOCATION, fetchEditLocation)
  yield takeEvery(DELETE_LOCATION, fetchDeleteLocation)

}

export default locationMasterSaga
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
