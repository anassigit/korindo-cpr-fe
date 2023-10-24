import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeptData, getDetailDeptData, getMemberDetailData, getMemberListData, getSearchData, resetMessage } from "store/actions";
import PropTypes from 'prop-types';
import '../../assets/scss/custom.scss';
import '../../config';
import { Col, Row } from "reactstrap";
import { ReactSession } from 'react-client-session';

const Member = (props) => {
  const dispatch = useDispatch();

  let selectedDeptData = ReactSession.get('selectedDeptData')

  let offset = props?.offset
  let limit = props?.limit

  const appDetailDeptData = useSelector((state) => state.ssoReducer.respGetDetailDept);
  const appMemberList2 = useSelector((state) => state.ssoReducer.respGetMemberList);

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  useEffect(() => {
    props.setMemberList(appMemberList2)
  }, [appMemberList2])

  useEffect(() => {
    dispatch(getDetailDeptData({ dept_id: selectedDeptData }));
    props.setCurrentPage(1);
    props.setOffset(0);
  }, [selectedDeptData]);

  useEffect(() => {
    if (!props.searchEntered || selectedDeptData) {
      dispatch(getMemberListData({
        "offset": offset,
        "limit": limit,
        "search": {
          "dept_id": selectedDeptData
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
    props.setAppDetailDeptDataState(appDetailDeptData)
  }, [props.searchEntered, selectedDeptData, offset, limit]);

  // Calculate the number of pages
  const totalPages = Math.ceil(props.appMemberList?.data?.count / limit);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    const newOffset = (newPage - 1) * limit;
    props.setOffset(newOffset);
    props.setCurrentPage(newPage);
  };

  return (
    <>
      <div style={{ overflow: "auto", height: "100%" }}>
        <span className="mdi mdi-domain" style={{ marginRight: "12px", paddingLeft: '12px' }}></span>
        {appDetailDeptData?.data?.list?.dept_name ? appDetailDeptData?.data?.list?.dept_name : 'Member List'}
        <div style={{ width: "100%", position: "relative", marginTop: "8px" }}>
          <Row className="px-2 py-3 text-white fw-bold" style={{ backgroundColor: "#8C8C8C", width: props.searchEntered ? "100%" : "100%", position: "relative", left: "0.85em" }}>
            {props.searchEntered ?
              <>
                <Col xs='3'>Departement</Col>
                <Col xs='3'>Name</Col>
                <Col xs='2'>Position</Col>
                <Col xs='3'>HP</Col>
              </>
              :
              <>
                <Col xs='4'>Name</Col>
                <Col xs='3'>Position</Col>
                <Col xs='3'>HP</Col>
              </>
            }
          </Row>
          {
            Array.isArray(props.appMemberList?.data?.list) &&
            props?.appMemberList?.data?.list.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div
                    className="px-2 py-3 member-row"
                    style={{
                      width: props.searchEntered ? "100%" : "100%",
                      position: "relative",
                      borderBottom: '1px solid rgba(73, 80, 87, 0.2)',
                      display: "flex",
                      alignItems: "center"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(getDetailDeptData({ dept_id: '' }));
                      dispatch(getMemberDetailData({ member_id: item?.member_id }))
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
                        >{item.name ? item.name : item.dept_name}</Col>
                        <Col xs='3'
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            paddingRight: "1%"
                          }}
                        >{item.name ? item.name : item.member_name}</Col>
                        <Col xs='2'>{item.position}</Col>
                        <Col
                          xs='3'
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            paddingRight: "1%"
                          }}
                        >
                          {item.hp}
                        </Col>

                      </>
                      :

                      <>
                        <Col xs='4'
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >{item.name ? item.name : item.member_name}</Col>
                        <Col xs='3'>{item.position}</Col>
                        <Col
                          xs='3'
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: '32%'
                          }}
                        >
                          {item.hp}
                        </Col>

                      </>
                    }
                  </div>

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

      <div className="text-white d-flex justify-content-center align-items-center text-center" style={{ backgroundColor: "#8C8C8C", width: props.searchEntered ? "100%" : "100%", left: "0em", zIndex: 1, position: "absolute", bottom: 0 }}>
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
                    color:"white",
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
  setSelectedMemberData: PropTypes.any,
  setAppDetailDeptDataState: PropTypes.any,
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
