import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_APPLICATION_ROLE_ACCESS,
  DELETE_APPLICATION_ROLE_USER,
  DELETE_ROLE,
  EDIT_APPLICATION_ROLE_ACCESS,
  EDIT_APPLICATION_ROLE_USER,
  EDIT_ROLE,
  GET_ACCESS_LIST_ROLE,
  GET_ACCESS_ROLE,
  GET_LIST_ROLE,
  GET_MENU_ROLE_LIST,
  GET_ROLE,
  GET_USER_LIST_ROLE,
  SAVE_APPLICATION_ROLE_ACCESS,
  SAVE_APPLICATION_ROLE_USER,
  SAVE_ROLE
} from "./actionTypes"
import {
  respGetAccessList,
  respGetAccessRole,
  respGetMenuRoleList,
  respGetRole,
  respGetRoleList,
  respGetUserRoleList
} from "./actions"

import {
  deleteAccessRoleBE,
  deleteRoleBE,
  deleteUserRoleBE,
  editAccessRoleBE,
  editRoleBE,
  editUserRoleBE,
  getAccessListBE,
  getAccessRoleBE,
  getMenuListBE,
  getRoleBE,
  getRoleListBE,
  getUserRoleListBE,
  saveAccessRoleBE,
  saveRoleBE,
  saveUserRoleBE
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit } from "store/actions"

function* fetchGetRoleList({ payload: req }) {
  try {
    const response = yield call(getRoleListBE, req)
    if (response.status == 1) {
      yield put(respGetRoleList(response))
    } else {
      yield put(respGetRoleList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRoleList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetAccessList({ payload: req }) {
  try {
    const response = yield call(getAccessListBE, req)
    if (response.status == 1) {
      yield put(respGetAccessList(response))
    } else {
      yield put(respGetAccessList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetAccessList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetUserRoleList({ payload: req }) {
  try {
    const response = yield call(getUserRoleListBE, req)
    if (response.status == 1) {
      yield put(respGetUserRoleList(response))
    } else {
      yield put(respGetUserRoleList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetUserRoleList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetRole({ payload: req }) {
  try {
    const response = yield call(getRoleBE, req)
    if (response.status == 1) {
      yield put(respGetRole(response))
    } else {
      yield put(respGetRole(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRole({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetAccessRole({ payload: req }) {
  try {
    const response = yield call(getAccessRoleBE, req)
    if (response.status == 1) {
      yield put(respGetAccessRole(response))
    } else {
      yield put(respGetAccessRole(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetAccessRole({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddRole({ payload: req }) {
  try {
    const response = yield call(saveRoleBE, req)
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

function* fetchEditRole({ payload: req }) {
  try {
    const response = yield call(editRoleBE, req)
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

function* fetchDeleteRole({ payload: req }) {
  try {
    const response = yield call(deleteRoleBE, req)
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

function* fetchAddAccessRole({ payload: req }) {
  try {
    const response = yield call(saveAccessRoleBE, req)
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

function* fetchEditAccessRole({ payload: req }) {
  try {
    const response = yield call(editAccessRoleBE, req)
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

function* fetchDeleteAccessRole({ payload: req }) {
  try {
    const response = yield call(deleteAccessRoleBE, req)
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

function* fetchAddAccessRoleUser({ payload: req }) {
  try {
    const response = yield call(saveUserRoleBE, req)
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

function* fetchEditAccessRoleUser({ payload: req }) {
  try {
    const response = yield call(editUserRoleBE, req)
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

function* fetchDeleteAccessRoleUser({ payload: req }) {
  try {
    const response = yield call(deleteUserRoleBE, req)
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

function* maintainRoleSaga() {

  yield takeEvery(GET_LIST_ROLE, fetchGetRoleList)
  yield takeEvery(GET_ACCESS_LIST_ROLE, fetchGetAccessList)
  yield takeEvery(GET_USER_LIST_ROLE, fetchGetUserRoleList)

  yield takeEvery(GET_ROLE, fetchGetRole)
  yield takeEvery(GET_ACCESS_ROLE, fetchGetAccessRole)

  yield takeEvery(SAVE_ROLE, fetchAddRole)
  yield takeEvery(EDIT_ROLE, fetchEditRole)
  yield takeEvery(DELETE_ROLE, fetchDeleteRole)

  yield takeEvery(SAVE_APPLICATION_ROLE_ACCESS, fetchAddAccessRole)
  yield takeEvery(EDIT_APPLICATION_ROLE_ACCESS, fetchEditAccessRole)
  yield takeEvery(DELETE_APPLICATION_ROLE_ACCESS, fetchDeleteAccessRole)

  yield takeEvery(SAVE_APPLICATION_ROLE_USER, fetchAddAccessRoleUser)
  yield takeEvery(EDIT_APPLICATION_ROLE_USER, fetchEditAccessRoleUser)
  yield takeEvery(DELETE_APPLICATION_ROLE_USER, fetchDeleteAccessRoleUser)

}

export default maintainRoleSaga