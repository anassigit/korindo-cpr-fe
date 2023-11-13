import { call, put, takeEvery} from "redux-saga/effects"

import { LOV_MENU_PARENT, LOV_USER, LOV_DIV, LOV_COMPANY, LOV_PLANT, LOV_MENU, LOV_POSITION, LOV_WILAYAH, LOV_PEKERJAAN, LOV_VENDOR, LOV_PETAK, LOV_PETAK2, 
          LOV_POHON, LOV_PEKERJAANHEADER, LOV_QC, LOV_QC2, LOV_KRITERIA, LOV_KEGIATAN, LOV_QCBAP, LOV_CLONE, LOV_CLONE2, LOV_STORE, LOV_PRODUCT, LOV_JARAK_TANAM,
        LOV_RUMUS_TEGAKAN,LOV_WILAYAH2} from "./actionTypes"
import { getWilayah2, msgLov } from "./actions"

import {getMenuParent, getUser, getDiv, getLovMenu, getLovCompany, getLovPlant, getLovPosition, getLovWilayah, getLovPekerjaan, getLovVendor, getLovPetak, getLovPetak2, 
        getLovPohon, getLovKegiatanHeader, getLovQc, getLovQc2, getLovKriteria, getLovkegiatan, getLovQcBap, getLovClone, getLovClone2, getLovStore, getLovProduct, getLovJarakTanam,
      getLovRumusTegakan,
      getLovWilayah2} from "helpers/backend_helper"


function* fetchGetMenuParent({ payload: req }) {
  try {
    const response = yield call(getMenuParent, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetUser({ payload: req }) {
  try {
    const response = yield call(getUser, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetDiv({ payload: req }) {
  try {
    const response = yield call(getDiv, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* fetchGetMenu({ payload: req }) {
  try {
    const response = yield call(getLovMenu, req)
    if(response.status == 1){
      yield put(msgLov(response))
    }else{
      yield put(msgLov(response))
    }
  } catch (error) {
    console.log(error);
    yield put(msgLov({"status" : 0, "message" : "Error Get Data"}))
  }
}

function* lovSaga() {
    
  yield takeEvery(LOV_MENU_PARENT, fetchGetMenuParent)
  yield takeEvery(LOV_USER, fetchGetUser)
  yield takeEvery(LOV_DIV, fetchGetDiv)
  yield takeEvery(LOV_MENU, fetchGetMenu)

}

export default lovSaga
