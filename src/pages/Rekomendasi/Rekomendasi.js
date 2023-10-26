import React, { useState, useEffect } from "react";
import MetaTags from 'react-meta-tags';
import '../../config';
import RootPageCustom from '../../common/RootPageCustom';
import BootstrapTable from "react-bootstrap-table-next";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container, Input, Row, Spinner,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDeptData, getDetailDeptData, getMemberDetailData, getMemberListData, getSearchData, resetMessage, resetMessageMemberDtl } from "store/actions";
import '../../assets/scss/custom.scss'
import Member from "./Member";
import DetailService from "./DetailService";
import { ReactSession } from 'react-client-session';

const Rekomendasi = () => {

  const dispatch = useDispatch()

  const [loadingSpinner, setLoadingSpinner] = useState(false)

  const [searchBy, setSearchBy] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [searchEntered, setSearchEntered] = useState(false)

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDeptData, setSelectedDeptData] = useState();
  const [selectedDeptName, setSelectedDeptName] = useState();

  const [selectedMemberData, setSelectedMemberData] = useState();

  const [appDetailDeptDataState, setAppDetailDeptDataState] = useState()
  const [collapser, setCollapser] = useState({})

  const [appMemberList, setMemberList] = useState();

  const appDeptData = useSelector((state) => state.rekomendasiReducer.respGetDept);
  const appSearchData = useSelector((state) => state.rekomendasiReducer.respGetSearch);

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
      dispatch(getDetailDeptData({ dept_id: ReactSession.get('selectedDeptData') }));
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
    }
  }, [appSearchData])

  useEffect(() => {

    if (selectedDeptData) {
      setSearchEntered(false)
      ReactSession.set('collapser', collapser)
      ReactSession.remove('selectedMemberData')
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
      e.preventDefault();
      setCurrentPage(1)
      dispatch(getSearchData({
        "offset": 0,
        "limit": 10,
        "search": {
          "search": searchVal,
        }
      }))
    }
  };

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
                      style={{ backgroundColor: "#F6F6F6", border: "1px solid #BBB", width: "20%", height: "85vh", overflowX: "auto", overflowY: "auto" }}
                    >

                      {
                        Array.isArray(appDeptData?.data?.result)
                          ? appDeptData?.data?.result.map((item, index) => {
                            return (
                              <React.Fragment key={index}>
                                {item.parent_id === 'Top' ? (
                                  <Row style={{ marginBottom: "8px" }}>
                                    <Col xs="12" style={{ color: "#3F4031" }}>
                                      <span className="mdi mdi-plus-box"></span>
                                      &nbsp;
                                      <span className="mdi mdi-domain"></span>
                                      <a style={{ color: "#4c4c4c", fontWeight: (collapser["0"] || selectedDeptData === item.dept_id) ? "bold" : "normal", cursor: "pointer" }}
                                        className="unselectable-two"
                                        onClick={(e) => {

                                          dispatch(getMemberDetailData({ member_id: '' }))
                                          dispatch(getDetailDeptData({ dept_id: item.dept_id }));
                                          let dept_id = ''
                                          dept_id = item.dept_id
                                          ReactSession.remove('selectedMemberData')
                                          setSelectedDeptData(dept_id)
                                          setSelectedDeptName(item.dept_name)
                                          ReactSession.set('selectedDeptData', dept_id)
                                        }
                                        }
                                      >
                                        &nbsp;
                                        {item.dept_name}
                                      </a>
                                    </Col>
                                  </Row>
                                ) : null}
                              </React.Fragment>
                            );
                          })
                          : (
                            <>
                              <Row style={{ marginBottom: "8px" }}>
                                <Col xs="12" style={{ color: "#3F4031" }}>
                                  <span
                                    className={collapser["0"] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                    onClick={() => {
                                      setCollapser((prevCollapser) => ({
                                        ...prevCollapser,
                                        ["0"]: !prevCollapser["0"],
                                      }));
                                    }}
                                  ></span>
                                  &nbsp;
                                  <span className="mdi mdi-domain"></span>
                                  <a style={{ color: "#4c4c4c", fontWeight: (collapser["0"] || selectedDeptData === appDeptData?.data?.result?.dept_id) ? "bold" : "normal", cursor: "pointer" }}
                                    className="unselectable-two"
                                    onClick={(e) => {

                                      dispatch(getMemberDetailData({ member_id: '' }))
                                      dispatch(getDetailDeptData({ dept_id: appDeptData?.data?.result?.dept_id }));
                                      let dept_id = ''
                                      dept_id = appDeptData?.data?.result?.dept_id
                                      ReactSession.remove('selectedMemberData')
                                      ReactSession.set('selectedMemberData')
                                      setSelectedDeptData(dept_id)
                                      setSelectedDeptName(appDeptData?.data?.result?.dept_name)
                                      ReactSession.set('selectedDeptData', dept_id)
                                    }
                                    }
                                  >
                                    &nbsp;
                                    {appDeptData?.data?.result?.dept_name}
                                  </a>
                                </Col>
                              </Row>
                              {
                                collapser["0"] === true &&
                                  Array.isArray(appDeptData?.data?.result?.childList)
                                  ? appDeptData?.data?.result?.childList.map((childItem, childIndex) => {
                                    return (
                                      <React.Fragment key={childIndex}>
                                        <Row style={{ marginBottom: "8px" }}>
                                          <Col xs="12" style={{ color: "#3F4031", paddingLeft: "2vw" }}>
                                            {childItem.childList ? <span
                                              className={collapser["0-" + childIndex] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                              onClick={() => {
                                                setCollapser((prevCollapser) => ({
                                                  ...prevCollapser,
                                                  ["0-" + childIndex]: !prevCollapser["0-" + childIndex],
                                                }));
                                              }}
                                            ></span> :
                                              <span
                                                className={collapser["0-" + childIndex] ? "mdi mdi-minus-box opacity-0" : "mdi mdi-plus-box opacity-0"}
                                              ></span>
                                            }
                                            &nbsp;
                                            <span className="mdi mdi-domain"></span>
                                            <a style={{ color: "#4c4c4c", fontWeight: (collapser["0-" + childIndex] || selectedDeptData === childItem.dept_id) ? "bold" : "normal", cursor: "pointer" }}
                                              className="unselectable-two"
                                              onClick={(e) => {

                                                dispatch(getMemberDetailData({ member_id: '' }))
                                                dispatch(getDetailDeptData({ dept_id: childItem.dept_id }));
                                                let dept_id = ''
                                                dept_id = childItem.dept_id
                                                ReactSession.remove('selectedMemberData')
                                                setSelectedDeptData(dept_id)
                                                setSelectedDeptName(childItem.dept_name)
                                                ReactSession.set('selectedDeptData', dept_id)
                                              }
                                              }
                                            >
                                              &nbsp;
                                              {childItem.dept_name}
                                            </a>
                                          </Col>
                                        </Row>
                                        {
                                          collapser["0-" + childIndex] === true &&
                                            Array.isArray(childItem?.childList)
                                            ? childItem?.childList.map((childItem2, childIndex2) => {
                                              let viewWidth = 1
                                              return (
                                                <React.Fragment key={childIndex2}>
                                                  <Row style={{ marginBottom: "8px" }}>
                                                    <Col xs="12" style={{ color: "#3F4031", paddingLeft: "3vw" }}>
                                                      {childItem2.childList ? <span
                                                        className={collapser["0-" + childIndex + childIndex2] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                                        onClick={() => {
                                                          setCollapser((prevCollapser) => ({
                                                            ...prevCollapser,
                                                            ["0-" + childIndex + childIndex2]: !prevCollapser["0-" + childIndex + childIndex2],
                                                          }));
                                                        }}
                                                      ></span> :
                                                        <span
                                                          className={collapser["0-" + childIndex + childIndex2] ? "mdi mdi-minus-box opacity-0" : "mdi mdi-plus-box opacity-0"}
                                                        ></span>
                                                      }
                                                      &nbsp;
                                                      <span className="mdi mdi-domain"></span>
                                                      <a style={{ color: "#4c4c4c", fontWeight: (collapser["0-" + childIndex + childIndex2] || selectedDeptData === childItem2.dept_id) ? "bold" : "normal", cursor: "pointer" }}
                                                        className="unselectable-two"
                                                        onClick={(e) => {

                                                          dispatch(getMemberDetailData({ member_id: '' }))
                                                          dispatch(getDetailDeptData({ dept_id: childItem2.dept_id }));
                                                          let dept_id = ''
                                                          dept_id = childItem2.dept_id
                                                          ReactSession.remove('selectedMemberData')
                                                          setSelectedDeptData(dept_id)
                                                          setSelectedDeptName(childItem2.dept_name)
                                                          ReactSession.set('selectedDeptData', dept_id)
                                                        }
                                                        }
                                                      >
                                                        &nbsp;
                                                        {childItem2.dept_name}
                                                      </a>
                                                    </Col>
                                                  </Row>

                                                  {collapser["0-" + childIndex + childIndex2] === true && Array.isArray(childItem2?.childList)
                                                    ? childItem2?.childList.map((childItem3, childIndex3) => {
                                                      return (
                                                        <React.Fragment key={childIndex3}>
                                                          <Row style={{ marginBottom: "8px" }}>
                                                            <Col xs="12" style={{ color: "#3F4031", paddingLeft: `${viewWidth + 3}vw` }}>
                                                              {childItem3.childList ? <span
                                                                className={collapser["0-" + childIndex + childIndex2 + childIndex3] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                                                onClick={() => {
                                                                  setCollapser((prevCollapser) => ({
                                                                    ...prevCollapser,
                                                                    ["0-" + childIndex + childIndex2 + childIndex3]: !prevCollapser["0-" + childIndex + childIndex2 + childIndex3],
                                                                  }));
                                                                }}
                                                              ></span> :
                                                                <span
                                                                  className={collapser["0-" + childIndex + childIndex2 + childIndex3] ? "mdi mdi-minus-box opacity-0" : "mdi mdi-plus-box opacity-0"}
                                                                ></span>
                                                              }
                                                              &nbsp;
                                                              <span className="mdi mdi-domain"></span>
                                                              <a style={{ color: "#4c4c4c", fontWeight: (collapser["0-" + childIndex + childIndex2 + childIndex3] || selectedDeptData === childItem3.dept_id) ? "bold" : "normal", cursor: "pointer" }}
                                                                className="unselectable-two"
                                                                onClick={(e) => {

                                                                  dispatch(getMemberDetailData({ member_id: '' }))
                                                                  dispatch(getDetailDeptData({ dept_id: childItem3.dept_id }));
                                                                  let dept_id = ''
                                                                  dept_id = childItem3.dept_id
                                                                  ReactSession.remove('selectedMemberData')
                                                                  setSelectedDeptData(dept_id)
                                                                  setSelectedDeptName(childItem3.dept_name)
                                                                  ReactSession.set('selectedDeptData', dept_id)
                                                                }
                                                                }
                                                              >
                                                                &nbsp;
                                                                {childItem3.dept_name}
                                                              </a>
                                                            </Col>
                                                          </Row>
                                                          {collapser["0-" + childIndex + childIndex2 + childIndex3] === true && Array.isArray(childItem3?.childList)
                                                            ? childItem3?.childList.map((childItem4, childIndex4) => {
                                                              return (
                                                                <React.Fragment key={childIndex4}>
                                                                  <Row style={{ marginBottom: "8px" }}>
                                                                    <Col xs="12" style={{ color: "#3F4031", paddingLeft: `${viewWidth + 4}vw` }}>
                                                                      {childItem4.childList ? <span
                                                                        className={collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                                                        onClick={() => {
                                                                          setCollapser((prevCollapser) => ({
                                                                            ...prevCollapser,
                                                                            ["0-" + childIndex + childIndex2 + childIndex3 + childIndex4]: !prevCollapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4],
                                                                          }));
                                                                        }}
                                                                      ></span> :
                                                                        <span
                                                                          className={collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4] ? "mdi mdi-minus-box opacity-0" : "mdi mdi-plus-box opacity-0"}
                                                                        ></span>
                                                                      }
                                                                      &nbsp;
                                                                      <span className="mdi mdi-domain"></span>
                                                                      <a style={{ color: "#4c4c4c", fontWeight: (collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4] || selectedDeptData === childItem4.dept_id) ? "bold" : "normal", cursor: "pointer" }}
                                                                        className="unselectable-two"
                                                                        onClick={(e) => {

                                                                          dispatch(getMemberDetailData({ member_id: '' }))
                                                                          dispatch(getDetailDeptData({ dept_id: childItem4.dept_id }));
                                                                          let dept_id = ''
                                                                          dept_id = childItem4.dept_id
                                                                          ReactSession.remove('selectedMemberData')
                                                                          setSelectedDeptData(dept_id)
                                                                          setSelectedDeptName(childItem4.dept_name)
                                                                          ReactSession.set('selectedDeptData', dept_id)
                                                                        }
                                                                        }
                                                                      >
                                                                        &nbsp;
                                                                        {childItem4.dept_name}
                                                                      </a>
                                                                    </Col>
                                                                  </Row>
                                                                  {collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4] === true && Array.isArray(childItem4?.childList)
                                                                    ? childItem4?.childList.map((childItem5, childIndex5) => {
                                                                      return (
                                                                        <React.Fragment key={childIndex5}>
                                                                          <Row style={{ marginBottom: "8px" }}>
                                                                            <Col xs="12" style={{ color: "#3F4031", paddingLeft: `${viewWidth + 5}vw` }}>
                                                                              {childItem5.childList ? <span
                                                                                className={collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                                                                onClick={() => {
                                                                                  setCollapser((prevCollapser) => ({
                                                                                    ...prevCollapser,
                                                                                    ["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5]: !prevCollapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5],
                                                                                  }));
                                                                                }}
                                                                              ></span> :
                                                                                <span
                                                                                  className={collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5] ? "mdi mdi-minus-box opacity-0" : "mdi mdi-plus-box opacity-0"}
                                                                                ></span>
                                                                              }
                                                                              &nbsp;
                                                                              <span className="mdi mdi-domain"></span>
                                                                              <a style={{ color: "#4c4c4c", fontWeight: (collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5] || selectedDeptData === childItem5.dept_id) ? "bold" : "normal", cursor: "pointer" }}
                                                                                className="unselectable-two"
                                                                                onClick={(e) => {

                                                                                  dispatch(getMemberDetailData({ member_id: '' }))
                                                                                  dispatch(getDetailDeptData({ dept_id: childItem5.dept_id }));
                                                                                  let dept_id = ''
                                                                                  dept_id = childItem5.dept_id
                                                                                  ReactSession.remove('selectedMemberData')
                                                                                  setSelectedDeptData(dept_id)
                                                                                  setSelectedDeptName(childItem5.dept_name)
                                                                                  ReactSession.set('selectedDeptData', dept_id)
                                                                                }
                                                                                }
                                                                              >
                                                                                &nbsp;
                                                                                {childItem5.dept_name}
                                                                              </a>
                                                                            </Col>
                                                                          </Row>
                                                                          {collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5] === true && Array.isArray(childItem5?.childList)
                                                                            ? childItem5?.childList.map((childItem6, childIndex6) => {
                                                                              return (
                                                                                <React.Fragment key={childIndex6}>
                                                                                  <Row style={{ marginBottom: "8px" }}>
                                                                                    <Col xs="12" style={{ color: "#3F4031", paddingLeft: `${viewWidth + 6}vw` }}>
                                                                                      {childItem6.childList ? <span
                                                                                        className={collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5 + childIndex6] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                                                                        onClick={() => {
                                                                                          setCollapser((prevCollapser) => ({
                                                                                            ...prevCollapser,
                                                                                            ["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5 + childIndex6]: !prevCollapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5 + childIndex6],
                                                                                          }));
                                                                                        }}
                                                                                      ></span> :
                                                                                        <span
                                                                                          className={collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5 + childIndex6] ? "mdi mdi-minus-box opacity-0" : "mdi mdi-plus-box opacity-0"}
                                                                                        ></span>
                                                                                      }
                                                                                      &nbsp;
                                                                                      <span className="mdi mdi-domain"></span>
                                                                                      <a style={{ color: "#4c4c4c", fontWeight: (collapser["0-" + childIndex + childIndex2 + childIndex3 + childIndex4 + childIndex5 + childIndex6] || selectedDeptData === childItem6.dept_id) ? "bold" : "normal", cursor: "pointer" }}
                                                                                        className="unselectable-two"
                                                                                        onClick={(e) => {

                                                                                          dispatch(getMemberDetailData({ member_id: '' }))
                                                                                          dispatch(getDetailDeptData({ dept_id: childItem6.dept_id }));
                                                                                          let dept_id = ''
                                                                                          dept_id = childItem6.dept_id
                                                                                          ReactSession.remove('selectedMemberData')
                                                                                          setSelectedDeptData(dept_id)
                                                                                          setSelectedDeptName(childItem6.dept_name)
                                                                                          ReactSession.set('selectedDeptData', dept_id)
                                                                                        }
                                                                                        }
                                                                                      >
                                                                                        &nbsp;
                                                                                        {childItem6.dept_name}
                                                                                      </a>
                                                                                    </Col>
                                                                                  </Row>
                                                                                </React.Fragment>
                                                                              );
                                                                            })
                                                                            : null
                                                                          }
                                                                        </React.Fragment>
                                                                      );
                                                                    })
                                                                    : null
                                                                  }
                                                                </React.Fragment>
                                                              );
                                                            })
                                                            : null
                                                          }
                                                        </React.Fragment>
                                                      );
                                                    })
                                                    : null
                                                  }

                                                </React.Fragment>
                                              );
                                            })
                                            : (
                                              null
                                            )
                                        }
                                      </React.Fragment>
                                    );
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
                      style={{ backgroundColor: "#F6F6F6", border: "1px solid #BBB", width: "37%", paddingRight: 0, paddingLeft: 0, height: "85vh" }}
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
                      style={{ backgroundColor: "#F6F6F6", border: "1px solid #BBB", padding: 0, margin: 0, overflowX: "auto", overflowY: "auto" }}
                    >
                      {/* <DetailService
                    appDeptData={appDeptData}
                    selectedDeptData={selectedDeptData}
                    setSelectedDeptData={setSelectedDeptData}
                    setSelectedMemberData={setSelectedMemberData}
                    selectedMemberData={selectedMemberData}
                    appDetailDeptDataState={appDetailDeptDataState}
                  /> */}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Container>
            <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
              <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="danger" />
            </div>
          </React.Fragment>
        </>
      }
    />
  );
};

export default Rekomendasi;
