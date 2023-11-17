import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row, UncontrolledTooltip } from "reactstrap";
import { getMemberListData, getSearchData, resetMessage } from "store/actions";
import '../../assets/scss/custom.scss';
import '../../config';
import RekomendasiModal from './RekomendasiModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Member = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [modalRekomendasi, setModalRekomendasi] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [employeeId, setEmployeeId] = useState()

  let selectedDeptData = ReactSession.get('selectedDeptData')

  let offset = props?.offset
  let limit = props?.limit

  const appMemberList2 = useSelector((state) => state.rekomendasiReducer.respGetMemberList);

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  useEffect(() => {
    props.setMemberList(appMemberList2)
  }, [appMemberList2])

  useEffect(() => {
    if (history.location.state && history.location.state.member_id) {
      setEmployeeId(history.location.state.member_id)
      setIsAdd(true)
      setModalRekomendasi(true)
    }
  }, [history.location.state])

  useEffect(() => {
    if (modalRekomendasi && isAdd) {
      const timeoutId = setTimeout(() => {
        history.replace({ state: { member_id: null } });
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [modalRekomendasi, isAdd, history]);

  useEffect(() => {
    props.setCurrentPage(1);
    props.setOffset(0);
  }, [selectedDeptData]);

  useEffect(() => {
    ReactSession.set('offset', offset)
    ReactSession.set('limit', limit)
    if (!props.searchEntered || selectedDeptData) {
      dispatch(getMemberListData({
        "offset": offset,
        "limit": limit,
        "search": {
          "org_id": selectedDeptData
        }
      }));
    } else {
      dispatch(getSearchData({
        "offset": offset,
        "limit": limit,
        "search": {
          "search": props.searchVal
        }
      }))
    }
    // props.setAppDetailDeptDataState(appDetailDeptData)
  }, [props.searchEntered, selectedDeptData, offset, limit]);

  // Calculate the number of pages
  const totalPages = Math.ceil(props.appMemberList?.data?.count / limit);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    const newOffset = (newPage - 1) * limit;
    props.setOffset(newOffset);
    props.setCurrentPage(newPage);
  };

  const toggleModal = () => {
    setModalRekomendasi(!modalRekomendasi)
  }

  return (
    <>
      <RekomendasiModal
        toggle={toggleModal}
        modal={modalRekomendasi}
        isAdd={isAdd}
        employee_id={employeeId}
      />
      <div style={{ overflow: "auto", height: "100%" }}>
        <span className="mdi mdi-domain" style={{ marginRight: "12px", paddingLeft: '12px' }}></span>
        <span>
          {props.selectedDeptName ? props.selectedDeptName : 'Member List'}
        </span>
        <div style={{ width: "100%", position: "relative", marginTop: "8px" }}>
          <Row className="text-white fw-bold bg-primary" style={{ width: props.searchEntered ? "100%" : "100%", position: "relative", left: "0.85em", paddingTop: "2%", paddingBottom: "2%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {props.searchEntered ?
              <>
                <Col xs='3'>Departement</Col>
                <Col xs='3'>Name</Col>
                <Col xs='2' style={{ paddingLeft: "3%" }}>Position</Col>
                <Col xs='4' style={{ paddingLeft: "10%" }} className="text-center">Apresiasi</Col>
              </>
              :
              <>
                <Col xs='4'>Name</Col>
                <Col xs='3'>Position</Col>
                <Col xs='5' className="text-center">Apresiasi</Col>
              </>
            }
          </Row>
          {
            Array.isArray(props.appMemberList?.data?.list) &&
            props?.appMemberList?.data?.list.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <a
                    className="px-2 member-row"
                    style={{
                      width: props.searchEntered ? "100%" : "100%",
                      position: "relative",
                      borderBottom: '1px solid rgba(73, 80, 87, 0.2)',
                      display: "flex",
                      alignItems: "center",
                      paddingBottom: "1vh",
                      paddingTop: "1vh",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      props.setSelectedMemberData(item);
                      ReactSession.set('selectedMemberData', item)
                    }}
                  >
                    &nbsp;
                    {props.searchEntered ?
                      <>
                        <Col xs='3'
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            paddingRight: "1%"
                          }}
                        >{item.dept_name ? item.dept_name : item.dept_name}</Col>
                        <Col xs='3'
                          id={`index-${index}`}
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            paddingRight: "1%"
                          }}
                        >{item.name ? item.name : item.member_name}</Col>
                        <UncontrolledTooltip target={`index-${index}`} placement='top'>
                          {item.name}
                        </UncontrolledTooltip>
                        <Col xs='2' style={{}}>{item.position}</Col>
                        <Col
                          xs='4'
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",

                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {
                            item.recommend_type?.toUpperCase() === "CAN" ?
                              (
                                <Button
                                  className="btn btn-warning text-center text-light"
                                  style={{ border: "none", paddingTop: ".5vh", paddingBottom: ".5vh", fontSize: ".8rem", gap: "2px" }}
                                  onClick={() => {
                                    setIsAdd(true)
                                    setModalRekomendasi(true)
                                    setEmployeeId(item.id)
                                  }}
                                >
                                  Beri Bintang
                                  <span className="mdi mdi-star" style={{ marginLeft: '2px' }}></span>
                                </Button>
                              )
                              :
                              item.recommend_type.toUpperCase() === "CANNOT" ?
                                <Button
                                  disabled
                                  className="btn btn-warning text-center text-light opacity-0"
                                  style={{ border: "none", paddingTop: ".5vh", paddingBottom: ".5vh", fontSize: ".8rem", gap: "2px" }}
                                  onClick={() => {
                                    setIsAdd(true)
                                    setModalRekomendasi(true)
                                    setEmployeeId(item.id)
                                  }}
                                >
                                  Beri Bintang
                                  <span className="mdi mdi-star" style={{ marginLeft: '2px' }}></span>
                                </Button>
                                :
                                <span
                                  className="mdi mdi-check-circle text-success"
                                  style={{
                                    marginTop: "-8px",
                                    marginBottom: "-8px",
                                    fontSize: "24px"
                                  }}>
                                </span>
                          }
                        </Col>

                      </>
                      :

                      <>
                        <Col xs='4'
                          id={`index-${index}`}
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",

                          }}
                        >{item.name ? item.name : item.member_name}</Col>
                        <UncontrolledTooltip target={`index-${index}`} placement='top'>
                          {item.name}
                        </UncontrolledTooltip>
                        <Col xs='3' style={{}}>{item.position}</Col>
                        <Col
                          xs='4'
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            position: "relative",
                            left: "2.5%",
                            display: "flex",
                            justifyContent: "center",
                            paddingRight: "1%"
                          }}
                        >
                          {
                            item.recommend_type?.toUpperCase() === "CAN" ?
                              (
                                <Button
                                  className="btn btn-warning text-center text-light"
                                  style={{ border: "none", paddingTop: ".5vh", paddingBottom: ".5vh", fontSize: ".8rem", gap: "2px" }}
                                  onClick={() => {
                                    setIsAdd(true)
                                    setModalRekomendasi(true)
                                    setEmployeeId(item.id)
                                  }}
                                >
                                  Beri Bintang
                                  <span className="mdi mdi-star" style={{ marginLeft: '2px' }}></span>
                                </Button>
                              )
                              :
                              item.recommend_type.toUpperCase() === "CANNOT" ?
                                <Button
                                  disabled
                                  className="btn btn-warning text-center text-light opacity-0"
                                  style={{ border: "none", paddingTop: ".5vh", paddingBottom: ".5vh", fontSize: ".8rem", gap: "2px" }}
                                  onClick={() => {
                                    setIsAdd(true)
                                    setModalRekomendasi(true)
                                    setEmployeeId(item.id)
                                  }}
                                >
                                  Beri Bintang
                                  <span className="mdi mdi-star" style={{ marginLeft: '2px' }}></span>
                                </Button>
                                :
                                <span
                                  className="mdi mdi-check-circle text-success"
                                  style={{
                                    marginTop: "-8px",
                                    marginBottom: "-8px",
                                    fontSize: "24px"
                                  }}>
                                </span>
                          }
                        </Col>

                      </>
                    }
                  </a>

                </React.Fragment>
              )
            })
          }
          <Row>
            <Row className="px-2 py-3 text-white fw-bold opacity-0" style={{ width: props.searchEntered ? "100%" : "100%", position: "relative", left: "0.85em" }}>
              <Col xs='3'></Col>
              <Col xs='3'></Col>
              <Col xs='2'></Col>
              <Col xs='3'></Col>
            </Row>
          </Row>
        </div>
      </div>

      <div className="text-white d-flex justify-content-center align-items-center text-center bg-primary" style={{ width: props.searchEntered ? "100%" : "100%", left: "0em", zIndex: 1, position: "absolute", bottom: 0 }}>
        <Col xs='3'>
          {props.currentPage > 1 ? (
            <span className="mdi mdi-menu-left" style={{ fontSize: "32px", cursor: "pointer" }} onClick={() => handlePageChange(props.currentPage - 1)} />
          ) : (
            <span className="mdi mdi-menu-left opacity-0" style={{ fontSize: "32px" }} />
          )}
        </Col>
        <Col xs='3'>
          {/* Render page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, props.currentPage - (totalPages === props.currentPage ? 3 : 2)), Math.min(props.currentPage + (props.currentPage === 1 ? 2 : 1), totalPages))
            .map((pageNumber) => {
              return (
                <a
                  key={pageNumber}
                  className={`unselectable page-number ${pageNumber === props.currentPage ? 'active' : ''}`}
                  style={{
                    color: "white",
                    paddingLeft: '10%',
                    fontWeight: pageNumber === props.currentPage ? 'bold' : '',
                    fontSize: '16px',
                    textDecoration: pageNumber === props.currentPage ? 'underline' : '',
                  }}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </a>
              )
            }
            )}

        </Col>
        <Col xs='3'>
          {props.currentPage < totalPages ? (
            <span className="mdi mdi-menu-right" style={{ fontSize: "32px", cursor: "pointer" }} onClick={() => handlePageChange(props.currentPage + 1)} />
          ) : (
            <span className="mdi mdi-menu-right opacity-0" style={{ fontSize: "32px" }} />
          )}
        </Col>
      </div>
    </>
  );
};

Member.propTypes = {
  appDeptData: PropTypes.any,
  selectedDeptData: PropTypes.any,
  selectedDeptName: PropTypes.any,
  setSelectedMemberData: PropTypes.any,
  offset: PropTypes.any,
  limit: PropTypes.any,
  setOffset: PropTypes.any,
  setLimit: PropTypes.any,
  setMemberList: PropTypes.any,
  appMemberList: PropTypes.any,
  searchVal: PropTypes.any,
  setCurrentPage: PropTypes.any,
  currentPage: PropTypes.any,
  searchEntered: PropTypes.any,
};

export default Member;
