import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import menuReducer from "./menu/reducer"
import LovReducer from "./lov/reducer"
import manualReducer from "./manual/reducer"
import historyPemberianReducer from "./historypemberian/reducer"
import rekomendasiReducer from "./rekomendasi/reducer"
import dashboardReducer from "./dashboard/reducer"
import employeeOfMonYeaReducer from "./employeeofmonyea/reducer"
import deptMasterReducer from "./deptmaster/reducer"
import locationMasterReducer from "./locationmaster/reducer"
import positionMasterReducer from "./positionmaster/reducer"
import levelMasterReducer from "./levelmaster/reducer"
import memberMasterReducer from "./membermaster/reducer"
import settingMasterReducer from "./settingmaster/reducer"
import stickerMasterReducer from "./stickermaster/reducer"
import organizationReducer from "./organization/reducer"

import maintainRoleReducer from "./maintainrole/reducer"
import maintainMenuReducer from "./maintainmenu/reducer"

import laporanAllDataReducer from "./laporanalldata/reducer"
import laporanRekapReducer from "./laporanrekap/reducer"
import laporanDivRateReducer from "./laporandivrate/reducer"

import managementBoardReducer from "./managementboard/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  menuReducer,
  LovReducer,
  manualReducer,
  historyPemberianReducer,
  rekomendasiReducer,
  dashboardReducer,
  employeeOfMonYeaReducer,
  deptMasterReducer,
  locationMasterReducer,
  positionMasterReducer,
  levelMasterReducer,
  memberMasterReducer,
  settingMasterReducer,
  stickerMasterReducer,
  organizationReducer,
  
  maintainRoleReducer,
  maintainMenuReducer,

  laporanAllDataReducer,
  laporanRekapReducer,
  laporanDivRateReducer,

  managementBoardReducer,
})

export default rootReducer
