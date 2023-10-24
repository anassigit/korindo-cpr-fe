import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import ComboSaga from "./combo/saga"
import GetDataSaga from "./donwloaddata/saga"
import rekomendasiSaga from "./home/saga"
import LayoutSaga from "./layout/saga"

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(GetDataSaga),
    fork(LayoutSaga),
    fork(ComboSaga),
    fork(rekomendasiSaga),
  ])
}
