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
import AddLocationMaster from "./AddLocationMaster";
import EditLocationMaster from "./EditLocationMaster";
import { resetMessage, deleteLocationMaster, getLocationListDataAction } from "store/actions";

const LocationMaster = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [modal, setModal] = useState(false)

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appLocationMasterMsg, setAppLocationMasterMsg] = useState("")

    const [searchVal, setSearchVal] = useState("")

    const [appLocationMaster, setAppLocationMaster] = useState(true)
    const [appAddLocationMaster, setAppAddLocationMaster] = useState(false)
    const [appEditLocationMaster, setAppEditLocationMaster] = useState(false)

    const [appLocationMasterData, setAppLocationMasterData] = useState({})

    const [locationId, setLocationId] = useState('')

    const appLocationListData = useSelector((state) => {
        return state.locationMasterReducer.respGetLocationList
    });

    const appMessageDelete = useSelector((state) => state.locationMasterReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.locationMasterReducer.msgAdd);

    const appMessageEdit = useSelector((state) => {
        return state.locationMasterReducer.msgEdit
    });

    const [appLocationTabelSearch, setAppLocationTabelSearch] = useState({
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

    const appLocationColumn = [
        {
            dataField: "locationId",
            text: "Kode Lokasi",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
        },
        {
            dataField: "locationName",
            text: "Nama Lokasi",
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
                        <a id={`edit-${cellData.locationId}`} className="mdi mdi-pencil text-primary" onClick={() => preEditLocationMaster(cellData)} />
                        <a id={`delete-${cellData.locationId}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${cellData.locationId}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${cellData.locationId}`}>Delete</UncontrolledTooltip>
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
        setAppLocationTabelSearch((prevState) => ({
            ...prevState,
            page: 1,
            offset: 0,
            search: {
                ...prevState.search,
                search: searchVal,
            },
        }));
    };

    const preAddLocationMaster = () => {
        setAppAddLocationMaster(true)
        setAppLocationMaster(false)
    }

    const preEditLocationMaster = (data) => {
        setAppEditLocationMaster(true)
        setAppLocationMaster(false)
        setAppLocationMasterData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data.locationId) {
            setLocationId(data.locationId)
        }
    }

    const toggleApply = () => {
        setAppLocationMasterMsg('')
        dispatch(deleteLocationMaster({ locationId: locationId }))
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
            dispatch(getLocationListDataAction(appLocationTabelSearch));
            setAppLocationMasterMsg(messageToUpdate);
        }
    }, [appMessageDelete]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageAdd.status === '1' || appMessageAdd.status === '0') {
            messageToUpdate = appMessageAdd;
            if (appMessageAdd.status === '1') {
                setAppLocationMaster(true);
                setAppAddLocationMaster(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getLocationListDataAction(appLocationTabelSearch));
            setAppLocationMasterMsg(messageToUpdate);
        }
    }, [appMessageAdd]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1') {
                setAppLocationMaster(true);
                setAppEditLocationMaster(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getLocationListDataAction(appLocationTabelSearch));
            setAppLocationMasterMsg(messageToUpdate);
        }
    }, [appMessageEdit]);


    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appLocationMasterMsg !== "" ? <UncontrolledAlert toggle={() => { setAppLocationMasterMsg("") }} color={appLocationMasterMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appLocationMasterMsg == 'string' ? null : appLocationMasterMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appLocationMaster ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-map"></span> Master Lokasi
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
                                        onClick={() => preAddLocationMaster()}
                                    >
                                        <span className="mdi mdi-plus" /> Tambah
                                    </Button>
                                </div>

                                <TableCustom
                                    keyField={"locationId"}
                                    columns={appLocationColumn}
                                    redukResponse={appLocationListData}
                                    appdata={appLocationListData?.data != null && appLocationListData?.data.list ? appLocationListData?.data.list : []}
                                    appdataTotal={appLocationListData?.data != null ? appLocationListData?.data.count : 0}
                                    searchSet={setAppLocationTabelSearch}
                                    searchGet={appLocationTabelSearch}
                                    redukCall={getLocationListDataAction}
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

                    <AddLocationMaster
                        appAddLocationMaster={appAddLocationMaster}
                        setAppLocationMaster={setAppLocationMaster}
                        setAppAddLocationMaster={setAppAddLocationMaster}
                        setAppLocationMasterMsg={setAppLocationMasterMsg}
                    />

                    <EditLocationMaster
                        appLocationMasterData={appLocationMasterData}
                        appEditLocationMaster={appEditLocationMaster}
                        setAppLocationMaster={setAppLocationMaster}
                        setAppEditLocationMaster={setAppEditLocationMaster}
                        setAppLocationMasterMsg={setAppLocationMasterMsg}
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

export default LocationMaster;
