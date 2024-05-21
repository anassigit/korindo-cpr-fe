import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// Dashboard
import Rekomendasi from "pages/Rekomendasi/Rekomendasi"
import Dashboard from "pages/Dashboard/Dashboard"
import DetailInfluencer from "pages/Dashboard/DetailInfluencer"
import EmployeeOfMonYea from "pages/EmployeeOfMonYea/EmployeeOfMonYea"
import Manual from "pages/KetentuanCPR/Manual"
import Organization from "pages/Organization/Organization"
import DeptMaster from "pages/DeptMaster/DeptMaster"
import LocationMaster from "pages/LocationMaster/LocationMaster"
import LevelMaster from "pages/LevelMaster/LevelMaster"
import PositionMaster from "pages/PositionMaster/PositionMaster"
import SettingMaster from "pages/SettingMaster/SettingMaster"
import UserManualVideo from "pages/UserManual/UserManualVideo"
import UserManualPDF from "pages/UserManual/UserManualPDF"
import StickerMaster from "pages/StickerMaster/StickerMaster"
import MemberMaster from "pages/MemberMaster/MemberMaster"
import MaintainRole from "pages/MaintainRole/MaintainRole"
import HistoryPemberian from "pages/HistoryPemberian/HistoryPemberian"
import LaporanAllData from "pages/LaporanAllData/LaporanAllData"

const authProtectedRoutes = [

  { path: "/home", component: Dashboard},
  { path: "/home/detail", component: DetailInfluencer},
  { path: "/home/riwayatpemberian", component: HistoryPemberian},
  { path: "/korsoc000/forms/korsoc051", component: Rekomendasi},
  { path: "/korsoc000/forms/korsoc013", component: EmployeeOfMonYea},
  { path: "/korsoc000/forms/korsoc004", component: Organization},
  { path: "/korsoc000/forms/korsoc008", component: DeptMaster},
  { path: "/korsoc000/forms/korsoc011", component: LocationMaster},
  { path: "/korsoc000/forms/korsoc010", component: PositionMaster},
  { path: "/korsoc000/forms/korsoc009", component: LevelMaster},
  { path: "/korsoc000/forms/korsoc005", component: SettingMaster},
  { path: "/korsoc000/forms/korsoc006", component: StickerMaster},
  { path: "/korsoc000/forms/korsoc007", component: MemberMaster},

  { path: "/korsoc000/forms/korsoc003", component: MaintainRole},

  { path: "/korsoc000/forms/korsoc102", component: LaporanAllData},
  
  { path: "/korsoc000/forms/korsoc400", component: Manual},
  { path: "/korsoc000/forms/korsoc411", component: UserManualVideo},
  { path: "/korsoc000/forms/korsoc412", component: UserManualPDF},
  
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/home" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
]

export { publicRoutes, authProtectedRoutes }
