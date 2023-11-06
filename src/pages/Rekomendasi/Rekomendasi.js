import React, { useEffect, useState } from "react"
import { ReactSession } from 'react-client-session'
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container, Input, Row, Spinner, UncontrolledTooltip,
} from "reactstrap"
import { getDeptData, getSearchData, resetMessage } from "store/actions"
import '../../assets/scss/custom.scss'
import RootPageCustom from '../../common/RootPageCustom'
import '../../config'
import HistoryRekomendasi from "./HistoryRekomendasi"
import Member from "./Member"

const Rekomendasi = () => {

  const dispatch = useDispatch()

  const [loadingSpinner, setLoadingSpinner] = useState(false)

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

  return (
    <RootPageCustom msgStateGet={null} msgStateSet={null}
      componentJsx={
        <>
          <React.Fragment>
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

                      {
                        Array.isArray(appDeptData?.data?.result)
                          ? appDeptData?.data?.result.map((item, index) => {
                            return (
                              <React.Fragment key={index}>
                                {item.parent_id === 'Top' ? (
                                  <Row style={{ marginBottom: "8px" }}>
                                    <div style={{ color: "#3F4031" }}>
                                      <span className="mdi mdi-plus-box"></span>
                                      &nbsp;
                                      <span className="mdi mdi-domain"></span>
                                      <a style={{ color: "#4c4c4c", fontWeight: (collapser["0"] || selectedDeptData === item?.dept_id) ? "bold" : "normal", cursor: "pointer" }}
                                        className="unselectable-two"
                                        onClick={(e) => {
                                          let org_id = ''
                                          org_id = item.org_id
                                          ReactSession.remove('selectedMemberData')
                                          setSelectedDeptData(org_id)
                                          setSelectedDeptName(item.dept_name)
                                          ReactSession.set('selectedDeptData', dept_id)
                                        }
                                        }
                                      >
                                        &nbsp;
                                        <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", }} id={item?.dept_id}>
                                          {item?.dept_name}
                                        </span>
                                        <UncontrolledTooltip target={item?.dept_id} placement='top'>
                                          {item?.dept_name}
                                        </UncontrolledTooltip>
                                      </a>
                                    </div>
                                  </Row>
                                ) : null}
                              </React.Fragment>
                            )
                          })
                          : (
                            <>
                              <Row style={{ marginBottom: "8px" }}>
                                <div style={{ color: "#3F4031" }}>
                                  <span
                                    className={collapser["0"] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                    onClick={() => {
                                      setCollapser((prevCollapser) => ({
                                        ...prevCollapser,
                                        ["0"]: !prevCollapser["0"],
                                      }))
                                    }}
                                  ></span>
                                  &nbsp;
                                  <span className="mdi mdi-domain"></span>
                                  <a style={{ color: "#4c4c4c", fontWeight: (collapser["0"] || selectedDeptData === appDeptData?.data?.result?.dept_id) ? "bold" : "normal", cursor: "pointer" }}
                                    className="unselectable-two"
                                    onClick={(e) => {
                                      let org_id = ''
                                      org_id = appDeptData?.data?.result?.org_id
                                      ReactSession.remove('selectedMemberData')
                                      ReactSession.set('selectedMemberData')
                                      setSelectedDeptData(org_id)
                                      setSelectedDeptName(appDeptData?.data?.result?.dept_name)
                                      ReactSession.set('selectedDeptData', org_id)
                                    }
                                    }
                                  >
                                    &nbsp;
                                    <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", }} id={appDeptData?.data?.result?.dept_id}>
                                      {appDeptData?.data?.result?.dept_name}
                                    </span>
                                    {appDeptData?.data?.result?.dept_id && (
                                      <UncontrolledTooltip target={() => document.getElementById(appDeptData?.data?.result?.dept_id)} placement='top'>
                                        {appDeptData?.data?.result?.dept_name}
                                      </UncontrolledTooltip>
                                    )}

                                  </a>
                                </div>
                              </Row>
                              {
                                collapser["0"] === true &&
                                  Array.isArray(appDeptData?.data?.result?.childList)
                                  ? appDeptData?.data?.result?.childList.map((childItem, childIndex) => {
                                    return (
                                      <React.Fragment key={childIndex}>
                                        <Row style={{ marginBottom: "8px" }}>
                                          <div style={{ color: "#3F4031", paddingLeft: "2vw" }}>
                                            {childItem.childList ? <span
                                              className={collapser["0-" + childIndex] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                              onClick={() => {
                                                setCollapser((prevCollapser) => ({
                                                  ...prevCollapser,
                                                  ["0-" + childIndex]: !prevCollapser["0-" + childIndex],
                                                }))
                                              }}
                                            ></span> :
                                              <span
                                                className={collapser["0-" + childIndex] ? "mdi mdi-minus-box opacity-0" : "mdi mdi-plus-box opacity-0"}
                                              ></span>
                                            }
                                            &nbsp;
                                            <span className="mdi mdi-domain"></span>
                                            <a style={{ color: "#4c4c4c", fontWeight: (collapser["0-" + childIndex] || selectedDeptData === childItem?.dept_id) ? "bold" : "normal", cursor: "pointer" }}
                                              className="unselectable-two"
                                              onClick={(e) => {
                                                let org_id = ''
                                                org_id = childItem.org_id
                                                ReactSession.remove('selectedMemberData')
                                                setSelectedDeptData(org_id)
                                                setSelectedDeptName(childItem.dept_name)
                                                ReactSession.set('selectedDeptData', org_id)
                                              }
                                              }
                                            >
                                              &nbsp;
                                              <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", }} id={childItem?.dept_id}>
                                                {childItem.dept_name}
                                              </span>
                                              {childItem?.dept_id && (
                                                <UncontrolledTooltip target={() => document.getElementById(childItem?.dept_id)} placement='top'>
                                                  {childItem?.dept_name}
                                                </UncontrolledTooltip>
                                              )}
                                            </a>
                                          </div>
                                        </Row>
                                        {
                                          collapser["0-" + childIndex] === true &&
                                            Array.isArray(childItem?.childList)
                                            ? childItem?.childList.map((childItem2, childIndex2) => {
                                              let viewWidth = 1
                                              return (
                                                <React.Fragment key={childIndex2}>
                                                  <Row style={{ marginBottom: "8px" }}>
                                                    <div style={{ color: "#3F4031", paddingLeft: "3vw", display: "flex", flexDirection: "row", width: "100%", }}>
                                                      {childItem2.childList ? <span
                                                        className={collapser["0-" + childIndex + childIndex2] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                                        onClick={() => {
                                                          setCollapser((prevCollapser) => ({
                                                            ...prevCollapser,
                                                            ["0-" + childIndex + childIndex2]: !prevCollapser["0-" + childIndex + childIndex2],
                                                          }))
                                                        }}
                                                      ></span> :
                                                        <span
                                                          className={collapser["0-" + childIndex + childIndex2] ? "mdi mdi-minus-box opacity-0" : "mdi mdi-plus-box opacity-0"}
                                                        ></span>
                                                      }
                                                      &nbsp;
                                                      <span className="mdi mdi-domain"></span>
                                                      <a
                                                        style={{
                                                          display: "flex",
                                                          color: "#4c4c4c",
                                                          overflow: "hidden",
                                                          fontWeight: collapser["0-" + childIndex + childIndex2] || selectedDeptData === childItem2.org_id
                                                            ? "bold"
                                                            : "normal",
                                                          cursor: "pointer",
                                                        }}
                                                        className="unselectable-two"
                                                        onClick={(e) => {
                                                          let org_id = ''
                                                          org_id = childItem2.org_id
                                                          ReactSession.remove('selectedMemberData')
                                                          setSelectedDeptData(org_id)
                                                          setSelectedDeptName(childItem2.dept_name)
                                                          ReactSession.set('selectedDeptData', org_id)
                                                        }
                                                        }
                                                      >
                                                        &nbsp;
                                                        <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: "100%", }} id={childItem2?.dept_id}>
                                                          {childItem2.dept_name}
                                                        </span>

                                                        {childItem2?.dept_id && (
                                                          <UncontrolledTooltip target={() => document.getElementById(childItem2?.dept_id)} placement='top'>
                                                            {childItem2?.dept_name}
                                                          </UncontrolledTooltip>
                                                        )}
                                                      </a>
                                                    </div>
                                                  </Row>

                                                  {collapser["0-" + childIndex + childIndex2] === true && Array.isArray(childItem2?.childList)
                                                    ? childItem2?.childList.map((childItem3, childIndex3) => {
                                                      return (
                                                        <React.Fragment key={childIndex3}>
                                                          <Row style={{ marginBottom: "8px" }}>
                                                            <div style={{ color: "#3F4031", paddingLeft: `${viewWidth + 3}vw`, display: "flex", flexDirection: "row", width: "100%", }}>
                                                              {childItem3.childList ? <span
                                                                className={collapser["0-" + childIndex + childIndex2 + childIndex3] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                                                onClick={() => {
                                                                  setCollapser((prevCollapser) => ({
                                                                    ...prevCollapser,
                                                                    ["0-" + childIndex + childIndex2 + childIndex3]: !prevCollapser["0-" + childIndex + childIndex2 + childIndex3],
                                                                  }))
                                                                }}
                                                              ></span> :
                                                                <span
                                                                  className={collapser["0-" + childIndex + childIndex2 + childIndex3] ? "mdi mdi-minus-box opacity-0" : "mdi mdi-plus-box opacity-0"}
                                                                ></span>
                                                              }
                                                              &nbsp;
                                                              <span className="mdi mdi-domain"></span>
                                                              <a
                                                                style={{
                                                                  display: "flex",
                                                                  color: "#4c4c4c",
                                                                  overflow: "hidden",
                                                                  fontWeight: (collapser["0-" + childIndex + childIndex2 + childIndex3] || selectedDeptData === childItem3.org_id) ? "bold" : "normal", cursor: "pointer"
                                                                }}
                                                                className="unselectable-two"
                                                                onClick={(e) => {
                                                                  let org_id = ''
                                                                  org_id = childItem3.org_id
                                                                  ReactSession.remove('selectedMemberData')
                                                                  setSelectedDeptData(org_id)
                                                                  setSelectedDeptName(childItem3.dept_name)
                                                                  ReactSession.set('selectedDeptData', org_id)
                                                                }
                                                                }
                                                              >
                                                                &nbsp;
                                                                <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: "100%", }} id={childItem3?.dept_id}>
                                                                  {childItem3.dept_name}
                                                                </span>

                                                                {childItem3?.dept_id && (
                                                                  <UncontrolledTooltip target={() => document.getElementById(childItem3?.dept_id)} placement='top'>
                                                                    {childItem3?.dept_name}
                                                                  </UncontrolledTooltip>
                                                                )}
                                                              </a>
                                                            </div>
                                                          </Row>
                                                          {collapser["0-" + childIndex + childIndex2 + childIndex3] === true && Array.isArray(childItem3?.childList)
                                                            ? childItem3?.childList.map((childItem4, childIndex4) => {
                                                              return (
                                                                <React.Fragment key={childIndex4}>
                                                                  <Row style={{ marginBottom: "8px" }}>
                                                                    <div style={{ color: "#3F4031", paddingLeft: `${viewWidth + 4}vw`, display: "flex", flexDirection: "row", width: "100%", }}>
                                                                      {childItem4.childList ? <span
                                                                        className={collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                                                        onClick={() => {
                                                                          setCollapser((prevCollapser) => ({
                                                                            ...prevCollapser,
                                                                            ["0-" + childIndex + childIndex2 + childIndex3 + childIndex4]: !prevCollapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4],
                                                                          }))
                                                                        }}
                                                                      ></span> :
                                                                        <span
                                                                          className={collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4] ? "mdi mdi-minus-box opacity-0" : "mdi mdi-plus-box opacity-0"}
                                                                        ></span>
                                                                      }
                                                                      &nbsp;
                                                                      <span className="mdi mdi-domain"></span>
                                                                      <a
                                                                        style={{
                                                                          display: "flex",
                                                                          color: "#4c4c4c",
                                                                          overflow: "hidden",
                                                                          fontWeight: (collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4] || selectedDeptData === childItem4.org_id)
                                                                            ? "bold"
                                                                            : "normal",
                                                                          cursor: "pointer"
                                                                        }}
                                                                        className="unselectable-two"
                                                                        onClick={(e) => {
                                                                          let org_id = ''
                                                                          org_id = childItem4.org_id
                                                                          ReactSession.remove('selectedMemberData')
                                                                          setSelectedDeptData(org_id)
                                                                          setSelectedDeptName(childItem4.dept_name)
                                                                          ReactSession.set('selectedDeptData', org_id)
                                                                        }
                                                                        }
                                                                      >
                                                                        &nbsp;
                                                                        <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: "100%", }} id={childItem4?.dept_id}>
                                                                          {childItem4.dept_name}
                                                                        </span>
                                                                        {childItem4?.dept_id && (
                                                                          <UncontrolledTooltip target={() => document.getElementById(childItem4?.dept_id)} placement='top'>
                                                                            {childItem4?.dept_name}
                                                                          </UncontrolledTooltip>
                                                                        )}
                                                                      </a>
                                                                    </div>
                                                                  </Row>
                                                                  {collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4] === true && Array.isArray(childItem4?.childList)
                                                                    ? childItem4?.childList.map((childItem5, childIndex5) => {
                                                                      return (
                                                                        <React.Fragment key={childIndex5}>
                                                                          <Row style={{ marginBottom: "8px" }}>
                                                                            <div style={{ color: "#3F4031", paddingLeft: `${viewWidth + 5}vw`, display: "flex", flexDirection: "row", width: "100%", }}>
                                                                              {childItem5.childList ? <span
                                                                                className={collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                                                                onClick={() => {
                                                                                  setCollapser((prevCollapser) => ({
                                                                                    ...prevCollapser,
                                                                                    ["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5]: !prevCollapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5],
                                                                                  }))
                                                                                }}
                                                                              ></span> :
                                                                                <span
                                                                                  className={collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5] ? "mdi mdi-minus-box opacity-0" : "mdi mdi-plus-box opacity-0"}
                                                                                ></span>
                                                                              }
                                                                              &nbsp;
                                                                              <span className="mdi mdi-domain"></span>
                                                                              <a
                                                                                style={{
                                                                                  display: "flex",
                                                                                  color: "#4c4c4c",
                                                                                  overflow: "hidden",
                                                                                  fontWeight: (collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5] || selectedDeptData === childItem5.org_id)
                                                                                    ? "bold" :
                                                                                    "normal",
                                                                                  cursor: "pointer"
                                                                                }}
                                                                                className="unselectable-two"
                                                                                onClick={(e) => {
                                                                                  let org_id = ''
                                                                                  org_id = childItem5.org_id
                                                                                  ReactSession.remove('selectedMemberData')
                                                                                  setSelectedDeptData(org_id)
                                                                                  setSelectedDeptName(childItem5.dept_name)
                                                                                  ReactSession.set('selectedDeptData', org_id)
                                                                                }
                                                                                }
                                                                              >
                                                                                &nbsp;
                                                                                <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: "100%", }} id={childItem5?.dept_id}>
                                                                                  {childItem5.dept_name}
                                                                                </span>
                                                                                {childItem5?.dept_id && (
                                                                                  <UncontrolledTooltip target={() => document.getElementById(childItem5?.dept_id)} placement='top'>
                                                                                    {childItem5?.dept_name}
                                                                                  </UncontrolledTooltip>
                                                                                )}
                                                                              </a>
                                                                            </div>
                                                                          </Row>
                                                                          {collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5] === true && Array.isArray(childItem5?.childList)
                                                                            ? childItem5?.childList.map((childItem6, childIndex6) => {
                                                                              return (
                                                                                <React.Fragment key={childIndex6}>
                                                                                  <Row style={{ marginBottom: "8px" }}>
                                                                                    <div style={{ color: "#3F4031", paddingLeft: `${viewWidth + 6}vw`, display: "flex", flexDirection: "row", width: "100%", }}>
                                                                                      {childItem6.childList ? <span
                                                                                        className={collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5 + childIndex6] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                                                                        onClick={() => {
                                                                                          setCollapser((prevCollapser) => ({
                                                                                            ...prevCollapser,
                                                                                            ["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5 + childIndex6]: !prevCollapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5 + childIndex6],
                                                                                          }))
                                                                                        }}
                                                                                      ></span> :
                                                                                        <span
                                                                                          className={collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5 + childIndex6] ? "mdi mdi-minus-box opacity-0" : "mdi mdi-plus-box opacity-0"}
                                                                                        ></span>
                                                                                      }
                                                                                      &nbsp;
                                                                                      <span className="mdi mdi-domain"></span>
                                                                                      <a
                                                                                        style={{
                                                                                          display: "flex",
                                                                                          color: "#4c4c4c",
                                                                                          overflow: "hidden",
                                                                                          fontWeight: (collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5 + childIndex6] || selectedDeptData === childItem6.org_id)
                                                                                            ? "bold"
                                                                                            : "normal",
                                                                                          cursor: "pointer"
                                                                                        }}
                                                                                        className="unselectable-two"
                                                                                        onClick={(e) => {
                                                                                          let org_id = ''
                                                                                          org_id = childItem6.org_id
                                                                                          ReactSession.remove('selectedMemberData')
                                                                                          setSelectedDeptData(org_id)
                                                                                          setSelectedDeptName(childItem6.dept_name)
                                                                                          ReactSession.set('selectedDeptData', org_id)
                                                                                        }
                                                                                        }
                                                                                      >
                                                                                        &nbsp;
                                                                                        <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: "100%", }} id={childItem6?.dept_id}>
                                                                                          {childItem6.dept_name}
                                                                                        </span>

                                                                                        {childItem6?.dept_id && (
                                                                                          <UncontrolledTooltip target={() => document.getElementById(childItem6?.dept_id)} placement='top'>
                                                                                            {childItem6?.dept_name}
                                                                                          </UncontrolledTooltip>
                                                                                        )}
                                                                                      </a>
                                                                                    </div>
                                                                                  </Row>
                                                                                </React.Fragment>
                                                                              )
                                                                            })
                                                                            : null
                                                                          }
                                                                        </React.Fragment>
                                                                      )
                                                                    })
                                                                    : null
                                                                  }
                                                                </React.Fragment>
                                                              )
                                                            })
                                                            : null
                                                          }
                                                        </React.Fragment>
                                                      )
                                                    })
                                                    : null
                                                  }

                                                </React.Fragment>
                                              )
                                            })
                                            : (
                                              null
                                            )
                                        }
                                      </React.Fragment>
                                    )
                                  })
                                  : (
                                    <>
                                    </>
                                  )
                              }
                            </>
                          )
                      }
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
                      />
                    </Col>
                    <Col
                      xs={5}
                      className="bg-light"
                      style={{ border: "1px solid #BBB", padding: 0, margin: 0 }}
                    >
                      <HistoryRekomendasi />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Container>
            <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
              <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
            </div>
          </React.Fragment>
        </>
      }
    />
  )
}

export default Rekomendasi
