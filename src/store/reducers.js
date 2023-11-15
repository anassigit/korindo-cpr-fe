import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import LovReducer from "./lov/reducer"
import rekomendasiReducer from "./rekomendasi/reducer"
import dashboardReducer from "./dashboard/reducer"
import managementSystemReducer from "./managementsystem/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  LovReducer,
  rekomendasiReducer,
  dashboardReducer,
  managementSystemReducer,
})

export default rootReducer
