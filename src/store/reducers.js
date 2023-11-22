import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import LovReducer from "./lov/reducer"
import rekomendasiReducer from "./rekomendasi/reducer"
import dashboardReducer from "./dashboard/reducer"
import employeeOfMonYeaReducer from "./employeeofmonyea/reducer"
import deptMasterReducer from "./deptmaster/reducer"
import locationMasterReducer from "./locationmaster/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  LovReducer,
  rekomendasiReducer,
  dashboardReducer,
  employeeOfMonYeaReducer,
  deptMasterReducer,
  locationMasterReducer,
})

export default rootReducer
