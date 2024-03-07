import React, { useState, useEffect, useRef } from "react"
import MetaTags from "react-meta-tags"
import "../../config"
import RootPageCustom from "../../common/RootPageCustom"
import BootstrapTable from "react-bootstrap-table-next"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  UncontrolledAlert,
} from "reactstrap"
import TableCustom from "common/TableCustom"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import DatePicker from "react-flatpickr"
import Select, { components } from "react-select"
import { useFormik } from "formik"

const InformationDetail = props => {
  return (
    <Container
      style={{ display: props.appInformationDetail ? "block" : "none" }}
      fluid
    >
      <Card>
        <CardHeader>
          <span className="mdi mdi-text-box-outline" style={{marginRight:"3px"}}/>
          View Applicant Information
        </CardHeader>
        <CardBody>
          <div className="col-4">
            <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
              <div className="col-4">
                <Label style={{ marginTop: "2px" }}>{"Full Name"}</Label>
              </div>
              <div className="col-8" style={{ marginTop: "-8px" }}>
                <Input
                  type="text"
                  disabled
                  // value={editRoleAccessFormik.values.roleAccessId}
                  // invalid={
                  //   editRoleAccessFormik.touched.roleAccessId &&
                  //   editRoleAccessFormik.errors.roleAccessId
                  //     ? true
                  //     : false
                  // }
                  // onChange={e =>
                  //   editRoleAccessFormik.setFieldValue(
                  //     "roleAccessId",
                  //     e.target.value
                  //   )
                  // }
                />
              </div>
            </div>
            <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
              <div className="col-4">
                <Label style={{ marginTop: "2px" }}>{"Birth Location"}</Label>
              </div>
              <div className="col-8" style={{ marginTop: "-8px" }}>
                <Input
                  type="text"
                  disabled
                  // value={editRoleAccessFormik.values.roleAccessId}
                  // invalid={
                  //   editRoleAccessFormik.touched.roleAccessId &&
                  //   editRoleAccessFormik.errors.roleAccessId
                  //     ? true
                  //     : false
                  // }
                  // onChange={e =>
                  //   editRoleAccessFormik.setFieldValue(
                  //     "roleAccessId",
                  //     e.target.value
                  //   )
                  // }
                />
              </div>
            </div>
            <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
              <div className="col-4">
                <Label style={{ marginTop: "2px" }}>{"Birth Date"}</Label>
              </div>
              <div className="col-8" style={{ marginTop: "-8px" }}>
                <Input
                  type="text"
                  disabled
                  // value={editRoleAccessFormik.values.roleAccessId}
                  // invalid={
                  //   editRoleAccessFormik.touched.roleAccessId &&
                  //   editRoleAccessFormik.errors.roleAccessId
                  //     ? true
                  //     : false
                  // }
                  // onChange={e =>
                  //   editRoleAccessFormik.setFieldValue(
                  //     "roleAccessId",
                  //     e.target.value
                  //   )
                  // }
                />
              </div>
            </div>
            <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
              <div className="col-4">
                <Label style={{ marginTop: "2px" }}>{"Phone Number"}</Label>
              </div>
              <div className="col-8" style={{ marginTop: "-8px" }}>
                <Input
                  type="text"
                  disabled
                  // value={editRoleAccessFormik.values.roleAccessId}
                  // invalid={
                  //   editRoleAccessFormik.touched.roleAccessId &&
                  //   editRoleAccessFormik.errors.roleAccessId
                  //     ? true
                  //     : false
                  // }
                  // onChange={e =>
                  //   editRoleAccessFormik.setFieldValue(
                  //     "roleAccessId",
                  //     e.target.value
                  //   )
                  // }
                />
              </div>
            </div>
            <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
              <div className="col-4">
                <Label style={{ marginTop: "2px" }}>{"Email"}</Label>
              </div>
              <div className="col-8" style={{ marginTop: "-8px" }}>
                <Input
                  type="text"
                  disabled
                  // value={editRoleAccessFormik.values.roleAccessId}
                  // invalid={
                  //   editRoleAccessFormik.touched.roleAccessId &&
                  //   editRoleAccessFormik.errors.roleAccessId
                  //     ? true
                  //     : false
                  // }
                  // onChange={e =>
                  //   editRoleAccessFormik.setFieldValue(
                  //     "roleAccessId",
                  //     e.target.value
                  //   )
                  // }
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <Button
        className="btn btn-danger my-2"
        onClick={() => {
          props.setAppDashboard(true)
          props.setAppInformationDetail(false)
        }}
      >
        <span className="mdi mdi-arrow-left" />
        {"Back"}
      </Button>
    </Container>
  )
}

InformationDetail.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  appInformationDetail: PropTypes.any,
  setAppInformationDetail: PropTypes.any,
  setAppDashboard: PropTypes.any,
}

export default withTranslation()(InformationDetail)
