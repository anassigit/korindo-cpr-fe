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
    Label,
    Spinner,
    UncontrolledAlert,
    UncontrolledTooltip
} from "reactstrap";
import '../../assets/scss/custom.scss';
import '../../config';
import AddStickerMaster from "./AddStickerMaster";
import EditStickerMaster from "./EditStickerMaster";
import { resetMessage, deleteStickerMaster, getStickerListDataAction2 } from "store/actions";

const StickerMaster = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [modal, setModal] = useState(false)

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appStickerMasterMsg, setAppStickerMasterMsg] = useState("")

    const [searchVal, setSearchVal] = useState("")

    const [appStickerMaster, setAppStickerMaster] = useState(true)
    const [appAddStickerMaster, setAppAddStickerMaster] = useState(false)
    const [appEditStickerMaster, setAppEditStickerMaster] = useState(false)

    const [appStickerMasterData, setAppStickerMasterData] = useState({})

    const [stickerId, setStickerId] = useState('')

    const appStickerListData = useSelector((state) => {
        return state.stickerMasterReducer.respGetStickerList2
    });

    const appMessageDelete = useSelector((state) => state.stickerMasterReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.stickerMasterReducer.msgAdd);

    const appMessageEdit = useSelector((state) => {
        return state.stickerMasterReducer.msgEdit
    });

    const [appStickerTabelSearch, setAppStickerTabelSearch] = useState({
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

    const appStickerColumn = [
        {
            dataField: "stickerId",
            text: "Sticker Code",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
        },
        {
            dataField: "stickerName",
            text: "Nama Sticker",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "stickerUrl",
            text: "URL Sticker",
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
            formatter: (cellContent, cellData) => {
                return <img
                    src={cellContent}
                    width={'16px'}
                />
            }
        },
        {
            text: "Actions",
            headerStyle: { textAlign: 'center' },
            style: { justifyContent: 'center', display: 'flex', gap: '1vw', fontSize: '16px' },
            formatter: (cellContent, cellData) => {
                return (
                    <React.Fragment>
                        <a id={`edit-${cellData.stickerId}`} className="mdi mdi-pencil text-primary" onClick={() => preEditStickerMaster(cellData)} />
                        <a id={`delete-${cellData.stickerId}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${cellData.stickerId}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${cellData.stickerId}`}>Delete</UncontrolledTooltip>
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
        setAppStickerTabelSearch((prevState) => ({
            ...prevState,
            page: 1,
            offset: 0,
            search: {
                ...prevState.search,
                search: searchVal,
            },
        }));
    };

    const preAddStickerMaster = () => {
        setAppAddStickerMaster(true)
        setAppStickerMaster(false)
    }

    const preEditStickerMaster = (data) => {
        setAppEditStickerMaster(true)
        setAppStickerMaster(false)
        setAppStickerMasterData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data.stickerId) {
            setStickerId(data.stickerId)
        }
    }

    const toggleApply = () => {
        setAppStickerMasterMsg('')
        dispatch(deleteStickerMaster({ stickerId: stickerId }))
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
            dispatch(getStickerListDataAction2(appStickerTabelSearch));
            setAppStickerMasterMsg(messageToUpdate);
        }
    }, [appMessageDelete]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageAdd.status === '1' || appMessageAdd.status === '0') {
            messageToUpdate = appMessageAdd;
            if (appMessageAdd.status === '1') {
                setAppStickerMaster(true);
                setAppAddStickerMaster(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getStickerListDataAction2(appStickerTabelSearch));
            setAppStickerMasterMsg(messageToUpdate);
        }
    }, [appMessageAdd]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1') {
                setAppStickerMaster(true);
                setAppEditStickerMaster(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getStickerListDataAction2(appStickerTabelSearch));
            setAppStickerMasterMsg(messageToUpdate);
        }
    }, [appMessageEdit]);


    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appStickerMasterMsg !== "" ? <UncontrolledAlert toggle={() => { setAppStickerMasterMsg("") }} color={appStickerMasterMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appStickerMasterMsg == 'string' ? null : appStickerMasterMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appStickerMaster ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-map"></span> Master Sticker
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
                                        onClick={() => preAddStickerMaster()}
                                    >
                                        <span className="mdi mdi-plus" /> Tambah
                                    </Button>
                                </div>

                                <TableCustom
                                    keyField={"stickerId"}
                                    columns={appStickerColumn}
                                    redukResponse={appStickerListData}
                                    appdata={appStickerListData?.data != null && appStickerListData?.data.list ? appStickerListData?.data.list : []}
                                    appdataTotal={appStickerListData?.data != null ? appStickerListData?.data.count : 0}
                                    searchSet={setAppStickerTabelSearch}
                                    searchGet={appStickerTabelSearch}
                                    redukCall={getStickerListDataAction2}
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

                    <AddStickerMaster
                        appAddStickerMaster={appAddStickerMaster}
                        setAppStickerMaster={setAppStickerMaster}
                        setAppAddStickerMaster={setAppAddStickerMaster}
                        setAppStickerMasterMsg={setAppStickerMasterMsg}
                    />

                    <EditStickerMaster
                        appStickerMasterData={appStickerMasterData}
                        appEditStickerMaster={appEditStickerMaster}
                        setAppStickerMaster={setAppStickerMaster}
                        setAppEditStickerMaster={setAppEditStickerMaster}
                        setAppStickerMasterMsg={setAppStickerMasterMsg}
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

export default StickerMaster;
