import React, { useEffect, useState } from "react"
import { ReactSession } from 'react-client-session'
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container, Input, Row, Spinner, UncontrolledAlert, UncontrolledTooltip,
} from "reactstrap"
import { getDeptData, getSearchData, resetMessage } from "store/actions"
import '../../assets/scss/custom.scss'
import PropTypes from 'prop-types'
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import { getOrganizationListData } from "store/organization/actions"
import TabAddOrganisasi from "./TabAddOrganisasi"
import TabAddKaryawan from "./TabAddKaryawan"
import TabEditOrganisasi from "./TabEditOrganisasi"

const Organization = () => {

  const dispatch = useDispatch()

  const [appTabAdd, setAppTabAdd] = useState(true)
  const [appTabEdit, setAppTabEdit] = useState(false)
  const [appAddKaryawan, setAppAddKaryawan] = useState(false)

  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [appOrganizationMsg, setAppOrganizationMsg] = useState('')

  const [selectedDeptData, setSelectedDeptData] = useState({})
  const [selectedDeptName, setSelectedDeptName] = useState()

  const [selectedMemberData, setSelectedMemberData] = useState()

  const [appDetailDeptDataState, setAppDetailDeptDataState] = useState()
  const [collapser, setCollapser] = useState({
    "1": true,
    "2": true,
  })

  const appOrganizationListData = useSelector((state) => state.organizationReducer.respGetOrganizationList)

  useEffect(() => {

    dispatch(getOrganizationListData())
    setLoadingSpinner(true)
  }, [])

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  useEffect(() => {
    if (appOrganizationListData.status == '1') {
      setLoadingSpinner(false)
    } else if (appOrganizationListData.status == '0') {
      setLoadingSpinner(true)
    }
  }, [appOrganizationListData])

  useEffect(() => {
    ReactSession.set('selectedDeptName', selectedDeptName)
  }, [selectedDeptName])

  useEffect(() => {

    if (selectedDeptData) {
      ReactSession.set('collapser', collapser)
      ReactSession.remove('selectedMemberData')
    } else {
      setSelectedDeptData(ReactSession.get('selectedDeptData'))
    }
  }, [selectedDeptData])

  const CollapsibleList = ({ data, collapser, setCollapser, selectedDeptData, setSelectedDeptData, setSelectedDeptName, depth = 0 }) => {


    const currentDepth = depth + 1;
    const paddingLeft = `${currentDepth * 0.8}vw`;
    return (
      <React.Fragment>
        {Array.isArray(data) ?
          data.map((item, index) => {

            return (
              <React.Fragment key={index}>
                <Row style={{ marginBottom: "8px" }}>
                  <div style={{
                    color: "#3F4031",
                    paddingLeft,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}>
                    {item.childList.length > 0 ? (
                      <span
                        className={collapser[item.org_id] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                        onClick={() => {
                          setCollapser((prevCollapser) => {
                            return {
                              ...prevCollapser,
                              [item.org_id]: !prevCollapser[item.org_id],
                            };
                          });
                        }}
                      ></span>
                    ) :
                      <span
                        className={"mdi mdi-minus-box opacity-0"}
                      ></span>
                    }
                    &nbsp;
                    <span className="mdi mdi-domain"></span>
                    <a
                      style={{
                        color: "#4c4c4c",
                        fontWeight: collapser[item.org_id] || selectedDeptData.org_id === item.org_id ? "bold" : "normal",
                        cursor: "pointer",
                      }}
                      className="unselectable-two"
                      onClick={(e) => {
                        if (item.childList.length > 0) {
                          setCollapser((prevCollapser) => {
                            return {
                              ...prevCollapser,
                              [item.org_id]: !prevCollapser[item.org_id],
                            };
                          });
                        }
                        ReactSession.remove('selectedMemberData');
                        setSelectedDeptData(item);
                        setSelectedDeptName(item.dept_name);
                        ReactSession.set('selectedDeptData', item);
                      }}
                    >
                      &nbsp;
                      <span
                        id={item.org_id}
                      >
                        {item.dept_name}
                      </span>
                      {item.org_id && (
                        <UncontrolledTooltip target={() => document.getElementById(item.org_id)} placement="top">
                          {item.dept_name}
                        </UncontrolledTooltip>
                      )}
                    </a>
                  </div>
                </Row>

                {item.childList && collapser[item.org_id] === true && (
                  <CollapsibleList
                    data={item.childList}
                    collapser={collapser}
                    setCollapser={setCollapser}
                    selectedDeptData={selectedDeptData}
                    setSelectedDeptData={setSelectedDeptData}
                    setSelectedDeptName={setSelectedDeptName}
                    depth={currentDepth}
                  />
                )}
              </React.Fragment>
            )
          })
          :
          data ?
            (
              <React.Fragment>
                <Row style={{ marginBottom: "8px" }}>
                  <div style={{ color: "#3F4031", paddingLeft }}>
                    {data.childList.length > 0 ? (
                      <span
                        className={collapser[data.org_id] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                        onClick={() => {
                          setCollapser((prevCollapser) => {
                            return {
                              ...prevCollapser,
                              [data.org_id]: !prevCollapser[data.org_id],
                            };
                          });
                        }}
                      ></span>
                    ) :
                      <span
                        className={"mdi mdi-minus-box opacity-0"}
                      ></span>
                    }
                    &nbsp;
                    <span className="mdi mdi-domain"></span>
                    <a
                      style={{
                        color: "#4c4c4c",
                        fontWeight: collapser[data.org_id] || selectedDeptData.org_id === data.org_id ? "bold" : "normal",
                        cursor: "pointer",
                      }}
                      className="unselectable-two"
                      onClick={(e) => {
                        ReactSession.remove('selectedMemberData');
                        setSelectedDeptData(data);
                        setSelectedDeptName(data.dept_name);
                        ReactSession.set('selectedDeptData', org_id);
                      }}
                    >
                      &nbsp;
                      <span
                        style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                        id={data.org_id}
                      >
                        {data.dept_name}
                      </span>
                      {data.org_id && (
                        <UncontrolledTooltip target={() => document.getElementById(data.org_id)} placement="top">
                          {data.dept_name}
                        </UncontrolledTooltip>
                      )}
                    </a>
                  </div>
                </Row>

                {data.childList && collapser[data.org_id] === true && (
                  <CollapsibleList
                    data={data.childList}
                    collapser={collapser}
                    setCollapser={setCollapser}
                    selectedDeptData={selectedDeptData}
                    setSelectedDeptData={setSelectedDeptData}
                    setSelectedDeptName={setSelectedDeptName}
                    depth={currentDepth}
                  />
                )}
              </React.Fragment>
            )
            :
            null
        }
      </React.Fragment>
    );
  };

  CollapsibleList.propTypes = {
    data: PropTypes.any,
    collapser: PropTypes.object,
    setCollapser: PropTypes.func,
    selectedDeptData: PropTypes.string,
    setSelectedDeptData: PropTypes.func,
    setSelectedDeptName: PropTypes.func,
    depth: PropTypes.any,
  };

  const handleChangeTab = (e) => {

    if (e === 'addOrg') {
      setAppTabAdd(true)
      setAppTabEdit(false)
      setAppAddKaryawan(false)
    } else if (e === 'editOrg') {
      setAppTabAdd(false)
      setAppTabEdit(true)
      setAppAddKaryawan(false)
    } else if (e === 'addKaryawan') {
      setAppTabAdd(false)
      setAppTabEdit(false)
      setAppAddKaryawan(true)
    }

  }

  return (
    <RootPageCustom msgStateGet={null} msgStateSet={null}
      componentJsx={
        <React.Fragment>
          {appOrganizationMsg !== "" ? <UncontrolledAlert toggle={() => { setAppOrganizationMsg("") }} color={appOrganizationMsg?.status == "1" ? "success" : "danger"}>
            {typeof appOrganizationMsg == 'string' ? null : appOrganizationMsg?.message}</UncontrolledAlert> : null}
          <Container fluid>
            <Card style={{ padding: 0, margin: "6px 0 0 0", backgroundColor: "transparent" }}>
              <CardHeader>
                <span className="mdi mdi-format-list-bulleted" /> List Struktur Organisasi
              </CardHeader>
              <CardBody style={{ padding: 0, margin: 0, }}>
                <Row
                  className="d-flex justify-content-between py-1"
                  style={{ fontSize: "14px", marginRight: 1, marginLeft: 1 }}
                >
                  <Col
                    xl={3}
                    className="bg-light py-2"
                    style={{ border: "1px solid #BBB", width: "20%", height: "770px", overflowX: "hidden", overflowY: "auto", fontSize: "1.5vh" }}
                  >
                    <CollapsibleList
                      data={appOrganizationListData?.data?.result}
                      collapser={collapser}
                      setCollapser={setCollapser}
                      selectedDeptData={selectedDeptData}
                      setSelectedDeptData={setSelectedDeptData}
                      setSelectedDeptName={setSelectedDeptName}
                    />
                  </Col>


                  <Col
                    xl={9}
                    className="bg-light"
                    style={{ border: "1px solid #BBB", width: "79.5%", paddingRight: 0, paddingLeft: 0, minHeight: "770px" }}
                  >
                    <Container fluid style={{ padding: 0, margin: 0 }}>
                      <button
                        className={appTabAdd ? "btn btn-primary" : "btn btn-light"}
                        style={{
                          color: appTabAdd ? "#fff" : '#495057',
                          borderColor: '#A084DC',
                          borderRadius: '12px 12px 0 0'
                        }}
                        onClick={() => {
                          handleChangeTab('addOrg')
                        }}
                      >
                        Add Organisasi
                      </button>
                      <button
                        className={appTabEdit ? "btn btn-primary" : "btn btn-light"}
                        style={{
                          color: appTabEdit ? "#fff" : '#495057',
                          borderColor: '#A084DC',
                          borderRadius: '12px 12px 0 0'
                        }}
                        onClick={() => {
                          handleChangeTab('editOrg')
                        }}
                      >
                        Edit Order Organisasi
                      </button>
                      <button
                        className={appAddKaryawan ? "btn btn-primary" : "btn btn-light"}
                        style={{
                          color: appAddKaryawan ? "#fff" : '#495057',
                          borderColor: '#A084DC',
                          borderRadius: '12px 12px 0 0'
                        }}
                        onClick={() => {
                          handleChangeTab('addKaryawan')
                        }}
                      >
                        Add Karyawan/User
                      </button>
                      <div
                        style={{
                          margin: '-1px',
                          borderTop: '1px solid #A084DC',
                          borderBottom: '1px solid #A084DC',
                        }}
                      >
                        <TabAddOrganisasi
                          appOrganizationListData={appOrganizationListData}
                          selectedDeptData={selectedDeptData}
                          setSelectedDeptData={setSelectedDeptData}
                          appTabAdd={appTabAdd}
                          setAppOrganizationMsg={setAppOrganizationMsg}
                          setLoadingSpinner={setLoadingSpinner}
                          setCollapser={setCollapser}
                        />
                        <TabEditOrganisasi
                          selectedDeptData={selectedDeptData}
                          appTabEdit={appTabEdit}
                          setAppOrganizationMsg={setAppOrganizationMsg}
                          setLoadingSpinner={setLoadingSpinner}
                        />
                        <TabAddKaryawan
                          appAddKaryawan={appAddKaryawan}
                        />
                      </div>
                    </Container>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Container>
          <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
            <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
          </div>
        </React.Fragment>
      }
    />
  )
}

export default Organization
