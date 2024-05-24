<<<<<<< HEAD
import { call, put, takeEvery } from "redux-saga/effects"

import {
  ADD_RECOMMEND,
  DELETE_RECOMMEND,
  EDIT_RECOMMEND,
  GET_DEPT,
  GET_MEMBER_LIST,
  GET_RECOMMEND,
  GET_RECOMMEND_LIST,
  GET_SEARCH,
  GET_STICKER_LIST,
  MSG_ADD,
  SUBMIT_RECOMMEND
} from "./actionTypes"
import {
  msgAdd,
  msgDelete,
  msgEdit,
  respGetDept,
  respGetMemberList, respGetRecommend, respGetRecommendList, respGetSearch, respGetStickerList
} from "./actions"

import {
  addRecommendBE,
  deleteRecommendBE,
  editRecommendBE,
  getDeptBE,
  getMemberListBE, getRecommendBE, getRecommendListBE, getSearchBE, getStickerListBE, submitRecommendBE
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

function* fetchGetStickerList({ payload: req }) {
  try {
    const response = yield call(getStickerListBE, req)
    if (response.status == 1) {
      yield put(respGetStickerList(response))
    } else {
      yield put(respGetStickerList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetStickerList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetRecommendList({ payload: req }) {
  try {
    const response = yield call(getRecommendListBE, req)
    if (response.status == 1) {
      yield put(respGetRecommendList(response))
    } else {
      yield put(respGetRecommendList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRecommendList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetRecommend({ payload: req }) {
  try {
    const response = yield call(getRecommendBE, req)
    if (response.status == 1) {
      yield put(respGetRecommend(response))
    } else {
      yield put(respGetRecommend(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRecommend({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddRekomendasi({ payload: req }) {
  try {
    const response = yield call(addRecommendBE, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Save Data" }))
  }
}

function* fetchEditRekomendasi({ payload: req }) {
  try {
    const response = yield call(editRecommendBE, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Edit Data" }))
  }
}

function* fetchDeleteRekomendasi({ payload: req }) {
  try {
    const response = yield call(deleteRecommendBE, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({ "status": 0, "message": "Error Delete Data" }))
  }
}

function* fetchSubmitRekomendasi({ payload: req }) {
  try {
    const response = yield call(submitRecommendBE, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Save Data" }))
  }
}

function* rekomendasiSaga() {
  
  yield takeEvery(GET_DEPT, fetchGetDept)
  yield takeEvery(GET_MEMBER_LIST, fetchGetMemberList)
  yield takeEvery(GET_SEARCH, fetchGetSearch)
  yield takeEvery(GET_STICKER_LIST, fetchGetStickerList)
  yield takeEvery(GET_RECOMMEND_LIST, fetchGetRecommendList)
  yield takeEvery(GET_RECOMMEND, fetchGetRecommend)
  yield takeEvery(ADD_RECOMMEND, fetchAddRekomendasi)
  yield takeEvery(EDIT_RECOMMEND, fetchEditRekomendasi)
  yield takeEvery(DELETE_RECOMMEND, fetchDeleteRekomendasi)
  yield takeEvery(SUBMIT_RECOMMEND, fetchSubmitRekomendasi)
  
}

export default rekomendasiSaga
=======
import { call, put, takeEvery } from "redux-saga/effects"

import {
  ADD_RECOMMEND,
  DELETE_RECOMMEND,
  EDIT_RECOMMEND,
  GET_DEPT,
  GET_MEMBER_LIST,
  GET_RECOMMEND,
  GET_RECOMMEND_LIST,
  GET_SEARCH,
  GET_STICKER_LIST,
  MSG_ADD,
  SUBMIT_RECOMMEND
} from "./actionTypes"
import {
  msgAdd,
  msgDelete,
  msgEdit,
  respGetDept,
  respGetMemberList, respGetRecommend, respGetRecommendList, respGetSearch, respGetStickerList
} from "./actions"

import {
  addRecommendBE,
  deleteRecommendBE,
  editRecommendBE,
  getDeptBE,
  getMemberListBE, getRecommendBE, getRecommendListBE, getSearchBE, getStickerListBE, submitRecommendBE
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

function* fetchGetStickerList({ payload: req }) {
  try {
    const response = yield call(getStickerListBE, req)
    if (response.status == 1) {
      yield put(respGetStickerList(response))
    } else {
      yield put(respGetStickerList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetStickerList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetRecommendList({ payload: req }) {
  try {
    const response = yield call(getRecommendListBE, req)
    if (response.status == 1) {
      yield put(respGetRecommendList(response))
    } else {
      yield put(respGetRecommendList(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRecommendList({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchGetRecommend({ payload: req }) {
  try {
    const response = yield call(getRecommendBE, req)
    if (response.status == 1) {
      yield put(respGetRecommend(response))
    } else {
      yield put(respGetRecommend(response))
    }
  } catch (error) {
    console.log(error);
    yield put(respGetRecommend({ "status": 0, "message": "Error Get Data" }))
  }
}

function* fetchAddRekomendasi({ payload: req }) {
  try {
    const response = yield call(addRecommendBE, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Save Data" }))
  }
}

function* fetchEditRekomendasi({ payload: req }) {
  try {
    const response = yield call(editRecommendBE, req)
    yield put(msgEdit(response))
  } catch (error) {
    console.log(error);
    yield put(msgEdit({ "status": 0, "message": "Error Edit Data" }))
  }
}

function* fetchDeleteRekomendasi({ payload: req }) {
  try {
    const response = yield call(deleteRecommendBE, req)
    yield put(msgDelete(response))
  } catch (error) {
    console.log(error);
    yield put(msgDelete({ "status": 0, "message": "Error Delete Data" }))
  }
}

function* fetchSubmitRekomendasi({ payload: req }) {
  try {
    const response = yield call(submitRecommendBE, req)
    yield put(msgAdd(response))
  } catch (error) {
    console.log(error);
    yield put(msgAdd({ "status": 0, "message": "Error Save Data" }))
  }
}

function* rekomendasiSaga() {
  
  yield takeEvery(GET_DEPT, fetchGetDept)
  yield takeEvery(GET_MEMBER_LIST, fetchGetMemberList)
  yield takeEvery(GET_SEARCH, fetchGetSearch)
  yield takeEvery(GET_STICKER_LIST, fetchGetStickerList)
  yield takeEvery(GET_RECOMMEND_LIST, fetchGetRecommendList)
  yield takeEvery(GET_RECOMMEND, fetchGetRecommend)
  yield takeEvery(ADD_RECOMMEND, fetchAddRekomendasi)
  yield takeEvery(EDIT_RECOMMEND, fetchEditRekomendasi)
  yield takeEvery(DELETE_RECOMMEND, fetchDeleteRekomendasi)
  yield takeEvery(SUBMIT_RECOMMEND, fetchSubmitRekomendasi)
  
}

export default rekomendasiSaga
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
