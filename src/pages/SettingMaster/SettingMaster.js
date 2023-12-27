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
import { resetMessage, getSettingListDataAction } from "store/actions";
import { deleteSettingMaster } from "store/settingmaster/actions";
import '../../assets/scss/custom.scss';
import '../../config';
import AddSettingMaster from "./AddSettingMaster";
import EditSettingMaster from "./EditSettingMaster";

const SettingMaster = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [modal, setModal] = useState(false)

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appSettingMasterMsg, setAppSettingMasterMsg] = useState("")

    const [searchVal, setSearchVal] = useState("")

    const [appSettingMaster, setAppSettingMaster] = useState(true)
    const [appAddSettingMaster, setAppAddSettingMaster] = useState(false)
    const [appEditSettingMaster, setAppEditSettingMaster] = useState(false)

    const [appSettingMasterData, setAppSettingMasterData] = useState({})

    const [itemCd, setItemCd] = useState('')

    const appSettingListData = useSelector((state) => {
        return state.settingMasterReducer.respGetSettingList
    });
    
    const appLocationListData = useSelector((state) => {
        return state.settingMasterReducer.respGetLocationList3
    });

    const appMessageDelete = useSelector((state) => state.settingMasterReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.settingMasterReducer.msgAdd);

    const appMessageEdit = useSelector((state) => {
        return state.settingMasterReducer.msgEdit
    });

    const [appSettingTabelSearch, setAppSettingTabelSearch] = useState({
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

    const appSettingColumn = [
        {
            dataField: "id",
            text: "ID",
            sort: true,
            hidden: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "itemCd",
            text: "Kode Setting",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "itemName",
            text: "Nama Setting",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "itemDesc",
            text: "Kode Level",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "active",
            text: "Active",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
        },
        {
            dataField: "level",
            text: "Level",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            text: "Actions",
            headerStyle: { textAlign: 'center' },
            style: { justifyContent: 'center', display: 'flex', gap: '1vw', fontSize: '16px' },
            formatter: (cellContent, cellData) => {
                return (
                    <React.Fragment>
                        <a id={`edit-${cellData.itemCd}`} className="mdi mdi-pencil text-primary" onClick={() => preEditApp(cellData)} />
                        <UncontrolledTooltip target={`edit-${cellData.itemCd}`}>Edit</UncontrolledTooltip>
                    </React.Fragment>
                )
            }
        },
    ]

    useEffect(() => {
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
        setAppSettingTabelSearch((prevState) => ({
            ...prevState,
            page: 1,
            offset: 0,
            search: {
                ...prevState.search,
                search: searchVal,
            },
        }));
    };

    const preAddApp = () => {
        setAppAddSettingMaster(true)
        setAppSettingMaster(false)
    }

    const preEditApp = (data) => {
        setAppEditSettingMaster(true)
        setAppSettingMaster(false)
        setAppSettingMasterData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data.itemCd) {
            setItemCd(data.itemCd)
        }
    }

    const toggleApply = () => {
        setAppSettingMasterMsg('')
        dispatch(deleteSettingMaster({ itemCd: itemCd }))
        setModal(!modal)
        setLoadingSpinner(true)
    }

    useEffect(() => {
        let messageToUpdate;

        if (appMessageDelete.status === '1' || appMessageDelete.status === '0') {
            messageToUpdate = appMessageDelete;
            if (appMessageDelete.status === '1') {

            }
        }
        if (appMessageAdd.status === '1' || appMessageAdd.status === '0') {
            messageToUpdate = appMessageAdd;
            if (appMessageAdd.status === '1') {
                setAppSettingMaster(true)
                setAppAddSettingMaster(false)
            }
        }
        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1') {
                setAppSettingMaster(true)
                setAppEditSettingMaster(false)
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getSettingListDataAction(appSettingTabelSearch));
            setAppSettingMasterMsg(messageToUpdate);
        }
    }, [appMessageDelete, appMessageAdd, appMessageEdit]);

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appSettingMasterMsg !== "" ? <UncontrolledAlert toggle={() => { setAppSettingMasterMsg("") }} color={appSettingMasterMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appSettingMasterMsg == 'string' ? null : appSettingMasterMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appSettingMaster ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-cog"></span> Master Setting
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
                                        onClick={() => preAddApp()}
                                    >
                                        <span className="mdi mdi-plus" /> Tambah
                                    </Button>
                                </div>

                                <TableCustom
                                    keyField={"id"}
                                    columns={appSettingColumn}
                                    redukResponse={appSettingListData}
                                    appdata={appSettingListData?.data != null && appSettingListData?.data.list ? appSettingListData?.data.list : []}
                                    appdataTotal={appSettingListData?.data != null ? appSettingListData?.data.count : 0}
                                    searchSet={setAppSettingTabelSearch}
                                    searchGet={appSettingTabelSearch}
                                    redukCall={getSettingListDataAction}
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
                        <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", setting: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                            <Spinner style={{ padding: "24px", display: "block", setting: "fixed", top: "42.5%", right: "50%" }} color="primary" />
                        </div>
                    </Container>

                    <AddSettingMaster
                        appLocationListData={appLocationListData}
                        appAddSettingMaster={appAddSettingMaster}
                        setAppSettingMaster={setAppSettingMaster}
                        setAppAddSettingMaster={setAppAddSettingMaster}
                        setAppSettingMasterMsg={setAppSettingMasterMsg}
                    />

                    <EditSettingMaster
                        appLocationListData={appLocationListData}
                        appSettingMasterData={appSettingMasterData}
                        appEditSettingMaster={appEditSettingMaster}
                        setAppSettingMaster={setAppSettingMaster}
                        setAppEditSettingMaster={setAppEditSettingMaster}
                        setAppSettingMasterMsg={setAppSettingMasterMsg}
                    />

                </React.Fragment>
            }
        />
    );
};

export default SettingMaster;
