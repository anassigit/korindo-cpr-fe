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
    "0": true,
    "0-0": true
  })

  const [appMemberList, setMemberList] = useState()

  const appDeptData = useSelector((state) => state.rekomendasiReducer.respGetDept)
  const appSearchData = useSelector((state) => state.rekomendasiReducer.respGetSearch)

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

    dispatch(getDeptData())
    setLoadingSpinner(true)
  }, [])

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  useEffect(() => {
    if (appDeptData.status == '1') {
      setLoadingSpinner(false)
    } else if (appDeptData.status == '0') {
      setLoadingSpinner(true)
    }
  }, [appDeptData])

  useEffect(() => {
    ReactSession.set('selectedDeptName', selectedDeptName)
  }, [selectedDeptName])

  useEffect(() => {
    setSelectedDeptData(null)
    if (appSearchData.status === '1' && searchVal) {
      setMemberList(appSearchData)
      setSearchEntered(true)
      setSelectedDeptName(null)
      ReactSession.set('searchVal', searchVal)
    }
  }, [appSearchData])

  useEffect(() => {

    if (selectedDeptData) {
      setSearchEntered(false)
      ReactSession.set('collapser', collapser)
      ReactSession.remove('selectedMemberData')
      ReactSession.remove('searchVal')
    } else {
      setSelectedDeptData(ReactSession.get('selectedDeptData'))
    }
  }, [selectedDeptData])

  useEffect(() => {
    if (searchEntered === true) {
      setOffset(0)
      setLimit(10)
      setCurrentPage(1)
      ReactSession.set('searchVal', searchVal)
      ReactSession.set('selectedDeptData', null)
    }
  }, [searchEntered])

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Prevent the default form submission behavior
      e.preventDefault()
      setCurrentPage(1)
      dispatch(getSearchData({
        "offset": 0,
        "limit": 10,
        "search": {
          "search": searchVal,
        }
      }))
    }
  }


  const CollapsibleList = ({ data, collapser, setCollapser, selectedDeptData, setSelectedDeptData, setSelectedDeptName, depth = 0 }) => {

    debugger
    const currentDepth = depth + 1;
    const paddingLeft = `${currentDepth * 0.5}vw`;
    return (
      <React.Fragment>
        {Array.isArray(data) &&
          data.map((item, index) => {

            return (
              <React.Fragment key={index}>
                <Row style={{ marginBottom: "8px" }}>
                  <div style={{ color: "#3F4031", paddingLeft }}>
                    {item.childList ? (
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
          })}
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
            <Card style={{ marginBottom: 0 }}>
              <CardHeader>
                <span className="mdi mdi-magnify"></span> Pilih Karyawan
              </CardHeader>
              <CardBody className="bg-light" style={{ padding: 0, margin: 0, border: "1px solid #BBB" }}>
                <Row
                  className="py-2 m-2"
                >

                  <Col sm={2} md={2} xl={1}>
                    <Input
                      type="select"
                      name="searchBy"
                      className="form-control"
                      value={searchBy}
                    >
                      <option>Name</option>
                    </Input>
                  </Col>
                  <Col sm={2} md={2}>
                    <Input
                      type="search"
                      name="search"
                      className="form-control"
                      value={searchVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </Col>
                  <Col sm={2} md={2}>
                    <Button className="btn btn-primary rounded-0 px-4" style={{ border: "1px solid #BBB" }} onClick={() => {
                      setCurrentPage(1)
                      dispatch(getSearchData({
                        "offset": 0,
                        "limit": 10,
                        "search": {
                          "search": searchVal,
                        }
                      }))
                    }}>
                      <b>Search</b>
                    </Button>
                  </Col>

                </Row>
              </CardBody>
            </Card>
            <Card style={{ padding: 0, margin: "6px 0 0 0", backgroundColor: "transparent" }}>
              <CardBody style={{ padding: 0, margin: 0, }}>
                <Row
                  className="d-flex justify-content-between py-1"
                  style={{ fontSize: "14px", marginRight: 1, marginLeft: 1 }}
                >
                  <Col
                    xs={3}
                    className="bg-light py-2"
                    style={{ border: "1px solid #BBB", width: "20%", height: "70vh", overflowX: "hidden", overflowY: "auto", fontSize: "1.5vh" }}
                  >
                    <CollapsibleList
                      data={appDeptData?.data?.result?.childList}
                      collapser={collapser}
                      setCollapser={setCollapser}
                      selectedDeptData={selectedDeptData}
                      setSelectedDeptData={setSelectedDeptData}
                      setSelectedDeptName={setSelectedDeptName}
                    />
                  </Col>


                  <Col
                    xs={5}
                    className="bg-light py-2"
                    style={{ border: "1px solid #BBB", width: "37%", paddingRight: 0, paddingLeft: 0, height: "70vh" }}
                  >
                  </Col>
                  <Col
                    xs={5}
                    className="bg-light"
                    style={{ border: "1px solid #BBB", padding: 0, margin: 0 }}
                  >
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
