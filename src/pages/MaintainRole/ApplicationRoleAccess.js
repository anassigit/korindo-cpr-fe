import TableCustom from 'common/TableCustom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, UncontrolledTooltip } from 'reactstrap'
import { deleteApplicationRoleAccess, getAccessListDataAction } from 'store/actions'
import PropTypes from 'prop-types'
import AddApplicationRoleAccess from './AddApplicationRoleAccess'
import EditApplicationRoleAccess from './EditApplicationRoleAccess'
import MsgModal from 'components/Common/MsgModal'
import { deleteAccessRoleBE } from 'helpers/backend_helper'

const ApplicationRoleAccess = (props) => {

    const dispatch = useDispatch()

    const [searchVal, setSearchVal] = useState('')

    const [modal, setModal] = useState(false)

    const [menuId, setMenuId] = useState('')

    const appAccessRoleData = useSelector((state) => {
        return state.maintainRoleReducer.respGetAccessList
    })

    const [appAccessData, setAppAccessData] = useState({})

    const appMessageDelete = useSelector((state) => state.maintainRoleReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.maintainRoleReducer.msgAdd);

    const appMessageEdit = useSelector((state) => {
        return state.maintainRoleReducer.msgEdit
    });

    const [appAccessTabelSearch, setAppAccessTabelSearch] = useState({
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
        setAppAccessTabelSearch((prevState) => ({
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
            dataField: "menu",
            text: "Kode Menu",
            sort: true,
            hidden: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
            formatter: (cellContent, cellData) => cellContent?.menuId
        },
        {
            dataField: "role",
            text: "Kode Role",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
            formatter: (cellContent, cellData) => cellContent?.roleId
        },
        {
            dataField: "menu",
            text: "Nama Menu",
            sort: true,
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, cellData) => cellContent?.menuName
        },
        {
            dataField: "create",
            text: "Create",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "read",
            text: "Read",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "update",
            text: "Update",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "delete",
            text: "Delete",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "print",
            text: "Print",
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
                        <a id={`edit-${cellData.roleId}`} className="mdi mdi-pencil text-primary" onClick={() => appPreEditApplication(cellData)} />
                        <a id={`delete-${cellData.roleId}`} className="mdi mdi-delete text-danger" style={{ marginLeft: '1vw' }} onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${cellData.roleId}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${cellData.roleId}`}>Delete</UncontrolledTooltip>
                    </React.Fragment>
                )
            }
        },
    ]

    const [counter, setCounter] = useState(0)

    useEffect(() => {
        if (appAccessRoleData.status === '1') {
            setCounter(null)
        } else if (appAccessRoleData.status === '0' && counter != null){
            getAccessListDataAction(appAccessTabelSearch)
            setCounter(counter + 1)
        }
    }, [appAccessRoleData, counter])

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
            dispatch(getAccessListDataAction(appAccessTabelSearch));
            props.setAppMaintainRoleMsg(messageToUpdate);
        }
    }, [appMessageDelete]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageAdd.status === '1' || appMessageAdd.status === '0') {
            messageToUpdate = appMessageAdd;
            if (appMessageAdd.status === '1' && props.appAddAccessRole) {
                props.setTabAppRole(true);
                props.setAppAddAccessRole(false);
            }
        }

        if (messageToUpdate) {
            props.setLoadingSpinner(false);
            dispatch(getAccessListDataAction(appAccessTabelSearch));
            props.setAppMaintainRoleMsg(messageToUpdate);
        }
    }, [appMessageAdd]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1' && props.appEditAccessRole) {
                props.setTabAppRole(true);
                props.setAppEditAccessRole(false);
            }
        }

        if (messageToUpdate) {
            props.setLoadingSpinner(false);
            dispatch(getAccessListDataAction(appAccessTabelSearch));
            props.setAppMaintainRoleMsg(messageToUpdate);
        }
    }, [appMessageEdit]);

    useEffect(() => {
        if (props.tabAppRole && props.appMaintainRoleData) {
            setAppAccessTabelSearch((prevState) => ({
                ...prevState,
                search: {
                    ...prevState.search,
                    roleId: props.appMaintainRoleData.roleId,
                },
            }))
        }
    }, [props.tabAppRole, props.appMaintainRoleData])

    const appPreAddApplication = () => {
        props.setTabAppRole(false)
        props.setAppAddAccessRole(true)
    }

    const appPreEditApplication = (data) => {
        props.setTabAppRole(false)
        props.setAppEditAccessRole(true)
        setAppAccessData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data.role.roleId) {
            setMenuId(data.menu.menuId)
        }
    }

    const toggleApply = () => {
        props.setAppMaintainRoleMsg('')
        dispatch(deleteApplicationRoleAccess({
            roleId: props.appMaintainRoleData.roleId,
            menuId: menuId,
        }))
        setModal(!modal)
        props.setLoadingSpinner(true)
    }

    return (
        <>
            <div
                style={{
                    display: props.tabAppRole ? "block" : 'none',
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
                        onClick={() => appPreAddApplication()}
                    >
                        <span className="mdi mdi-plus" /> Tambah
                    </Button>
                </div>

                <TableCustom
                    keyField={"roleId"}
                    columns={appAccessColumn}
                    redukResponse={appAccessRoleData}
                    appdata={appAccessRoleData?.data != null && appAccessRoleData?.data.list ? appAccessRoleData?.data.list : []}
                    appdataTotal={appAccessRoleData?.data != null ? appAccessRoleData?.data.count : 0}
                    searchSet={setAppAccessTabelSearch}
                    searchGet={appAccessTabelSearch}
                    redukCall={getAccessListDataAction}
                />

            </div>
            <AddApplicationRoleAccess
                appAddAccessRole={props.appAddAccessRole}
                setAppAddAccessRole={props.setAppAddAccessRole}
                setAppMaintainRoleMsg={props.setAppMaintainRoleMsg}
                setTabAppRole={props.setTabAppRole}
                appMaintainRoleData={props.appMaintainRoleData}
            />
            <EditApplicationRoleAccess
                appEditAccessRole={props.appEditAccessRole}
                setAppEditAccessRole={props.setAppEditAccessRole}
                setAppMaintainRoleMsg={props.setAppMaintainRoleMsg}
                setTabAppRole={props.setTabAppRole}
                appMaintainRoleData={props.appMaintainRoleData}
                appAccessData={appAccessData}
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

ApplicationRoleAccess.propTypes = {
    tabAppRole: PropTypes.any,
    setTabAppRole: PropTypes.any,
    appAddAccessRole: PropTypes.any,
    setAppAddAccessRole: PropTypes.any,
    appEditAccessRole: PropTypes.any,
    setAppEditAccessRole: PropTypes.any,
    appMaintainRoleData: PropTypes.any,
    setAppMaintainRoleMsg: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

export default ApplicationRoleAccess