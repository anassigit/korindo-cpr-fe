import TableCustom from 'common/TableCustom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, UncontrolledTooltip } from 'reactstrap'
import { deleteApplicationRoleUser, getUserRoleListDataAction } from 'store/actions'
import PropTypes from 'prop-types'
import AddApplicationRoleUser from './AddApplicationRoleUser'
import EditApplicationRoleUser from './EditApplicationRoleUser'
import MsgModal from 'components/Common/MsgModal'

const UserRoleAccess = (props) => {

    const dispatch = useDispatch()

    const [searchVal, setSearchVal] = useState('')
    const [appSelectedRole, setAppSelectedRole] = useState({})

    const [modal, setModal] = useState(false)
    const [memberId, setMemberId] = useState('')

    const appUserRoleData = useSelector((state) => {
        return state.maintainRoleReducer.respGetUserRoleList
    })

    const appMessageDelete = useSelector((state) => state.maintainRoleReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.maintainRoleReducer.msgAdd);

    const appMessageEdit = useSelector((state) => {
        return state.maintainRoleReducer.msgEdit
    });

    const [appUserRoleTabelSearch, setAppUserRoleTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search:
        {
            search: searchVal,
            roleId: '',
        }
    });

    const handleClick = () => {
        setAppUserRoleTabelSearch((prevState) => ({
            ...prevState,
            page: 1,
            offset: 0,
            search: {
                ...prevState.search,
                search: searchVal,
            },
        }));
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClick();
        }
    };

    const appAccessColumn = [
        {
            dataField: "roleId",
            text: "Kode Role",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
        },
        {
            dataField: "roleName",
            text: "Nama Role",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "memberId",
            text: "Kode Karyawan",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "memberName",
            text: "Nama Karyawan",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "startDate",
            text: "Begin Effective",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "endDate",
            text: "End Effective",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            text: "Actions",
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center', fontSize: '16px' },
            formatter: (cellContent, cellData) => {
                return (
                    <React.Fragment>
                        <a id={`edit-${cellData.memberId.replace(/\s+/g, '_')}`} className="mdi mdi-pencil text-primary" onClick={() => preEditUserRole(cellData)} />
                        <a id={`delete-${cellData.memberId.replace(/\s+/g, '_')}`} className="mdi mdi-delete text-danger" style={{ marginLeft: '1vw' }} onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${cellData.memberId.replace(/\s+/g, '_')}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${cellData.memberId.replace(/\s+/g, '_')}`}>Delete</UncontrolledTooltip>
                    </React.Fragment>
                )
            }
        },
    ]

    useEffect(() => {
        if (props.tabUserRole) {
            setAppUserRoleTabelSearch((prevState) => ({
                ...prevState,
                search: {
                    ...prevState.search,
                    roleId: props.appMaintainRoleData.roleId,
                },
            }))
        }
    }, [props.tabUserRole])


    useEffect(() => {
        let messageToUpdate;

        if (appMessageDelete.status === '1' || appMessageDelete.status === '0') {
            messageToUpdate = appMessageDelete;
            if (appMessageDelete.status === '1') {
                // Additional logic for appMessageDelete with status '1'
            }
        }

        if (messageToUpdate) {
            props.setLoadingSpinner(false);
            dispatch(getUserRoleListDataAction(appUserRoleTabelSearch));
            props.setAppMaintainRoleMsg(messageToUpdate);
        }
    }, [appMessageDelete]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageAdd.status === '1' || appMessageAdd.status === '0') {
            messageToUpdate = appMessageAdd;
            if (appMessageAdd.status === '1' && props.appAddUserRole) {
                props.setTabUserRole(true);
                props.setAppAddUserRole(false);
            }
        }

        if (messageToUpdate) {
            props.setLoadingSpinner(false);
            dispatch(getUserRoleListDataAction(appUserRoleTabelSearch));
            props.setAppMaintainRoleMsg(messageToUpdate);
        }
    }, [appMessageAdd]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1' && props.appEditUserRole) {
                props.setTabUserRole(true);
                props.setAppEditUserRole(false);
            }
        }

        if (messageToUpdate) {
            props.setLoadingSpinner(false);
            dispatch(getUserRoleListDataAction(appUserRoleTabelSearch));
            props.setAppMaintainRoleMsg(messageToUpdate);
        }
    }, [appMessageEdit]);

    const appPreAddUserRole = () => {
        props.setTabUserRole(false)
        props.setAppAddUserRole(true)
    }

    const preEditUserRole = (data) => {
        setAppSelectedRole(data)
        props.setTabUserRole(false)
        props.setAppEditUserRole(true)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data.roleId) {
            setMemberId(data.memberId)
        }
    }

    const toggleApply = () => {
        props.setAppMaintainRoleMsg('')
        dispatch(deleteApplicationRoleUser({
            roleId: props.appMaintainRoleData.roleId,
            memberId: memberId,
        }))
        setModal(!modal)
        props.setLoadingSpinner(true)
    }

    return (
        <>
            <div
                style={{
                    display: props.tabUserRole ? "block" : 'none',
                }}
            >
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
                >
                    <div
                        className="col-lg-6 pb-2"
                    >
                        <div
                            className="col-lg-5"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "12px",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            Search
                            <Input
                                type="search"
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                                onKeyDown={handleEnterKeyPress}
                            />
                            <Button
                                onClick={() => {
                                    handleClick()
                                }}
                            >
                                Cari
                            </Button>
                        </div>
                    </div>
                </div>

                <div
                    className="col-12 pb-3"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "12px",
                        justifyContent: "right",
                        alignItems: "center",
                    }}
                >
                    <Button
                        onClick={() => appPreAddUserRole()}
                    >
                        <span className="mdi mdi-plus" /> Tambah
                    </Button>
                </div>

                {
                    props.tabUserRole && (
                        <TableCustom
                            keyField={row => `${row.roleId.toString()}_${row.memberId.toString()}`}
                            columns={appAccessColumn}
                            redukResponse={appUserRoleData}
                            appdata={appUserRoleData?.data?.list?.length > 0 ? appUserRoleData?.data?.list : []}
                            appdataTotal={appUserRoleData?.data != null ? appUserRoleData?.data.count : 0}
                            searchSet={setAppUserRoleTabelSearch}
                            searchGet={appUserRoleTabelSearch}
                            redukCall={getUserRoleListDataAction}
                        />
                    )
                }

            </div>

            <AddApplicationRoleUser
                appAddUserRole={props.appAddUserRole}
                setAppAddUserRole={props.setAppAddUserRole}
                setAppMaintainRoleMsg={props.setAppMaintainRoleMsg}
                setTabUserRole={props.setTabUserRole}
                appMaintainRoleData={props.appMaintainRoleData}
            />

            <EditApplicationRoleUser
                appEditUserRole={props.appEditUserRole}
                setAppEditUserRole={props.setAppEditUserRole}
                setAppMaintainRoleMsg={props.setAppMaintainRoleMsg}
                setTabUserRole={props.setTabUserRole}
                appMaintainRoleData={props.appMaintainRoleData}
                appSelectedRole={appSelectedRole}
            />

            <MsgModal
                toggle={toggleDeleteModal}
                toggleApply={toggleApply}
                modal={modal}
                message={'Apakah anda yakin untuk menghapus ini?'}
            />
        </>
    )
}

UserRoleAccess.propTypes = {
    tabUserRole: PropTypes.any,
    setTabUserRole: PropTypes.any,
    appAddUserRole: PropTypes.any,
    setAppAddUserRole: PropTypes.any,
    appEditUserRole: PropTypes.any,
    setAppEditUserRole: PropTypes.any,
    setAppMaintainRoleMsg: PropTypes.any,
    appMaintainRoleData: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

export default UserRoleAccess