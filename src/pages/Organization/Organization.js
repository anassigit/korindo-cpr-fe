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

const Organization = () => {

  const dispatch = useDispatch()

  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [appOrganizationMsg, setAppOrganizationMsg] = useState('')

  const [searchBy, setSearchBy] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [searchEntered, setSearchEntered] = useState(false)

  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const [selectedDeptData, setSelectedDeptData] = useState()
  const [selectedDeptName, setSelectedDeptName] = useState()

  const [selectedMemberData, setSelectedMemberData] = useState()

  const [appDetailDeptDataState, setAppDetailDeptDataState] = useState()
  const [collapser, setCollapser] = useState({
    "1525": true,
    "1531": true,
  })

  const appOrganizationListData = useSelector((state) => state.organizationReducer.respGetOrganizationList)

  useEffect(() => {

    if (ReactSession.get('collapser')) {
      setCollapser(ReactSession.get('collapser'))
    }
    if (ReactSession.get('selectedDeptData')) {
      setSelectedDeptData(ReactSession.get('selectedDeptData'))
    }
    if (ReactSession.get('selectedMemberData')) {
      setSelectedMemberData(ReactSession.get('selectedMemberData'))
    }

    if (ReactSession.get('selectedDeptData')) {
    }

    if (ReactSession.get('selectedDeptName')) {
      setSelectedDeptName(ReactSession.get('selectedDeptName'))
    }

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
      setSearchEntered(false)
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
                  <div style={{ color: "#3F4031", paddingLeft }}>
                    {item.childList.length > 0 ? (
                      <span
                        className={collapser[item.dept_id] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                        onClick={() => {
                          setCollapser((prevCollapser) => {
                            return {
                              ...prevCollapser,
                              [item.dept_id]: !prevCollapser[item.dept_id],
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
                        fontWeight: collapser[item.dept_id] || selectedDeptData === item.org_id ? "bold" : "normal",
                        cursor: "pointer",
                      }}
                      className="unselectable-two"
                      onClick={(e) => {
                        let org_id = '';
                        org_id = item.org_id;
                        ReactSession.remove('selectedMemberData');
                        setSelectedDeptData(org_id);
                        setSelectedDeptName(item.dept_name);
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
                        id={item.dept_id}
                      >
                        {item.dept_name}
                      </span>
                      {item.dept_id && (
                        <UncontrolledTooltip target={() => document.getElementById(item.dept_id)} placement="top">
                          {item.dept_name}
                        </UncontrolledTooltip>
                      )}
                    </a>
                  </div>
                </Row>

                {item.childList && collapser[item.dept_id] === true && (
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
                        className={collapser[data.dept_id] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                        onClick={() => {
                          setCollapser((prevCollapser) => {
                            return {
                              ...prevCollapser,
                              [data.dept_id]: !prevCollapser[data.dept_id],
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
                        fontWeight: collapser[data.dept_id] || selectedDeptData === data.org_id ? "bold" : "normal",
                        cursor: "pointer",
                      }}
                      className="unselectable-two"
                      onClick={(e) => {
                        let org_id = '';
                        org_id = data.org_id;
                        ReactSession.remove('selectedMemberData');
                        setSelectedDeptData(org_id);
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
                        id={data.dept_id}
                      >
                        {data.dept_name}
                      </span>
                      {data.dept_id && (
                        <UncontrolledTooltip target={() => document.getElementById(data.dept_id)} placement="top">
                          {data.dept_name}
                        </UncontrolledTooltip>
                      )}
                    </a>
                  </div>
                </Row>

                {data.childList && collapser[data.dept_id] === true && (
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
    data: PropTypes.array,
    collapser: PropTypes.object,
    setCollapser: PropTypes.func,
    selectedDeptData: PropTypes.string,
    setSelectedDeptData: PropTypes.func,
    setSelectedDeptName: PropTypes.func,
    depth: PropTypes.any,
  };


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
                    xs={3}
                    className="bg-light py-2"
                    style={{ border: "1px solid #BBB", width: "20%", height: "78vh", overflowX: "hidden", overflowY: "auto", fontSize: "1.5vh" }}
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
                    xs={9}
                    className="bg-light"
                    style={{ border: "1px solid #BBB", width: "79.5%", paddingRight: 0, paddingLeft: 0, height: "78vh" }}
                  >
                    <Container fluid style={{ padding: 0, margin: 0 }}>
                      <button className="btn btn-primary" style={{ color: '#fff', borderColor: '#A084DC', borderRadius: '12px 12px 0 0' }}>
                        Add Organisasi
                      </button>
                      <button className="btn btn-light" style={{ color: '#495057', borderColor: '#A084DC', borderRadius: '12px 12px 0 0' }}>
                        Add Karyawan/User
                      </button>

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
