import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormFeedback, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, UncontrolledTooltip } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css';
import { getMemberListForAdd, getMemberListOrgData, saveMappingMember } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import TableCustom from 'common/TableCustom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ModalKaryawan = ({ modal, toggle, toggleApply, isAdd, selectedDeptData, setAppOrganizationMsg, setLoadingSpinner, appMemberTabelSearch, selectedDeptData2, setSelectedDeptData2 }) => {

    const dispatch = useDispatch()

    const [collapser, setCollapser] = useState({
        "1": true,
        "2": true,
    })
    const [selectedDeptName, setSelectedDeptName] = useState()
    const [selectedMemberData, setSelectedMemberData] = useState({})

    const appOrganizationListData = useSelector((state) => {
        return state.organizationReducer.respGetOrganizationList
    })

    const appMemberListForAddData = useSelector((state) => {
        return state.organizationReducer.respGetMemberListForAdd
    });

    const appMsgAdd = useSelector((state) => {
        return state.organizationReducer.msgAdd
    });

    const appAddMemberListForAddValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            search: '',
        },
        validationSchema: Yup.object().shape({
        }),

        onSubmit: (values) => {
        }
    });

    const [appMemberForAddTabelSearch, setAppMemberForAddTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search:
        {
            any: '',
        }
    });

    const rowStyles = (row, rowIndex) => {
        return {
            backgroundColor: row === selectedMemberData ? '#EFF2F7' : 'white',
            transition: 'background-color 0.3s', // Optional: Add a smooth transition
        };
    };
    const appMemberForAddColumn = [
        {
            dataField: "memberId",
            text: "Karyawan ID",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: 'white' },
            events: {
                onClick: (e, column, columnIndex, rowIndex) => {
                    const clickedRowData = rowIndex
                    setAppOrganizationMsg('')
                    setSelectedMemberData(clickedRowData)
                },
            },
        },
        {
            dataField: "memberName",
            text: "Nama",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: 'white' },
            events: {
                onClick: (e, column, columnIndex, rowIndex) => {
                    const clickedRowData = rowIndex
                    setAppOrganizationMsg('')
                    setSelectedMemberData(clickedRowData)
                },
            },
        },
        {
            dataField: "positionName",
            text: "Posisi",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: 'white' },
            events: {
                onClick: (e, column, columnIndex, rowIndex) => {
                    const clickedRowData = rowIndex
                    setSelectedMemberData(clickedRowData)
                },
            },
        },
    ]

    const handleApply = () => {
        setAppOrganizationMsg('')
        dispatch(
            saveMappingMember({
                orgCd: selectedDeptData.orgCd,
                memberId: selectedMemberData.memberId,
            })
        );
        appAddMemberListForAddValidInput.resetForm()
        setAppMemberForAddTabelSearch((prevState) => ({
            ...prevState,
            search: {
                any: '',
            },
        }))
        setLoadingSpinner(true)
        setSelectedMemberData(null)
        toggle()
    }

    useEffect(() => {
        setAppMemberForAddTabelSearch((prevState) => ({
            ...prevState,
            search: {
                any: appAddMemberListForAddValidInput.values.search,
            },
        }))
    }, [appAddMemberListForAddValidInput.values.search])

    // useEffect(() => {
    //     if (selectedMemberData) {
    //         appAddMemberListForAddValidInput.setFieldValue('search', selectedMemberData.memberName)
    //     }
    // }, [selectedMemberData])

    useEffect(() => {
        if (appMsgAdd) {
            setAppOrganizationMsg(appMsgAdd)
            dispatch(getMemberListOrgData(appMemberTabelSearch))
        }
    }, [appMsgAdd])

    const CollapsibleList = ({ data, collapser, setCollapser, selectedDeptData2, setSelectedDeptData2, setSelectedDeptName, depth = 0 }) => {

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
                                        border: selectedDeptData2 === item ? '1px solid #A084DC75' : '',
                                        borderRadius: '5px',
                                    }}>
                                        {item.childList?.length > 0 ? (
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
                                                fontWeight: collapser[item.orgCd] || selectedDeptData.orgCd === item.orgCd ? "bold" : "normal",
                                                cursor: "pointer",
                                            }}
                                            className="unselectable-two"
                                            onClick={(e) => {
                                                if (item.childList?.length > 0) {
                                                    setCollapser((prevCollapser) => {
                                                        return {
                                                            ...prevCollapser,
                                                            [item.orgCd]: !prevCollapser[item.orgCd],
                                                        };
                                                    });
                                                }
                                                setSelectedDeptData2(item);
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
                                        selectedDeptData2={selectedDeptData2}
                                        setSelectedDeptData2={setSelectedDeptData2}
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
                                                fontWeight: collapser[data.orgCd] || selectedDeptData2.orgCd === data.orgCd ? "bold" : "normal",
                                                cursor: "pointer",
                                            }}
                                            className="unselectable-two"
                                            onClick={(e) => {
                                                setSelectedDeptData2(data);
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
                                        selectedDeptData2={selectedDeptData2}
                                        setSelectedDeptData2={setSelectedDeptData2}
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
        selectedDeptData2: PropTypes.any,
        setSelectedDeptData2: PropTypes.any,
        setSelectedDeptName: PropTypes.any,
        depth: PropTypes.any,
    };

    return (
        <Modal size={isAdd ? 'lg' : 'md'} isOpen={modal} toggle={toggle} backdrop="static">
            <ModalHeader toggle={toggle}>Pilih {isAdd ? 'Karyawan' : 'Department'}</ModalHeader>
            <ModalBody
                style={{
                    padding: '16px 16px 0 16px',
                    overflow: 'auto',
                    maxHeight: '75vh',
                }}
            >
                {
                    isAdd ? (
                        <>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    appAddMemberListForAddValidInput.handleSubmit();
                                    return false
                                }}
                            >
                                <FormGroup
                                    className='form-cust'
                                >
                                    <div style={{
                                        display: 'flex',
                                        marginBottom: '12px',
                                    }}>
                                        <Input
                                            type='search'
                                            style={{
                                                borderRadius: '5px 0 0 5px'
                                            }}
                                            value={appAddMemberListForAddValidInput.values.search || ''}
                                            onChange={(e) => appAddMemberListForAddValidInput.setFieldValue('search', e.target.value)}
                                        />
                                        <Button
                                            style={{
                                                borderRadius: '0 5px 5px 0'
                                            }}
                                        >
                                            <span className='fas fa-search' />
                                            {/* <span>
                                                Terpilih
                                            </span> */}
                                        </Button>
                                    </div>

                                    <TableCustom
                                        keyField={"memberId"}
                                        columns={appMemberForAddColumn}
                                        redukResponse={appMemberListForAddData}
                                        appdata={appMemberListForAddData?.data != null && appMemberListForAddData?.data.lov ? appMemberListForAddData?.data.lov : []}
                                        appdataTotal={appMemberListForAddData?.data != null ? appMemberListForAddData?.data.count : 0}
                                        searchSet={setAppMemberForAddTabelSearch}
                                        searchGet={appMemberForAddTabelSearch}
                                        redukCall={getMemberListForAdd}
                                        rowStyles={rowStyles}
                                    />
                                </FormGroup>
                            </Form>
                        </>
                    ) :
                        (
                            <>

                                <CollapsibleList
                                    data={appOrganizationListData?.data?.result}
                                    collapser={collapser}
                                    setCollapser={setCollapser}
                                    selectedDeptData2={selectedDeptData2}
                                    setSelectedDeptData2={setSelectedDeptData2}
                                    setSelectedDeptName={setSelectedDeptName}
                                />
                            </>
                        )
                }
            </ModalBody>
            <ModalFooter
            >
                {
                    selectedDeptData2.deptName ? (
                        <>
                            <span>
                                <b>{selectedDeptData2.deptName}</b> dipilih
                            </span>
                            <Button
                                onClick={toggleApply}
                            >
                                Apply
                            </Button>
                        </>
                    ) :
                        selectedMemberData?.memberName ? (
                            <>
                                <span>
                                    <b>{selectedMemberData?.memberName}</b> dipilih
                                </span>
                                <Button
                                    onClick={handleApply}
                                >
                                    Apply
                                </Button>
                            </>
                        ) :
                            null
                }
                <Button className='btn btn-danger' style={{ border: 'none', color: "white", }} onClick={() => {
                    setAppMemberForAddTabelSearch((prevState) => ({
                        ...prevState,
                        search: {
                            any: '',
                        },
                    }))
                    setSelectedMemberData(null)
                    toggle()
                }}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

ModalKaryawan.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    toggleApply: PropTypes.any,
    isAdd: PropTypes.any,
    selectedDeptData: PropTypes.any,
    setAppOrganizationMsg: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
    appMemberTabelSearch: PropTypes.any,
    selectedDeptData2: PropTypes.any,
    setSelectedDeptData2: PropTypes.any,
};

export default ModalKaryawan;
