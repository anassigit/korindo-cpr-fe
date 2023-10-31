import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import rekomendasiReducer from "./rekomendasi/reducer"
import dashboardReducer from "./dashboard/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  rekomendasiReducer,
  dashboardReducer,
})

export default rootReducer
