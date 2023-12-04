import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_DEPT_LIST_ORG, GET_ORGANIZATION_LIST, SAVE_MAPPING_DEPT
} from "./actionTypes"
import {
  respGetDeptListOrg, respGetOrganizationList
} from "./actions"

import {
  getDeptListOrgBE, getOrganizationListBE,
  saveMappingDeptBE
} from "helpers/backend_helper"
import { msgAdd } from "store/actions"

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

function* organizationSaga() {

  yield takeEvery(GET_DEPT_LIST_ORG, fetchGetDeptListOrg)
  yield takeEvery(GET_ORGANIZATION_LIST, fetchGetOrganizationList)
  yield takeEvery(SAVE_MAPPING_DEPT, fetchSaveMappingDept)

}

export default organizationSaga
