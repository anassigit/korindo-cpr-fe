import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_MENU
} from "./actionTypes"
import {
  respGetMenu
} from "./actions"

import {
  getMenuBE
} from "helpers/backend_helper"

function* fetchGetMenu({ payload: req }) {
  try {
    const response = yield call(getMenuBE, req)
    if (response.status == 1) {
      yield put(respGetMenu(response))
    } else {
      yield put(respGetMenu(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMenu({ "status": 0, "message": "Error Get Data" }))
  }
}

function* dashboardSaga() {

  yield takeEvery(GET_MENU, fetchGetMenu)

}

export default dashboardSaga
