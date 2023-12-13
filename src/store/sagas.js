import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import LovSaga from "./lov/saga"
import manualSaga from "./manual/saga"
import rekomendasiSaga from "./rekomendasi/saga"
import LayoutSaga from "./layout/saga"
import dashboardSaga from "./dashboard/saga"
import employeeOfMonYeaSaga from "./employeeofmonyea/saga"
import deptMasterSaga from "./deptmaster/saga"
import locationMasterSaga from "./locationmaster/saga"
import positionMasterSaga from "./positionmaster/saga"
import levelMasterSaga from "./levelmaster/saga"
import memberMasterSaga from "./membermaster/saga"
import settingMasterSaga from "./settingmaster/saga"
import stickerMasterSaga from "./stickermaster/saga"
import organizationSaga from "./organization/saga"

import maintainRoleSaga from "./maintainrole/saga"

import menuSaga from "./menu/saga"

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(LayoutSaga),
    fork(menuSaga),
    fork(LovSaga),
    fork(manualSaga),
    fork(rekomendasiSaga),
    fork(dashboardSaga),
    fork(employeeOfMonYeaSaga),
    fork(deptMasterSaga),
    fork(locationMasterSaga),
    fork(positionMasterSaga),
    fork(levelMasterSaga),
    fork(memberMasterSaga),
    fork(settingMasterSaga),
    fork(stickerMasterSaga),
    fork(organizationSaga),

    fork(maintainRoleSaga),
  ])
}
