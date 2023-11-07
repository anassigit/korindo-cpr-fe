import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import rekomendasiSaga from "./rekomendasi/saga"
import LayoutSaga from "./layout/saga"
import dashboardSaga from "./dashboard/saga"
import managementSystemSaga from "./managementsystem/saga"

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(LayoutSaga),
    fork(rekomendasiSaga),
    fork(dashboardSaga),
    fork(managementSystemSaga),
  ])
}
