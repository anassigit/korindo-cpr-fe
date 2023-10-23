import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import ComboSaga from "./combo/saga"
import GetDataSaga from "./donwloaddata/saga"
import ssoSaga from "./home/saga"
import ReportJasperSaga from "./jasper/saga"
import LayoutSaga from "./layout/saga"
import LovSaga from "./lov/saga"

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(GetDataSaga),
    fork(LayoutSaga),
    fork(LovSaga),
    fork(ComboSaga),
    fork(ReportJasperSaga),
    fork(ssoSaga),
  ])
}
