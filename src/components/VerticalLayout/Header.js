import PropTypes from 'prop-types';
import React from "react";

import { connect, useDispatch, useSelector } from "react-redux";

// Reactstrap
import { Alert, Form, FormFeedback, Input, Label } from "reactstrap";

import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

// actions
import { reloginUser } from "../../store/actions";

//i18n
import { withTranslation } from "react-i18next";

import { useFormik } from "formik";

import * as Yup from "yup";

// Redux Store
import {
  changeSidebarType,
  showRightSidebarAction,
  toggleLeftmenu,
} from "../../store/actions";

const Header = props => {
  const dispatch = useDispatch();
  // const [search, setsearch] = useState(false);


  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  document.body.classList.add("vertical-collpsed");

  function tToggle() {

    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("vertical-collpsed");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      // username: Yup.string().required("Input username anda"),
      // password: Yup.string().required("Input Password"),
    }),
    onSubmit: (values) => {

      window.open('', '_self');
      window.close();

    }
  });

  const error = useSelector(state => {
    return (typeof state.Login !== "undefined" && typeof state.Login.error !== "undefined" ? state.Login.error : "");
  });

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    dispatch(reloginUser(values, props.history));
  };



  return (
    <React.Fragment>
      <header id="page-topbar">
        <div style={{ boxShadow: "1px 3px 5px #918989", borderBottom: "4px solid #A084DC" }} className="navbar-header">
          <div className="d-flex">

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item "
              id="vertical-menu-btn"
            >
              <i className="bx bx-customize fa-lg" />
            </button>

            {/* <form id="reloginForm" className="form-horizontal" style={{display: "none", marginTop: '300px', marginLeft: '500px'}}> */}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }} id="reloginForm" className="form-horizontal modal" style={{ backgroundColor: '#00000090', margin: 'auto', padding: '20px', marginLeft: '0%' }}>
              <div style={{ backgroundColor: '#fefefe', margin: 'auto', width: '600px', padding: '10px 25px 10px 25px', borderRadius: '25px' }}>
                <div className="modal-header">
                  <h5 className="modal-title mt-0">
                    Token Expired
                  </h5>
                </div>
                <div className="modal-body">
                  {error ? <Alert color="danger">{error}</Alert> : null}
                  <div style={{ fontSize: '14px' }}>
                    Token sudah kedaluwarsa, Harap masuk kembali melalui GreenWare
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    <span className='opacity-50 unselectable'>(Menekan tombol close akan pindah aplikasi)</span>
                  </div>
                  <br />
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Form>


          </div>
          <div className="d-flex">
            {/* <form style={{boxShadow: '1px 1px 2px #fffefe'}} className="p-3">
                        <div className="form-group m-0">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search ..."
                            />
                            <div className="input-group-append">
                              <button className="btn btn-dark" type="submit">
                                <i className="fas fa-search" />
                              </button>
                            </div>
                          </div>
                        </div>
              </form> */}

            {/* <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setsearch(!search);
                }}
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
              >
                <i className="fas fa-search" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <LanguageDropdown /> */}

            {/* <Dropdown
              className="d-none d-lg-inline-block ms-1"
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp);
              }}
            >
              <DropdownToggle
                className="btn header-item noti-icon "
                tag="button"
              >
                <i className="bx bx-customize" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
                <div className="px-lg-2">
                  <Row className="no-gutters">
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={github} alt="Github" />
                        <span>GitHub</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={bitbucket} alt="bitbucket" />
                        <span>Bitbucket</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={dribbble} alt="dribbble" />
                        <span>Dribbble</span>
                      </Link>
                    </Col>
                  </Row>

                  <Row className="no-gutters">
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={dropbox} alt="dropbox" />
                        <span>Dropbox</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={mail_chimp} alt="mail_chimp" />
                        <span>Mail Chimp</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={slack} alt="slack" />
                        <span>Slack</span>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </DropdownMenu>
            </Dropdown> */}

            {/* <div className="dropdown d-none d-lg-inline-block ms-2">
              <button
                type="button"
                onClick={() => {
                  window.location.reload(); 
                }}
                className="btn header-item noti-icon "
                data-toggle="reload"
              >
                <i className="bx bx-sync" />
              </button>
            </div>


            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon "
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen" />
              </button>
            </div> */}

            {/* <NotificationDropdown /> */}
            <ProfileMenu />


          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
  history: PropTypes.object,
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
