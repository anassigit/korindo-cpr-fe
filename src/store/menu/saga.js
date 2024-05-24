<<<<<<< HEAD
import { call, put, takeEvery } from "redux-saga/effects"
import { ReactSession } from 'react-client-session';

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

      const menuData = {
        menu: response.data.list,
        menuType: 'cpr'
      }
      localStorage.setItem("menu", JSON.stringify(menuData))
      
      yield put(respGetMenu(response))
    } else {
      yield put(respGetMenu(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMenu({ "status": 0, "message": "Error Get Data" }))
  }
}

function* menuSaga() {

  yield takeEvery(GET_MENU, fetchGetMenu)

}

export default menuSaga
=======
import { call, put, takeEvery } from "redux-saga/effects"
import { ReactSession } from 'react-client-session';

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

      const menuData = {
        menu: response.data.list,
        menuType: 'cpr'
      }
      localStorage.setItem("menu", JSON.stringify(menuData))
      
      yield put(respGetMenu(response))
    } else {
      yield put(respGetMenu(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMenu({ "status": 0, "message": "Error Get Data" }))
  }
}

function* menuSaga() {

  yield takeEvery(GET_MENU, fetchGetMenu)

}

export default menuSaga
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
