import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import LovSaga from "./lov/saga"
import rekomendasiSaga from "./rekomendasi/saga"
import LayoutSaga from "./layout/saga"
import dashboardSaga from "./dashboard/saga"
import employeeOfMonYeaSaga from "./employeeofmonyea/saga"
import deptMasterSaga from "./deptmaster/saga"

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(LayoutSaga),
    fork(LovSaga),
    fork(rekomendasiSaga),
    fork(dashboardSaga),
    fork(employeeOfMonYeaSaga),
    fork(deptMasterSaga),
  ])
}
