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
import { getLocationListDataAction5, resetMessage } from "store/actions";
import { deleteMaintainMenu, getMenuListDataAction } from "store/actions";
import '../../assets/scss/custom.scss';
import '../../config';
import AddMaintainMenu from "./AddMaintainMenu";
import EditMaintainMenu from "./EditMaintainMenu";

const MaintainMenu = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [modal, setModal] = useState(false)

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appMaintainMenuMsg, setAppMaintainMenuMsg] = useState("")

    const [searchVal, setSearchVal] = useState("")

    const [appMaintainMenu, setAppMaintainMenu] = useState(true)
    const [appAddMaintainMenu, setAppAddMaintainMenu] = useState(false)
    const [appEditMaintainMenu, setAppEditMaintainMenu] = useState(false)

    const [appMaintainMenuData, setAppMaintainMenuData] = useState({})

    const [menuId, setmenuId] = useState('')

    const appMenuListData = useSelector((state) => {
        return state.maintainMenuReducer.respGetMenuList
    });

    const appMessageDelete = useSelector((state) => state.maintainMenuReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.maintainMenuReducer.msgAdd);

    const appMessageEdit = useSelector((state) => {
        return state.maintainMenuReducer.msgEdit
    });

    const [appMenuTabelSearch, setAppMenuTabelSearch] = useState({
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

    const appMenuColumn = [
        {
            dataField: "menuId",
            text: "Kode Menu",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "orderNo",
            text: "Nomor Order",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "menuName",
            text: "Nama Menu",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "menuModuleId",
            text: "ID Modul",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "parentMenuId",
            text: "ID Parent Menu",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "menuPath",
            text: "Menu Path",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "icon",
            text: "Icon",
            sort: true,
            style: { textAlign: 'center', fontSize: '18px' },
            headerStyle: { textAlign: 'center' },
            formatter: (cellContent, cellData) => {
                return <span className={`mdi ${cellContent}`} />
            },
        },
        {
            dataField: "menuFrom",
            text: "Begin Effective",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "menuTo",
            text: "End Effective",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            text: "Actions",
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center', fontSize: '16px' },
            formatter: (cellContent, cellData, index) => {
                return (
                    <div style={{ display: 'flex', gap: '1vw', justifyContent: 'center' }}>
                        <a id={`edit-${index}`} className="mdi mdi-pencil text-primary" onClick={() => preEditEmployeeOf(cellData)} />
                        <a id={`delete-${index}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${index}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${index}`}>Delete</UncontrolledTooltip>
                    </div>
                )
            }
        },
    ]

    useEffect(() => {
        dispatch(getLocationListDataAction5())
    }, [])

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
        setAppMenuTabelSearch((prevState) => ({
            ...prevState,
            page: 1,
            offset: 0,
            search: {
                ...prevState.search,
                search: searchVal,
            },
        }));
    };

    const preAddEmployeeOf = () => {
        setAppAddMaintainMenu(true)
        setAppMaintainMenu(false)
    }

    const preEditEmployeeOf = (data) => {
        setAppEditMaintainMenu(true)
        setAppMaintainMenu(false)
        setAppMaintainMenuData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data.menuId) {
            setmenuId(data.menuId)
        }
    }

    const toggleApply = () => {
        setAppMaintainMenuMsg('')
        dispatch(deleteMaintainMenu({ menuId: menuId }))
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
            dispatch(getMenuListDataAction(appMenuTabelSearch));
            setAppMaintainMenuMsg(messageToUpdate);
        }
    }, [appMessageDelete]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageAdd.status === '1' || appMessageAdd.status === '0') {
            messageToUpdate = appMessageAdd;
            if (appMessageAdd.status === '1') {
                setAppMaintainMenu(true);
                setAppAddMaintainMenu(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getMenuListDataAction(appMenuTabelSearch));
            setAppMaintainMenuMsg(messageToUpdate);
        }
    }, [appMessageAdd]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1') {
                setAppMaintainMenu(true);
                setAppEditMaintainMenu(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getMenuListDataAction(appMenuTabelSearch));
            setAppMaintainMenuMsg(messageToUpdate);
        }
    }, [appMessageEdit]);

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appMaintainMenuMsg !== "" ? <UncontrolledAlert toggle={() => { setAppMaintainMenuMsg("") }} color={appMaintainMenuMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appMaintainMenuMsg == 'string' ? null : appMaintainMenuMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appMaintainMenu ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-menu"></span> Maintain Menu
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
                                    className="col-12 pb-2"
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "12px",
                                        justifyContent: "right",
                                        alignItems: "center",
                                    }}
                                >
                                    <Button
                                        onClick={() => preAddEmployeeOf()}
                                    >
                                        <span className="mdi mdi-plus" /> Tambah
                                    </Button>
                                </div>

                                <TableCustom
                                    keyField={"menuId"}
                                    columns={appMenuColumn}
                                    redukResponse={appMenuListData}
                                    appdata={appMenuListData?.data != null && appMenuListData?.data.list ? appMenuListData?.data.list : []}
                                    appdataTotal={appMenuListData?.data != null ? appMenuListData?.data.count : 0}
                                    searchSet={setAppMenuTabelSearch}
                                    searchGet={appMenuTabelSearch}
                                    redukCall={getMenuListDataAction}
                                />
                            </CardBody>
                        </Card>
                        <Button
                            className="btn btn-danger my-2"
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

                    <AddMaintainMenu
                        appAddMaintainMenu={appAddMaintainMenu}
                        setAppMaintainMenu={setAppMaintainMenu}
                        setAppAddMaintainMenu={setAppAddMaintainMenu}
                        setAppMaintainMenuMsg={setAppMaintainMenuMsg}
                        setLoadingSpinner={setLoadingSpinner}
                    />

                    <EditMaintainMenu
                        appMaintainMenuData={appMaintainMenuData}
                        appEditMaintainMenu={appEditMaintainMenu}
                        setAppMaintainMenu={setAppMaintainMenu}
                        setAppEditMaintainMenu={setAppEditMaintainMenu}
                        setAppMaintainMenuMsg={setAppMaintainMenuMsg}
                        setLoadingSpinner={setLoadingSpinner}
                    />

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

export default MaintainMenu;
