import TableCustom from 'common/TableCustom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, UncontrolledTooltip } from 'reactstrap'
import { getUserRoleListDataAction } from 'store/actions'
import PropTypes from 'prop-types'
import AddApplicationRoleUser from './AddApplicationRoleUser'

const UserRoleAccess = (props) => {

    const [searchVal, setSearchVal] = useState('')

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
            roleId: props.appMaintainRoleData.roleId,
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
                        <a id={`edit-${cellData.roleId}`} className="mdi mdi-pencil text-primary" onClick={() => preEditMaintainRole(cellData)} />
                        <a id={`delete-${cellData.roleId}`} className="mdi mdi-delete text-danger" style={{ marginLeft: '1vw' }} onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${cellData.roleId}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${cellData.roleId}`}>Delete</UncontrolledTooltip>
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
            dispatch(getUserRoleListDataAction(appAccessTabelSearch));
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
            dispatch(getUserRoleListDataAction(appAccessTabelSearch));
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
            dispatch(getUserRoleListDataAction(appAccessTabelSearch));
            props.setAppMaintainRoleMsg(messageToUpdate);
        }
    }, [appMessageEdit]);


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
                        onClick={() => preAddMaintainRole()}
                    >
                        <span className="mdi mdi-plus" /> Tambah
                    </Button>
                </div>

                <TableCustom
                    keyField={"roleId"}
                    columns={appAccessColumn}
                    redukResponse={appUserRoleData}
                    appdata={appUserRoleData?.data != null && appUserRoleData?.data.list ? appUserRoleData?.data.list : []}
                    appdataTotal={appUserRoleData?.data != null ? appUserRoleData?.data.count : 0}
                    searchSet={setAppUserRoleTabelSearch}
                    searchGet={appUserRoleTabelSearch}
                    redukCall={getUserRoleListDataAction}
                />
            </div>
{/* 
            <AddApplicationRoleUser
                appAddAccessRole={props.appAddAccessRole}
                setAppAddAccessRole={props.setAppAddAccessRole}
                setAppMaintainRoleMsg={props.setAppMaintainRoleMsg}
                setTabAppRole={props.setTabAppRole}
                appMaintainRoleData={props.appMaintainRoleData}
            /> */}
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