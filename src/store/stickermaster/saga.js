import { call, put, takeEvery } from "redux-saga/effects"

import {
  DELETE_STICKER,
  EDIT_STICKER,
  GET_LIST_STICKER2,
  GET_STICKER,
  SAVE_STICKER
} from "./actionTypes"
import {
  respGetSticker,
  respGetStickerList2
} from "./actions"

import {
  deleteStickerBE,
  editStickerBE,
  getStickerBE,
  getStickerListBE2, saveStickerBE
} from "helpers/backend_helper"
import { msgAdd, msgDelete, msgEdit } from "store/actions"

function* fetchGetStickerList({ payload: req }) {
  try {
    const response = yield call(getStickerListBE2, req)
    if (response.status == 1) {
      yield put(respGetStickerList2(response))
    } else {
      yield put(respGetStickerList2(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetStickerList2({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetSticker({ payload: req }) {
  try {
    const response = yield call(getStickerBE, req)
    if (response.status == 1) {
      yield put(respGetSticker(response))
    } else {
      yield put(respGetSticker(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetSticker({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddSticker({ payload: req }) {
  try {
    const response = yield call(saveStickerBE, req)
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

function* fetchEditSticker({ payload: req }) {
  try {
    const response = yield call(editStickerBE, req)
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

function* fetchDeleteSticker({ payload: req }) {
  try {
    const response = yield call(deleteStickerBE, req)
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

function* stickerMasterSaga() {

  yield takeEvery(GET_LIST_STICKER2, fetchGetStickerList)

  yield takeEvery(GET_STICKER, fetchGetSticker)

  yield takeEvery(SAVE_STICKER, fetchAddSticker)
  yield takeEvery(EDIT_STICKER, fetchEditSticker)
  yield takeEvery(DELETE_STICKER, fetchDeleteSticker)

}

export default stickerMasterSaga
