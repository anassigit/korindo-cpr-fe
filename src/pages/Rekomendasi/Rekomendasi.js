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
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import PropTypes from 'prop-types'
import HistoryRekomendasi from "./HistoryRekomendasi"
import Member from "./Member"

const Rekomendasi = () => {

  const dispatch = useDispatch()

  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [appRekomendasiMsg, setAppRekomendasiMsg] = useState('')

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
  const [appMemberList, setMemberList] = useState()

  const appDeptData = useSelector((state) => state.rekomendasiReducer.respGetDept)
  const appSearchData = useSelector((state) => state.rekomendasiReducer.respGetSearch)

  useEffect(() => {

    ReactSession.remove("currentPage")

    ReactSession.remove('selectedMemberData')
    ReactSession.remove('selectedDeptData')
    ReactSession.remove('selectedDeptName')
    ReactSession.remove('collapser')
    ReactSession.remove('offset')
    ReactSession.remove('limit')
    setSelectedDeptData('')

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
      setLoadingSpinner(false)
      setMemberList(appSearchData)
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
      setLoadingSpinner(true)
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
      setSearchEntered(true)
      setSelectedDeptName(null)
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
                        className={collapser[item.deptCd] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                        onClick={() => {
                          setCollapser((prevCollapser) => {
                            return {
                              ...prevCollapser,
                              [item.deptCd]: !prevCollapser[item.deptCd],
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
                        fontWeight: collapser[item.deptCd] || selectedDeptData === item.orgCd ? "bold" : "normal",
                        cursor: "pointer",
                      }}
                      className="unselectable-two"
                      onClick={(e) => {
                        if (item.childList.length > 0) {
                          // setCollapser((prevCollapser) => {
                          //   return {
                          //     ...prevCollapser,
                          //     [item.deptCd]: !prevCollapser[item.deptCd],
                          //   };
                          // });
                        }
                        let orgCd = ''
                        orgCd = item.orgCd
                        ReactSession.remove('selectedMemberData')
                        setSelectedDeptData(orgCd)
                        setSelectedDeptName(item.deptName)
                        ReactSession.set('selectedDeptData', orgCd)
                        setSearchEntered(false)
                        setLoadingSpinner(true)
                      }}
                    >
                      &nbsp;
                      <span
                        style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                        id={item.deptCd}
                      >
                        {item.deptName}
                      </span>
                      {item.deptCd && (
                        <UncontrolledTooltip target={() => document.getElementById(item.deptCd)} placement="top">
                          {item.deptName}
                        </UncontrolledTooltip>
                      )}
                    </a>
                  </div>
                </Row>

                {item.childList.length > 0 && collapser[item.deptCd] === true && (
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
                  <div style={{
                    color: "#3F4031",
                    paddingLeft,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}>
                    {data.childList.length > 0 ? (
                      <span
                        className={collapser[data.deptCd] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                        onClick={() => {
                          setCollapser((prevCollapser) => {
                            return {
                              ...prevCollapser,
                              [data.deptCd]: !prevCollapser[data.deptCd],
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
                        fontWeight: collapser[data.deptCd] || selectedDeptData === data.orgCd ? "bold" : "normal",
                        cursor: "pointer",
                      }}
                      className="unselectable-two"
                      onClick={(e) => {
                        let orgCd = '';
                        orgCd = data.orgCd;
                        ReactSession.remove('selectedMemberData');
                        setSelectedDeptData(orgCd);
                        setSelectedDeptName(data.deptName);
                        ReactSession.set('selectedDeptData', orgCd);
                        setSearchEntered(false)
                        setLoadingSpinner(true)
                      }}
                    >
                      &nbsp;
                      <span
                        style={{
                        }}
                        id={data.deptCd}
                      >
                        {data.deptName}
                      </span>
                      {data.deptCd && (
                        <UncontrolledTooltip target={() => document.getElementById(data.deptCd)} placement="top">
                          {data.deptName}
                        </UncontrolledTooltip>
                      )}
                    </a>
                  </div>
                </Row>

                {data.childList && collapser[data.deptCd] === true && (
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
          {appRekomendasiMsg !== "" ? <UncontrolledAlert toggle={() => { setAppRekomendasiMsg("") }} color={appRekomendasiMsg?.status == "1" ? "success" : "danger"}>
            {typeof appRekomendasiMsg == 'string' ? null : appRekomendasiMsg?.message}</UncontrolledAlert> : null}
          <Container fluid>
            <Card style={{ marginBottom: 0 }}>
              <CardHeader>
                <span className="fas fa-search"></span> Pilih Karyawan
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
                      setSearchEntered(true)
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
                      data={appDeptData?.data?.result}
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
                    <Member
                      appDeptData={appDeptData}
                      selectedDeptData={selectedDeptData}
                      selectedDeptName={selectedDeptName}
                      setSelectedDeptData={setSelectedDeptData}
                      setSelectedMemberData={setSelectedMemberData}
                      offset={offset}
                      limit={limit}
                      setOffset={setOffset}
                      setLimit={setLimit}
                      setMemberList={setMemberList}
                      appMemberList={appMemberList}
                      searchVal={searchVal}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                      searchEntered={searchEntered}
                      setLoadingSpinner={setLoadingSpinner}
                    />
                  </Col>
                  <Col
                    xs={5}
                    className="bg-light"
                    style={{ border: "1px solid #BBB", padding: 0, margin: 0 }}
                  >
                    <HistoryRekomendasi
                      appRekomendasiMsg={appRekomendasiMsg}
                      setAppRekomendasiMsg={setAppRekomendasiMsg}
                    />
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

export default Rekomendasi
