import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormFeedback, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledTooltip } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css';
import { getMemberListForAdd, getMemberListOrgData, saveMappingMember } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import TableCustom from 'common/TableCustom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ModalKaryawan = ({ modal, toggle, toggleApply, isAdd, selectedDeptData, setAppOrganizationMsg, setLoadingSpinner, appMemberTabelSearch }) => {

    const dispatch = useDispatch()

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
            // props.setAppMemberListForAddMsg('')

            // dispatch(addMemberListForAdd({
            //     memberId: values.memberId,
            //     locationId: values.locationId,
            // }))

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
            any: appAddMemberListForAddValidInput.values.search,
        }
    });

    const appMemberForAddColumn = [
        {
            dataField: "memberId",
            text: "Member ID",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
            events: {
                onClick: (e, column, columnIndex, rowIndex) => {
                    const clickedRowData = rowIndex
                    setAppOrganizationMsg('')
                    dispatch(
                        saveMappingMember({
                            orgCd: selectedDeptData.orgCd,
                            memberId: clickedRowData.memberId,
                        })
                    );
                    toggle()
                    setLoadingSpinner(true)
                },
            },
        },
        {
            dataField: "memberName",
            text: "Nama",
            sort: true,
            headerStyle: { textAlign: 'center' },
            events: {
                onClick: (e, column, columnIndex, rowIndex) => {
                    const clickedRowData = rowIndex
                    setAppOrganizationMsg('')
                    dispatch(
                        saveMappingMember({
                            orgCd: selectedDeptData.orgCd,
                            memberId: clickedRowData.memberId,
                        })
                    );
                    toggle()
                    setLoadingSpinner(true)
                },
            },
        },
        {
            dataField: "deptName",
            text: "Department",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
            events: {
                onClick: (e, column, columnIndex, rowIndex) => {
                    const clickedRowData = rowIndex
                    setAppOrganizationMsg('')
                    dispatch(
                        saveMappingMember({
                            orgCd: selectedDeptData.orgCd,
                            memberId: clickedRowData.memberId,
                        })
                    );
                    toggle()
                    setLoadingSpinner(true)
                },
            },
            formatter: () => {
                return <span className='unselectable opacity-50'>(belum ada)</span>
            }
        },
        {
            dataField: "positionName",
            text: "Posisi",
            sort: true,
            headerStyle: { textAlign: 'center' },
            events: {
                onClick: (e, column, columnIndex, rowIndex) => {
                    const clickedRowData = rowIndex
                    setAppOrganizationMsg('')
                    dispatch(
                        saveMappingMember({
                            orgCd: selectedDeptData.orgCd,
                            memberId: clickedRowData.memberId,
                        })
                    );
                    toggle()
                    setLoadingSpinner(true)
                },
            },
        },
    ]

    useEffect(() => {
        if (appMsgAdd) {
            setAppOrganizationMsg(appMsgAdd)
            dispatch(getMemberListOrgData(appMemberTabelSearch))
        }
    }, [appMsgAdd])

    return (
        <Modal size='lg' isOpen={modal} toggle={toggle} backdrop="static">
            <ModalHeader toggle={toggle}>Pilih {isAdd ? 'Member' : 'Department'}</ModalHeader>
            <ModalBody>
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
                                <FormGroup>
                                    <div style={{
                                        display: 'flex',
                                        marginBottom: '12px',
                                    }}>
                                        <Input
                                            type='search'
                                            style={{
                                                borderRadius: '5px 0 0 5px'
                                            }}
                                            value={appAddMemberListForAddValidInput.values.search}
                                            onChange={(e) => appAddMemberListForAddValidInput.setFieldValue('search', e.target.value)}
                                        />
                                        <Button
                                            style={{
                                                borderRadius: '0 5px 5px 0'
                                            }}
                                        >
                                            <span className='mdi mdi-magnify' />
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
                                    />
                                </FormGroup>
                            </Form>
                        </>
                    ) :
                        (
                            <>
                            </>
                        )
                }
            </ModalBody>
            <ModalFooter>

                <Button className='btn btn-danger' style={{ border: 'none', color: "white", marginTop: '-32px' }} onClick={toggleApply}>
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
};

export default ModalKaryawan;
