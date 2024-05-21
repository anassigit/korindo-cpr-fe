import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import { ReactSession } from 'react-client-session';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect, useDispatch, useSelector } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// users
import user1 from "../../../assets/images/users/userprofil.png"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getInfoData } from "store/actions";

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const history = useHistory()
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(false)
  const [bintang, setBintang] = useState(false)

  const appGetInfo = useSelector((state) => state.dashboardReducer.respGetInfo);

  const [username, setusername] = useState("Admin")
  const [member_id, setmember_id] = useState("")
  const [profile_url, setprofile_url] = useState("")

  useEffect(() => {
    dispatch(getInfoData())
  }, [])

  useEffect(() => {

    if (localStorage.getItem("user")) {
      const u = localStorage.getItem("user")

      const m = localStorage.getItem("member_id")
      const p = localStorage.getItem("profile_url")
      setusername(u?.replace(/"/g, ''));
      setmember_id(m?.replace(/"/g, ''));
      setprofile_url(p?.replace(/"/g, ''));
    }
  }, [props.success])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={bintang}
        toggle={() => setBintang(!bintang)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item"
          id="page-dropdown"
          tag="button"
        >
          <span className="d-none d-xl-inline-block ms-2 me-1">Bintang Saya</span>
          <i className="mdi mdi-star-circle text-warning opacity-0" style={{ position: "absolute" }} />
          <i className="mdi mdi-star-circle text-warning" style={{ position: "absolute", fontSize: "18px", top: 12 }} />
        </DropdownToggle>
        <DropdownMenu className="dropdown-star-detail">
          <a className="dropdown-item d-flex justify-content-between" style={{ width: "16rem" }}>
            <span>Sisa Bintang</span>
            <div>
              <i className="bx bxs-star font-size-16 align-middle me-1 text-warning" />
              {appGetInfo?.data?.UsedCount}
            </div>
          </a>
          <div className="dropdown-divider" />
          <a className="dropdown-item d-flex justify-content-between" style={{ width: "16rem" }}>
            <span>Bintang yang diberikan</span>
            <div>
              <i className="bx bxs-star font-size-16 align-middle me-1 text-warning" />
              {appGetInfo?.data?.sent}
            </div>
          </a>
          <div className="dropdown-divider" />
          <a className="dropdown-item d-flex justify-content-between" style={{ width: "16rem" }}>
            <span>Bintang yang diterima</span>
            <div>
              <i className="bx bxs-star font-size-16 align-middle me-1 text-warning" />
              {appGetInfo?.data?.received}
            </div>
          </a>
        </DropdownMenu>

      </Dropdown>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <a
          onClick={() => ReactSession.set('appDetailRecommendationData', member_id)}
          href="/home/detail"
        >
          <img
            className="rounded-circle header-profile-user mx-3"
            style={{
              objectFit: "cover",
              objectPosition: "center top"
            }}
            src={profile_url || user1}
            alt="Header Avatar"
            onClick={() => setFlagForDashboard(true)}
          />
        </a>
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          style={{ borderLeft: "2px solid #2596BE" }}
          tag="button"
        >
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {/* <Link to="/app007" className="dropdown-item">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            <span>{props.t("Change User Data")}</span>
          </Link>
          <div className="dropdown-divider" /> */}
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withTranslation()(ProfileMenu)
// export default withRouter(
//   connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
// )
