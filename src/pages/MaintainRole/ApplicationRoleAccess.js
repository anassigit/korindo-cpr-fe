import TableCustom from 'common/TableCustom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, UncontrolledTooltip } from 'reactstrap'
import { getAccessListDataAction } from 'store/actions'
import PropTypes from 'prop-types'

const ApplicationRoleAccess = (props) => {

    const [searchVal, setSearchVal] = useState('')
    const [roleId, setRoleId] = useState('')

    const appAccessRoleData = useSelector((state) => {
        return state.maintainRoleReducer.respGetAccessList
    })

    const [appAccessTabelSearch, setAppAccessTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search:
        {
            search: searchVal,
            roleId: props.appMaintainRoleData,
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
            dataField: "menuId",
            text: "Kode Role",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
        },
        {
            dataField: "roleId",
            text: "Kode Role",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
        },
        {
            dataField: "menuName",
            text: "Nama Menu",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "create",
            text: "Create",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "read",
            text: "Read",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "update",
            text: "Update",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "delete",
            text: "Delete",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "print",
            text: "Print",
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
            text: "Detail",
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center', fontSize: '16px' },
            formatter: (cellContent, cellData) => {
                return (
                    <React.Fragment>
                        <a id={`detail-${cellData.roleId}`} className="mdi mdi-text-box-outline text-primary" onClick={() => preDetailMaintainRole()} />
                        <UncontrolledTooltip target={`detail-${cellData.roleId}`}>Detail</UncontrolledTooltip>
                    </React.Fragment>
                )
            }
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
        if (props.tabAppRole) {
            setAppAccessTabelSearch((prevState) => ({
                ...prevState,
                page: 1,
                offset: 0,
                search: {
                    ...prevState.search,
                    roleId: props.appMaintainRoleData.roleId,
                },
            }))
        }
    }, [props.tabAppRole])

    return (
        <React.Fragment>
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
                redukResponse={appAccessRoleData}
                appdata={appAccessRoleData?.data != null && appAccessRoleData?.data.list ? appAccessRoleData?.data.list : []}
                appdataTotal={appAccessRoleData?.data != null ? appAccessRoleData?.data.count : 0}
                searchSet={setAppAccessTabelSearch}
                searchGet={appAccessTabelSearch}
                redukCall={getAccessListDataAction}
            />
        </React.Fragment>
    )
}

ApplicationRoleAccess.propTypes = {
    tabAppRole: PropTypes.any,
    appMaintainRoleData: PropTypes.any,
}

export default ApplicationRoleAccess