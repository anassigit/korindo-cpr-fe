import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// Dashboard
import Rekomendasi from "pages/Rekomendasi/Rekomendasi"
import Dashboard from "pages/Dashboard/Dashboard"
import DetailInfluencer from "pages/Dashboard/DetailInfluencer"

const authProtectedRoutes = [

  { path: "/home", component: Dashboard},
  { path: "/home/detail", component: DetailInfluencer},
  { path: "/korsoc000/forms/korsoc051", component: Rekomendasi},
  
  
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/home" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
]

export { publicRoutes, authProtectedRoutes }
