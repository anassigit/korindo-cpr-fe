import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import LovSaga from "./lov/saga"
import LayoutSaga from "./layout/saga"

import menuSaga from "./menu/saga"
import dashBoardSaga from "./dashboard/saga"

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(LayoutSaga),
    fork(menuSaga),
    fork(LovSaga),
    fork(dashBoardSaga),
  ])
}
