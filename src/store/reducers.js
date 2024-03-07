import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import dashboardReducer from "./dashboard/reducer"


const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  dashboardReducer,
})

export default rootReducer
