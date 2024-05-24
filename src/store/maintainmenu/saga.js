<<<<<<< HEAD
import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_MENU,
  EDIT_MENU,
  GET_LIST_MENU,
  GET_MENU2,
  SAVE_MENU
} from "./actionTypes"
import {
  respGetMenu2,
  respGetMenuList
} from "./actions"

import {
  deleteMenuBE,
  editMenuBE,
  getMaintainMenuBE,
  getMaintainMenuListBE,
  getMenuBE2,
  getMenuListBE2,
  saveMenuBE
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit } from "store/actions"

function* fetchGetMenuList({ payload: req }) {
  try {
    const response = yield call(getMaintainMenuListBE, req)
    if (response.status == 1) {
      yield put(respGetMenuList(response))
    } else {
      yield put(respGetMenuList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMenuList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetMenu({ payload: req }) {
  try {
    const response = yield call(getMaintainMenuBE, req)
    if (response.status == 1) {
      yield put(respGetMenu2(response))
    } else {
      yield put(respGetMenu2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMenu2({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddMenu({ payload: req }) {
  try {
    const response = yield call(saveMenuBE, req)
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

function* fetchEditMenu({ payload: req }) {
  try {
    
    const response = yield call(editMenuBE, req)
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

function* fetchDeleteMenu({ payload: req }) {
  try {
    const response = yield call(deleteMenuBE, req)
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

function* maintainMenuSaga() {

  yield takeEvery(GET_LIST_MENU, fetchGetMenuList)

  yield takeEvery(GET_MENU2, fetchGetMenu)

  yield takeEvery(SAVE_MENU, fetchAddMenu)
  yield takeEvery(EDIT_MENU, fetchEditMenu)
  yield takeEvery(DELETE_MENU, fetchDeleteMenu)

}

export default maintainMenuSaga
=======
import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_MENU,
  EDIT_MENU,
  GET_LIST_MENU,
  GET_MENU2,
  SAVE_MENU
} from "./actionTypes"
import {
  respGetMenu2,
  respGetMenuList
} from "./actions"

import {
  deleteMenuBE,
  editMenuBE,
  getMaintainMenuBE,
  getMaintainMenuListBE,
  getMenuBE2,
  getMenuListBE2,
  saveMenuBE
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit } from "store/actions"

function* fetchGetMenuList({ payload: req }) {
  try {
    const response = yield call(getMaintainMenuListBE, req)
    if (response.status == 1) {
      yield put(respGetMenuList(response))
    } else {
      yield put(respGetMenuList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMenuList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetMenu({ payload: req }) {
  try {
    const response = yield call(getMaintainMenuBE, req)
    if (response.status == 1) {
      yield put(respGetMenu2(response))
    } else {
      yield put(respGetMenu2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMenu2({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddMenu({ payload: req }) {
  try {
    const response = yield call(saveMenuBE, req)
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

function* fetchEditMenu({ payload: req }) {
  try {
    
    const response = yield call(editMenuBE, req)
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

function* fetchDeleteMenu({ payload: req }) {
  try {
    const response = yield call(deleteMenuBE, req)
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

function* maintainMenuSaga() {

  yield takeEvery(GET_LIST_MENU, fetchGetMenuList)

  yield takeEvery(GET_MENU2, fetchGetMenu)

  yield takeEvery(SAVE_MENU, fetchAddMenu)
  yield takeEvery(EDIT_MENU, fetchEditMenu)
  yield takeEvery(DELETE_MENU, fetchDeleteMenu)

}

export default maintainMenuSaga
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
