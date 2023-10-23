import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import ComboReducer from "./combo/reducer"
import LovReducer from "./lov/reducer"
import Login from "./auth/login/reducer"
import GetData from "./donwloaddata/reducer"
import ReportJasper from "./jasper/reducer"
import ssoReducer from "./home/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  GetData,
  LovReducer,
  ComboReducer,
  ReportJasper,
  ssoReducer,
})

export default rootReducer
