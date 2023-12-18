import RootPageCustom from "common/RootPageCustom";
import TableCustom from "common/TableCustom";
import MsgModal from "components/Common/MsgModal";
import React, { useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    Input,
    Spinner,
    UncontrolledAlert,
    UncontrolledTooltip
} from "reactstrap";
import { deleteRole, getRoleListDataAction, resetMessage } from "store/actions";
import '../../assets/scss/custom.scss';
import '../../config';
import AddMaintainRole from "./AddMaintainRole";
import EditMaintainRole from "./EditMaintainRole";
import RoleAccess from "./RoleAccess";

const MaintainRole = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [modal, setModal] = useState(false)

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appMaintainRoleMsg, setAppMaintainRoleMsg] = useState("")

    const [searchVal, setSearchVal] = useState("")

    const [appMaintainRole, setAppMaintainRole] = useState(true)
    const [appAddMaintainRole, setAppAddMaintainRole] = useState(false)
    const [appEditMaintainRole, setAppEditMaintainRole] = useState(false)

    const [appAccessRole, setAppAccessRole] = useState(false)

    const [appMaintainRoleData, setAppMaintainRoleData] = useState({})

    const [roleId, setRoleId] = useState('')

    const appRoleListData = useSelector((state) => {
        return state.maintainRoleReducer.respGetRoleList
    });

    const appMessageDelete = useSelector((state) => state.maintainRoleReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.maintainRoleReducer.msgAdd);

    const appMessageEdit = useSelector((state) => {
        return state.maintainRoleReducer.msgEdit
    });

    const [appRoleTabelSearch, setAppRoleTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search:
        {
            search: searchVal,
        }
    });

    const appRoleColumn = [
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
            text: "Detail",
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center', fontSize: '16px' },
            formatter: (cellContent, cellData, index) => {
                return (
                    <React.Fragment>
                        <a id={`detail-${index + 1}`} className="mdi mdi-text-box-outline text-primary" onClick={() => preDetailMaintainRole(cellData)} />
                        <UncontrolledTooltip target={`detail-${index + 1}`}>Detail</UncontrolledTooltip>
                    </React.Fragment>
                )
            }
        },
        {
            text: "Actions",
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center', fontSize: '16px' },
            formatter: (cellContent, cellData, index) => {
                return (
                    <React.Fragment>
                        <a id={`edit-${index + 1}`} className="mdi mdi-pencil text-primary" onClick={() => preEditMaintainRole(cellData)} />
                        <a id={`delete-${index + 1}`} className="mdi mdi-delete text-danger" style={{ marginLeft: '1vw' }} onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${index + 1}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${index + 1}`}>Delete</UncontrolledTooltip>
                    </React.Fragment>
                )
            }
        },
    ]

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClick();
        }
    };

    const handleClick = () => {
        setAppRoleTabelSearch((prevState) => ({
            ...prevState,
            page: 1,
            offset: 0,
            search: {
                ...prevState.search,
                search: searchVal,
            },
        }));
    };

    const preAddMaintainRole = () => {
        setAppAddMaintainRole(true)
        setAppMaintainRole(false)
    }

    const preEditMaintainRole = (data) => {
        setAppEditMaintainRole(true)
        setAppMaintainRole(false)
        setAppMaintainRoleData(data)
    }

    const preDetailMaintainRole = (data) => {
        setAppAccessRole(true)
        setAppMaintainRole(false)
        setAppMaintainRoleData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data.roleId) {
            setRoleId(data.roleId)
        }
    }

    const toggleApply = () => {
        setAppMaintainRoleMsg('')
        dispatch(deleteRole({ roleId: roleId }))
        setModal(!modal)
        setLoadingSpinner(true)
    }

    useEffect(() => {
        let messageToUpdate;

        if (appMessageDelete.status === '1' || appMessageDelete.status === '0') {
            messageToUpdate = appMessageDelete;
            if (appMessageDelete.status === '1') {
                // Additional logic for appMessageDelete with status '1'
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getRoleListDataAction(appRoleTabelSearch));
            setAppMaintainRoleMsg(messageToUpdate);
        }
    }, [appMessageDelete]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageAdd.status === '1' || appMessageAdd.status === '0') {
            messageToUpdate = appMessageAdd;
            if (appMessageAdd.status === '1') {
                setAppMaintainRole(true);
                setAppAddMaintainRole(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getRoleListDataAction(appRoleTabelSearch));
            setAppMaintainRoleMsg(messageToUpdate);
        }
    }, [appMessageAdd]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1') {
                setAppMaintainRole(true);
                setAppEditMaintainRole(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getRoleListDataAction(appRoleTabelSearch));
            setAppMaintainRoleMsg(messageToUpdate);
        }
    }, [appMessageEdit]);


    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appMaintainRoleMsg !== "" ? <UncontrolledAlert toggle={() => { setAppMaintainRoleMsg("") }} color={appMaintainRoleMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appMaintainRoleMsg == 'string' ? null : appMaintainRoleMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appMaintainRole ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-account-tie"></span> Maintain Role
                            </CardHeader>
                            <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
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
                                    columns={appRoleColumn}
                                    redukResponse={appRoleListData}
                                    appdata={appRoleListData?.data != null && appRoleListData?.data.list ? appRoleListData?.data.list : []}
                                    appdataTotal={appRoleListData?.data != null ? appRoleListData?.data.count : 0}
                                    searchSet={setAppRoleTabelSearch}
                                    searchGet={appRoleTabelSearch}
                                    redukCall={getRoleListDataAction}
                                />
                            </CardBody>
                        </Card>
                        <Button
                            className="btn btn-danger my-3"
                            onClick={() => {
                                ReactSession.set('appDetailRecommendationData', "");
                                history.go(-1)
                            }}
                        >
                            <span className="mdi mdi-arrow-left" />
                            &nbsp;Kembali
                        </Button>
                        <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                            <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
                        </div>
                    </Container>

                    <AddMaintainRole
                        appAddMaintainRole={appAddMaintainRole}
                        setAppMaintainRole={setAppMaintainRole}
                        setAppAddMaintainRole={setAppAddMaintainRole}
                        setAppMaintainRoleMsg={setAppMaintainRoleMsg}
                    />

                    <EditMaintainRole
                        appMaintainRoleData={appMaintainRoleData}
                        appEditMaintainRole={appEditMaintainRole}
                        setAppMaintainRole={setAppMaintainRole}
                        setAppEditMaintainRole={setAppEditMaintainRole}
                        setAppMaintainRoleMsg={setAppMaintainRoleMsg}
                    />

                    {
                        appAccessRole &&
                        <RoleAccess
                            appMaintainRoleData={appMaintainRoleData}
                            appAccessRole={appAccessRole}
                            setAppMaintainRole={setAppMaintainRole}
                            setAppAccessRole={setAppAccessRole}
                            setAppMaintainRoleMsg={setAppMaintainRoleMsg}
                        />
                    }

                    <MsgModal
                        toggle={toggleDeleteModal}
                        toggleApply={toggleApply}
                        modal={modal}
                        message={'Apakah anda yakin untuk menghapus ini?'}
                    />
                </React.Fragment>
            }
        />
    );
};

export default MaintainRole;
