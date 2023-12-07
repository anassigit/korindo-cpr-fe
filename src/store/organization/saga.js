import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_MAPPING_DEPT,
  EDIT_MAPPING_DEPT,
  GET_DEPT_LIST_ORG, GET_MEMBER_LIST_ORG, GET_ORGANIZATION_LIST, SAVE_MAPPING_DEPT
} from "./actionTypes"
import {
  respGetDeptListOrg,
  respGetMemberListOrg,
  respGetOrganizationList
} from "./actions"

import {
  deleteMappingDeptBE,
  editMappingDeptBE,
  getDeptListOrgBE, getMemberListOrgBE, getOrganizationListBE,
  saveMappingDeptBE
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit } from "store/actions"

function* fetchGetDeptListOrg({ payload: req }) {
  try {
    const response = yield call(getDeptListOrgBE, req)
    if (response.status == 1) {
      yield put(respGetDeptListOrg(response))
    } else {
      yield put(respGetDeptListOrg(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDeptListOrg({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetOrganizationList({ payload: req }) {
  try {
    const response = yield call(getOrganizationListBE, req)
    if (response.status == 1) {
      yield put(respGetOrganizationList(response))
    } else {
      yield put(respGetOrganizationList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetOrganizationList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetMemberList({ payload: req }) {
  try {
    const response = yield call(getMemberListOrgBE, req)
    if (response.status == 1) {
      yield put(respGetMemberListOrg(response))
    } else {
      yield put(respGetMemberListOrg(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMemberListOrg({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchSaveMappingDept({ payload: req }) {
  try {
    const response = yield call(saveMappingDeptBE, req)
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
function* fetchEditMappingDept({ payload: req }) {
  try {
    const response = yield call(editMappingDeptBE, req)
    if (response.status == 1) {
      yield put(msgEdit(response))
    } else {
      yield put(msgEdit(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Update Data" }))
  }
}

function* fetchDeleteMappingDept({ payload: req }) {
  try {
    const response = yield call(deleteMappingDeptBE, req)
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

function* organizationSaga() {

  yield takeEvery(GET_DEPT_LIST_ORG, fetchGetDeptListOrg)
  yield takeEvery(GET_ORGANIZATION_LIST, fetchGetOrganizationList)
  yield takeEvery(GET_MEMBER_LIST_ORG, fetchGetMemberList)
  yield takeEvery(SAVE_MAPPING_DEPT, fetchSaveMappingDept)
  yield takeEvery(EDIT_MAPPING_DEPT, fetchEditMappingDept)
  yield takeEvery(DELETE_MAPPING_DEPT, fetchDeleteMappingDept)

}

export default organizationSaga
