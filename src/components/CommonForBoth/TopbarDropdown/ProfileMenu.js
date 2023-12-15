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
import { getInfoData, getInfoProfileData } from "store/actions";

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const history = useHistory()
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(false)
  const [bintang, setBintang] = useState(false)

  const appGetInfo = useSelector((state) => state.dashboardReducer.respGetInfo);

  const [username, setusername] = useState("Admin")
  const [memberId, setmember_id] = useState("")
  const [profileUrl, setprofile_url] = useState("")

  useEffect(() => {
    dispatch(getInfoData())
  }, [])


  // useEffect(() => {
  //   debugger
  //   if (localStorage.getItem("user")) {
  //     const u = localStorage.getItem("user")

  //     const m = localStorage.getItem("memberId")
  //     const p = localStorage.getItem("profileUrl")
  //     setusername(u?.replace(/"/g, ''));
  //     setmember_id(m?.replace(/"/g, ''));
  //     setprofile_url(p?.replace(/"/g, ''));
  //   }
  // }, [appGetInfo])

  const profile = useSelector(state => (
    state.dashboardReducer.respGetInfoProfile
  ));


  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    const storedMemberId = localStorage.getItem("memberId");
    const storedProfileUrl = localStorage.getItem("profileUrl");

    // Check if the stored values are wrapped in double quotes before updating the state
    const isWrappedInQuotes = (value) => /^".*"$/.test(value);

    if (isWrappedInQuotes(storedUser)) {
      setusername(storedUser.replace(/"/g, ''));
    } else {
      setusername(storedUser);
    }
    if (isWrappedInQuotes(storedMemberId)) {
      setmember_id(storedMemberId.replace(/"/g, ''));
    } else {
      setmember_id(storedMemberId);
    }
    if (isWrappedInQuotes(storedProfileUrl)) {
      setprofile_url(storedProfileUrl.replace(/"/g, ''));
    } else {
      setprofile_url(storedProfileUrl);
    }
  }, [props.success, profile]);

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
          <span style={{ fontSize: "14px" }} className="d-none d-xl-inline-block ms-2 me-1">Bintang Saya</span>
          <i className="mdi mdi-star-circle text-warning opacity-0" style={{ position: "absolute" }} />
          <i className="mdi mdi-star-circle text-warning" style={{ position: "absolute", fontSize: "18px", top: 12 }} />
        </DropdownToggle>
        <DropdownMenu className="dropdown-star-detail">
          <a className="dropdown-item d-flex justify-content-between" style={{ width: "20rem" }}>
            <span style={{ fontSize: "14px" }}>Sisa Bintang Hari Ini</span>
            <div>
              {appGetInfo?.data?.UsedCount >= 3 ? (
                <i className="bx bx-star font-size-16 align-middle me-1 text-warning" />
              ) : (
                <i className="bx bxs-star font-size-16 align-middle me-1 text-warning" />
              )}
              {appGetInfo?.data?.UsedCount >= 2 ? (
                <i className="bx bx-star font-size-16 align-middle me-1 text-warning" />
              ) : (
                <i className="bx bxs-star font-size-16 align-middle me-1 text-warning" />
              )}
              {appGetInfo?.data?.UsedCount >= 1 ? (
                <i className="bx bx-star font-size-16 align-middle me-1 text-warning" />
              ) : (
                <i className="bx bxs-star font-size-16 align-middle me-1 text-warning" />
              )}
            </div>
          </a>

          <div className="dropdown-divider" />
          <a 
            onClick={() => ReactSession.set('appDetailRecommendationData', memberId)}
            href="/home/riwayatpemberian"
            className="dropdown-item d-flex justify-content-between" style={{ width: "20rem" }}>
            <span style={{ fontSize: "14px" }}>Bintang yang diberikan</span>
            <div>
              <i className="bx bxs-star font-size-16 align-middle me-1 text-warning" />
              {appGetInfo?.data?.sent}
            </div>
          </a>
          <div className="dropdown-divider" />
          <a
            onClick={() => ReactSession.set('appDetailRecommendationData', memberId)}
            href="/home/detail"
            className="dropdown-item d-flex justify-content-between" style={{ width: "20rem" }}>
            <span style={{ fontSize: "14px" }}>Bintang yang diterima</span>
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
          onClick={() => ReactSession.set('appDetailRecommendationData', memberId)}
          href="/home/detail"
        >
          <img
            className="rounded-circle header-profile-user mx-3"
            style={{
              objectFit: "cover",
              objectPosition: "center top"
            }}
            src={profileUrl || user1}
            alt="Header Avatar"
            onClick={() => setFlagForDashboard(true)}
          />
        </a>
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          style={{ borderLeft: "2px solid #A084DC", cursor: "auto" }}
          tag="button"
        >
          <span style={{ fontSize: "14px" }} className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          {/* <i className="mdi mdi-chevron-down d-none d-xl-inline-block" /> */}
        </DropdownToggle>
        {/* <DropdownMenu className="dropdown-menu-end"> */}
        {/* <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span style={{ fontSize: "14px" }}>{props.t("Logout")}</span>
          </Link> */}
        {/* </DropdownMenu> */}
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
