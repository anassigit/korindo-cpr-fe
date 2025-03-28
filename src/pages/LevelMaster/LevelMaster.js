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
import { getLocationListDataAction3, resetMessage } from "store/actions";
import { deleteLevelMaster, getLevelListDataAction } from "store/levelmaster/actions";
import '../../assets/scss/custom.scss';
import '../../config';
import AddLevelMaster from "./AddLevelMaster";
import EditLevelMaster from "./EditLevelMaster";

const LevelMaster = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [modal, setModal] = useState(false)

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appLevelMasterMsg, setAppLevelMasterMsg] = useState("")

    const [searchVal, setSearchVal] = useState("")

    const [appLevelMaster, setAppLevelMaster] = useState(true)
    const [appAddLevelMaster, setAppAddLevelMaster] = useState(false)
    const [appEditLevelMaster, setAppEditLevelMaster] = useState(false)

    const [appLevelMasterData, setAppLevelMasterData] = useState({})

    const [levelCd, setLevelCd] = useState('')

    const appLevelListData = useSelector((state) => {
        return state.levelMasterReducer.respGetLevelList
    });

    const appLevelLocationListData = useSelector((state) => {
        return state.levelMasterReducer.respGetLocationList3
    });

    const appMessageDelete = useSelector((state) => state.levelMasterReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.levelMasterReducer.msgAdd);

    const appMessageEdit = useSelector((state) => {
        return state.levelMasterReducer.msgEdit
    });

    const [appLevelTabelSearch, setAppLevelTabelSearch] = useState({
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

    const appLevelColumn = [
        {
            dataField: "levelCd",
            text: "Level Kode",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "levelName",
            text: "Nama Level",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "locationName",
            text: "Lokasi",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            text: "Actions",
            headerStyle: { textAlign: 'center' },
            style: { justifyContent: 'center', display: 'flex', gap: '1vw', fontSize: '16px' },
            formatter: (cellContent, cellData) => {
                return (
                    <React.Fragment>
                        <a id={`edit-${cellData.levelCd}`} className="mdi mdi-pencil text-primary" onClick={() => preEditApp(cellData)} />
                        <a id={`delete-${cellData.levelCd}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${cellData.levelCd}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${cellData.levelCd}`}>Delete</UncontrolledTooltip>
                    </React.Fragment>
                )
            }
        },
    ]

    useEffect(() => {
        dispatch(getLocationListDataAction3())
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
        setAppLevelTabelSearch((prevState) => ({
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
        setAppAddLevelMaster(true)
        setAppLevelMaster(false)
    }

    const preEditApp = (data) => {
        setAppEditLevelMaster(true)
        setAppLevelMaster(false)
        setAppLevelMasterData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data.levelCd) {
            setLevelCd(data.levelCd)
        }
    }

    const toggleApply = () => {
        setAppLevelMasterMsg('')
        dispatch(deleteLevelMaster({ levelCd: levelCd }))
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
            dispatch(getLevelListDataAction(appLevelTabelSearch));
            setAppLevelMasterMsg(messageToUpdate);
        }
    }, [appMessageDelete]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageAdd.status === '1' || appMessageAdd.status === '0') {
            messageToUpdate = appMessageAdd;
            if (appMessageAdd.status === '1') {
                setAppLevelMaster(true);
                setAppAddLevelMaster(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getLevelListDataAction(appLevelTabelSearch));
            setAppLevelMasterMsg(messageToUpdate);
        }
    }, [appMessageAdd]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1') {
                setAppLevelMaster(true);
                setAppEditLevelMaster(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getLevelListDataAction(appLevelTabelSearch));
            setAppLevelMasterMsg(messageToUpdate);
        }
    }, [appMessageEdit]);

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appLevelMasterMsg !== "" ? <UncontrolledAlert toggle={() => { setAppLevelMasterMsg("") }} color={appLevelMasterMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appLevelMasterMsg == 'string' ? null : appLevelMasterMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appLevelMaster ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-source-branch"></span> Master Level
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
                                    keyField={"levelCd"}
                                    columns={appLevelColumn}
                                    redukResponse={appLevelListData}
                                    appdata={appLevelListData?.data != null && appLevelListData?.data.list ? appLevelListData?.data.list : []}
                                    appdataTotal={appLevelListData?.data != null ? appLevelListData?.data.count : 0}
                                    searchSet={setAppLevelTabelSearch}
                                    searchGet={appLevelTabelSearch}
                                    redukCall={getLevelListDataAction}
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

                    <AddLevelMaster
                        appLevelLocationListData={appLevelLocationListData}
                        appAddLevelMaster={appAddLevelMaster}
                        setAppLevelMaster={setAppLevelMaster}
                        setAppAddLevelMaster={setAppAddLevelMaster}
                        setAppLevelMasterMsg={setAppLevelMasterMsg}
                    />

                    <EditLevelMaster
                        appLevelLocationListData={appLevelLocationListData}
                        appLevelMasterData={appLevelMasterData}
                        appEditLevelMaster={appEditLevelMaster}
                        setAppLevelMaster={setAppLevelMaster}
                        setAppEditLevelMaster={setAppEditLevelMaster}
                        setAppLevelMasterMsg={setAppLevelMasterMsg}
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

export default LevelMaster;
