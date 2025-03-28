import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_MAPPING_DEPT,
  DELETE_MAPPING_MEMBER,
  EDIT_MAPPING_DEPT,
  EDIT_MAPPING_MEMBER,
  GET_DEPT_LIST_ORG, GET_MEMBER_LIST_FOR_ADD, GET_MEMBER_LIST_ORG, GET_ORGANIZATION_LIST, RESET_SCORE_ORGANIZATION, SAVE_MAPPING_DEPT, SAVE_MAPPING_MEMBER
} from "./actionTypes"
import {
  respGetDeptListOrg,
  respGetMemberListForAdd,
  respGetMemberListOrg,
  respGetOrganizationList,
  respResetScoreOrganization
} from "./actions"

import {
  deleteMappingDeptBE,
  deleteMappingMemberBE,
  editMappingDeptBE,
  editMappingMemberBE,
  getDeptListOrgBE, getMemberListForAddBE, getMemberListOrgBE, getOrganizationListBE,
  resetScoreOrgBE,
  saveMappingDeptBE,
  saveMappingMemberBE
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

function* fetchGetMemberListForAdd({ payload: req }) {
  try {
    const response = yield call(getMemberListForAddBE, req)
    if (response.status == 1) {
      yield put(respGetMemberListForAdd(response))
    } else {
      yield put(respGetMemberListForAdd(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMemberListForAdd({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchResetScoreOrganization({ payload: req }) {
  try {
    const response = yield call(resetScoreOrgBE, req)
    if (response.status == 1) {
      yield put(respResetScoreOrganization(response))
    } else {
      yield put(respResetScoreOrganization(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respResetScoreOrganization({ "status": 0, "message": "Error Get Data" }))
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

function* fetchSaveMappingMember({ payload: req }) {
  try {
    const response = yield call(saveMappingMemberBE, req)
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

function* fetchEditMappingMember({ payload: req }) {
  try {
    const response = yield call(editMappingMemberBE, req)
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

function* fetchDeleteMappingMember({ payload: req }) {
  try {
    const response = yield call(deleteMappingMemberBE, req)
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
  yield takeEvery(GET_MEMBER_LIST_FOR_ADD, fetchGetMemberListForAdd)
  yield takeEvery(RESET_SCORE_ORGANIZATION, fetchResetScoreOrganization)
  yield takeEvery(SAVE_MAPPING_DEPT, fetchSaveMappingDept)
  yield takeEvery(SAVE_MAPPING_MEMBER, fetchSaveMappingMember)
  yield takeEvery(EDIT_MAPPING_DEPT, fetchEditMappingDept)
  yield takeEvery(EDIT_MAPPING_MEMBER, fetchEditMappingMember)
  yield takeEvery(DELETE_MAPPING_DEPT, fetchDeleteMappingDept)
  yield takeEvery(DELETE_MAPPING_MEMBER, fetchDeleteMappingMember)

}

export default organizationSaga
