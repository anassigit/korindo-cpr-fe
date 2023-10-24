import { call, put, takeEvery } from "redux-saga/effects"

import {
  EDIT_SERVICE_DEPT,
  EDIT_SERVICE_MEMBER,
  GET_DEPT,
  GET_DETAIL_DEPT,
  GET_MEMBER_DETAIL,
  GET_MEMBER_LIST,
  GET_REPORT,
  GET_SEARCH,
  GET_SERVICE_DEPT,
  GET_SERVICE_MEMBER,
} from "./actionTypes"
import {
  respGetDept, respGetDetailDept, respGetMemberDetail, respGetMemberList, respGetSearch, respGetServiceDept, respGetServiceMember, msgEdit
} from "./actions"

import {
  editServiceDeptBE,
  editServiceMemberBE,
  getDeptBE, getDetailDeptBE, getMemberDetailBE, getMemberListBE, getSearchBE, getServiceDeptBE, getServiceMember, getServiceMemberBE
} from "helpers/backend_helper"

function* fetchGetDept({ payload: req }) {
  try {
    const response = yield call(getDeptBE, req)
    if (response.status == 1) {
      yield put(respGetDept(response))
    } else {
      yield put(respGetDept(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDept({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetDetailDept({ payload: req }) {
  try {
    const response = yield call(getDetailDeptBE, req)
    if (response.status == 1) {
      yield put(respGetDetailDept(response))
    } else {
      yield put(respGetDetailDept(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDetailDept({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetMemberList({ payload: req }) {
  try {
    const response = yield call(getMemberListBE, req)
    if (response.status == 1) {
      yield put(respGetMemberList(response))
    } else {
      yield put(respGetMemberList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMemberList({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetMemberDetail({ payload: req }) {
  try {
    const response = yield call(getMemberDetailBE, req)
    if (response.status == 1) {
      yield put(respGetMemberDetail(response))
    } else {
      yield put(respGetMemberDetail(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetMemberDetail({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetSearch({ payload: req }) {
  try {
    const response = yield call(getSearchBE, req)
    if (response.status == 1) {
      yield put(respGetSearch(response))
    } else {
      yield put(respGetSearch(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetSearch({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetServiceMember({ payload: req }) {
  try {
    const response = yield call(getServiceMemberBE, req)
    if (response.status == 1) {
      yield put(respGetServiceMember(response))
    } else {
      yield put(respGetServiceMember(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetServiceMember({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetServiceDept({ payload: req }) {
  try {
    const response = yield call(getServiceDeptBE, req)
    if (response.status == 1) {
      yield put(respGetServiceDept(response))
    } else {
      yield put(respGetServiceDept(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetServiceDept({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchEditServiceDept({ payload: req }) {
  try {
    const response = yield call(editServiceDeptBE, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({"status" : 0, "message" : "Error Get Data"}))
  }
}
function* fetchEditServiceMember({ payload: req }) {
  try {
    const response = yield call(editServiceMemberBE, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* rekomendasiSaga() {

  yield takeEvery(GET_DEPT, fetchGetDept)
  yield takeEvery(GET_DETAIL_DEPT, fetchGetDetailDept)
  yield takeEvery(GET_MEMBER_LIST, fetchGetMemberList)
  yield takeEvery(GET_MEMBER_DETAIL, fetchGetMemberDetail)
  yield takeEvery(GET_SEARCH, fetchGetSearch)
  yield takeEvery(GET_SERVICE_MEMBER, fetchGetServiceMember)
  yield takeEvery(GET_SERVICE_DEPT, fetchGetServiceDept)
  yield takeEvery(EDIT_SERVICE_DEPT, fetchEditServiceDept)
  yield takeEvery(EDIT_SERVICE_MEMBER, fetchEditServiceMember)


}

export default rekomendasiSaga
