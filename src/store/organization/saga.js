import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_DEPT_LIST_ORG, GET_ORGANIZATION_LIST
} from "./actionTypes"
import {
  respGetDeptListOrg, respGetOrganizationList
} from "./actions"

import {
  getDeptListOrgBE, getOrganizationListBE
} from "helpers/backend_helper"

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

function* organizationSaga() {

  yield takeEvery(GET_DEPT_LIST_ORG, fetchGetDeptListOrg)
  yield takeEvery(GET_ORGANIZATION_LIST, fetchGetOrganizationList)

}

export default organizationSaga
