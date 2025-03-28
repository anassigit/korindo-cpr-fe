import { call, put, takeEvery } from "redux-saga/effects"

import { ReactSession } from 'react-client-session';

import {
  ADD_REPORT,
  GET_BEST_LIST, GET_BEST_OF_MONTH_LIST, GET_BEST_OF_YEAR_LIST, GET_DETAIL_INFLUENCER, GET_INFO, GET_INFO_PROFILE, GET_LIST1, GET_REPORT_LIST
} from "./actionTypes"
import {
  msgAdd,
  respGetBestList, respGetBestOfMonthList, respGetBestOfYearList, respGetDetailInfluencer, respGetInfo, respGetInfoProfile, respGetList1, respGetReportList
} from "./actions"

import {
  addReportBE,
  getBestListBE, getBestOfMonthListBE, getBestOfYearListBE, getDetailInfluencerBE, getInfoMainRestBE, getInfoProfileBE, getListMainRestBE, getMenuBE, getReportListBE
} from "helpers/backend_helper"

function* fetchGetInfoProfile({ payload: req }) {
  try {
    const response = yield call(getInfoProfileBE, req)
    localStorage.setItem("user", response?.data?.memberName);
    localStorage.setItem("memberId", response?.data?.memberId);
    localStorage.setItem("profileUrl", response?.data?.profileUrl);

    const res = yield call(getMenuBE)
    if (res.status == 1) {
      let menuData = {}
      if (res?.data?.list) {
        menuData = {
          menu: res.data.list,
          menuType: 'cpr'
        }
      }
      
      localStorage.setItem("menu", JSON.stringify(menuData))
    }

    if (response.status == 1) {
      yield put(respGetInfoProfile(response))
    } else {
      yield put(respGetInfoProfile(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetInfoProfile({ "status": 0, "message": "Error Get Data" }))
  }
}
function* fetchGetList({ payload: req }) {
  try {fetchGetList
    const response = yield call(getListMainRestBE, req)
    if (response.status == 1) {
      yield put(respGetList1(response))
    } else {
      yield put(respGetList1(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetList1({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetInfo({ payload: req }) {
  try {
    const response = yield call(getInfoMainRestBE, req)
    if (response.status == 1) {
      yield put(respGetInfo(response))
    } else {
      yield put(respGetInfo(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetInfo({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetBestList({ payload: req }) {
  try {
    const response = yield call(getBestListBE, req)
    if (response.status == 1) {
      yield put(respGetBestList(response))
    } else {
      yield put(respGetBestList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetBestList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetBestOfMonthList({ payload: req }) {
  try {
    const response = yield call(getBestOfMonthListBE, req)
    if (response.status == 1) {
      yield put(respGetBestOfMonthList(response))
    } else {
      yield put(respGetBestOfMonthList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetBestOfMonthList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetBestOfYearList({ payload: req }) {
  try {
    const response = yield call(getBestOfYearListBE, req)
    if (response.status == 1) {
      yield put(respGetBestOfYearList(response))
    } else {
      yield put(respGetBestOfYearList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetBestOfYearList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetDetailInfluencer({ payload: req }) {
  try {
    const response = yield call(getDetailInfluencerBE, req)
    if (response.status == 1) {
      yield put(respGetDetailInfluencer(response))
    } else {
      yield put(respGetDetailInfluencer(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetDetailInfluencer({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetReportList({ payload: req }) {
  try {
    const response = yield call(getReportListBE, req)
    if (response.status == 1) {
      yield put(respGetReportList(response))
    } else {
      yield put(respGetReportList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetReportList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddReport({ payload: req }) {
  try {
    const response = yield call(addReportBE, req)
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

function* dashboardSaga() {

  yield takeEvery(GET_INFO_PROFILE, fetchGetInfoProfile)

  yield takeEvery(GET_LIST1, fetchGetList)
  yield takeEvery(GET_INFO, fetchGetInfo)
  yield takeEvery(GET_BEST_LIST, fetchGetBestList)
  yield takeEvery(GET_BEST_OF_MONTH_LIST, fetchGetBestOfMonthList)
  yield takeEvery(GET_BEST_OF_YEAR_LIST, fetchGetBestOfYearList)
  yield takeEvery(GET_DETAIL_INFLUENCER, fetchGetDetailInfluencer)
  yield takeEvery(GET_REPORT_LIST, fetchGetReportList)

  yield takeEvery(ADD_REPORT, fetchAddReport)

}

export default dashboardSaga
