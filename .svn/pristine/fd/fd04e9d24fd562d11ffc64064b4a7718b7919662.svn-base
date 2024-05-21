import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Row, UncontrolledTooltip } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css';

const ModalDept = ({ modal, toggle, toggleApply, orgCd, setOrgCd, tempOrgCd, setTempOrgCd }) => {

    const dispatch = useDispatch()

    const [collapser, setCollapser] = useState({
        "1": true,
        "2": true,
    })

    const [selectedDeptName, setSelectedDeptName] = useState()

    const appDeptListData = useSelector((state) => {
        return state.laporanAllDataReducer.respGetDeptAllData
    })


    const CollapsibleList = ({ data, collapser, setCollapser, tempOrgCd, setTempOrgCd, setSelectedDeptName, depth = 0 }) => {

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
                                        border: tempOrgCd === item.orgCd ? '1px solid #A084DC75' : '',
                                        borderRadius: '5px',
                                    }}>
                                        {Array.isArray(item.childList) && item.childList?.length > 0 ? (
                                            <span
                                                className={collapser[item.orgCd] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                                onClick={() => {
                                                    setCollapser((prevCollapser) => {
                                                        return {
                                                            ...prevCollapser,
                                                            [item.orgCd]: !prevCollapser[item.orgCd],
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
                                                fontWeight: collapser[item.orgCd] ? "bold" : "normal",
                                                cursor: "pointer",
                                            }}
                                            className="unselectable-two"
                                            onClick={(e) => {
                                                // if (item.childList.length > 0) {
                                                //     setCollapser((prevCollapser) => {
                                                //         return {
                                                //             ...prevCollapser,
                                                //             [item.orgCd]: !prevCollapser[item.orgCd],
                                                //         };
                                                //     });
                                                // }
                                                setTempOrgCd(item.orgCd);
                                                setSelectedDeptName(item.deptName);
                                            }}
                                        >
                                            &nbsp;
                                            <span
                                                id={item.orgCd}
                                            >
                                                {item.deptName}
                                            </span>
                                            {item.orgCd && (
                                                <UncontrolledTooltip target={() => document.getElementById(item.orgCd)} placement="top">
                                                    {item.deptName}
                                                </UncontrolledTooltip>
                                            )}
                                        </a>
                                    </div>
                                </Row>

                                {item.childList && collapser[item.orgCd] === true && (
                                    <CollapsibleList
                                        data={item.childList}
                                        collapser={collapser}
                                        setCollapser={setCollapser}
                                        tempOrgCd={tempOrgCd}
                                        setTempOrgCd={setTempOrgCd}
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
                                                className={collapser[data.orgCd] ? "mdi mdi-minus-box" : "mdi mdi-plus-box"}
                                                onClick={() => {
                                                    setCollapser((prevCollapser) => {
                                                        return {
                                                            ...prevCollapser,
                                                            [data.orgCd]: !prevCollapser[data.orgCd],
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
                                                fontWeight: tempOrgCd === data.orgCd ? "bold" : "normal",
                                                cursor: "pointer",
                                            }}
                                            className="unselectable-two"
                                            onClick={(e) => {
                                                setTempOrgCd(data);
                                                setSelectedDeptName(data.deptName);
                                            }}
                                        >
                                            &nbsp;
                                            <span
                                                style={{
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis",
                                                }}
                                                id={data.orgCd}
                                            >
                                                {data.deptName}
                                            </span>
                                            {data.orgCd && (
                                                <UncontrolledTooltip target={() => document.getElementById(data.orgCd)} placement="top">
                                                    {data.deptName}
                                                </UncontrolledTooltip>
                                            )}
                                        </a>
                                    </div>
                                </Row>

                                {data.childList && collapser[data.orgCd] === true && (
                                    <CollapsibleList
                                        data={data.childList}
                                        collapser={collapser}
                                        setCollapser={setCollapser}
                                        tempOrgCd={tempOrgCd}
                                        setTempOrgCd={setTempOrgCd}
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
        collapser: PropTypes.any,
        setCollapser: PropTypes.any,
        tempOrgCd: PropTypes.any,
        setTempOrgCd: PropTypes.any,
        setSelectedDeptName: PropTypes.any,
        depth: PropTypes.any,
    };

    return (
        <Modal size={'md'} isOpen={modal} toggle={toggle} backdrop="static">
            <ModalHeader toggle={toggle}>Pilih Department</ModalHeader>
            <ModalBody
                style={{
                    padding: '16px 16px 0 16px',
                    overflow: 'auto',
                    maxHeight: '75vh',
                }}
            >
                <CollapsibleList
                    data={appDeptListData?.data?.result}
                    collapser={collapser}
                    setCollapser={setCollapser}
                    tempOrgCd={tempOrgCd}
                    setTempOrgCd={setTempOrgCd}
                    setSelectedDeptName={setSelectedDeptName}
                />
            </ModalBody>
            <ModalFooter
            >
                <span>
                    <b>{selectedDeptName}</b> dipilih
                </span>
                <Button
                    onClick={toggleApply}
                >
                    Apply
                </Button>
                <Button className='btn btn-danger' style={{ border: 'none', color: "white", }} onClick={() => {
                    toggle()
                }}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

ModalDept.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    toggleApply: PropTypes.any,
    orgCd: PropTypes.any,
    setOrgCd: PropTypes.any,
    tempOrgCd: PropTypes.any,
    setTempOrgCd: PropTypes.any,
};

export default ModalDept;
