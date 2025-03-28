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
import { deletePositionMaster, getPositionListDataAction } from "store/positionmaster/actions";
import '../../assets/scss/custom.scss';
import '../../config';
import AddPositionMaster from "./AddPositionMaster";
import EditPositionMaster from "./EditPositionMaster";

const PositionMaster = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [modal, setModal] = useState(false)

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appPositionMasterMsg, setAppPositionMasterMsg] = useState("")

    const [searchVal, setSearchVal] = useState("")

    const [appPositionMaster, setAppPositionMaster] = useState(true)
    const [appAddPositionMaster, setAppAddPositionMaster] = useState(false)
    const [appEditPositionMaster, setAppEditPositionMaster] = useState(false)

    const [appPositionMasterData, setAppPositionMasterData] = useState({})

    const [positionCd, setPositionCd] = useState('')

    const appPositionListData = useSelector((state) => {
        return state.positionMasterReducer.respGetPositionList
    });
    
    const appLocationListData = useSelector((state) => {
        return state.positionMasterReducer.respGetLocationList3
    });

    const appMessageDelete = useSelector((state) => state.positionMasterReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.positionMasterReducer.msgAdd);

    const appMessageEdit = useSelector((state) => {
        return state.positionMasterReducer.msgEdit
    });

    const [appPositionTabelSearch, setAppPositionTabelSearch] = useState({
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

    const appPositionColumn = [
        {
            dataField: "positionCd",
            text: "Kode Posisi",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "positionName",
            text: "Nama Position",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "levelCd",
            text: "Kode Level",
            sort: true,
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
                        <a id={`edit-${cellData.positionCd}`} className="mdi mdi-pencil text-primary" onClick={() => preEditApp(cellData)} />
                        <a id={`delete-${cellData.positionCd}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${cellData.positionCd}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${cellData.positionCd}`}>Delete</UncontrolledTooltip>
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
        setAppPositionTabelSearch((prevState) => ({
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
        setAppAddPositionMaster(true)
        setAppPositionMaster(false)
    }

    const preEditApp = (data) => {
        setAppEditPositionMaster(true)
        setAppPositionMaster(false)
        setAppPositionMasterData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data.positionCd) {
            setPositionCd(data.positionCd)
        }
    }

    const toggleApply = () => {
        setAppPositionMasterMsg('')
        dispatch(deletePositionMaster({ positionCd: positionCd }))
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
                setAppPositionMaster(true)
                setAppAddPositionMaster(false)
            }
        }
        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1') {
                setAppPositionMaster(true)
                setAppEditPositionMaster(false)
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getPositionListDataAction(appPositionTabelSearch));
            setAppPositionMasterMsg(messageToUpdate);
        }
    }, [appMessageDelete, appMessageAdd, appMessageEdit]);

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appPositionMasterMsg !== "" ? <UncontrolledAlert toggle={() => { setAppPositionMasterMsg("") }} color={appPositionMasterMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appPositionMasterMsg == 'string' ? null : appPositionMasterMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appPositionMaster ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-briefcase"></span> Master Position
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
                                    keyField={"positionCd"}
                                    columns={appPositionColumn}
                                    redukResponse={appPositionListData}
                                    appdata={appPositionListData?.data != null && appPositionListData?.data.list ? appPositionListData?.data.list : []}
                                    appdataTotal={appPositionListData?.data != null ? appPositionListData?.data.count : 0}
                                    searchSet={setAppPositionTabelSearch}
                                    searchGet={appPositionTabelSearch}
                                    redukCall={getPositionListDataAction}
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

                    <AddPositionMaster
                        appLocationListData={appLocationListData}
                        appAddPositionMaster={appAddPositionMaster}
                        setAppPositionMaster={setAppPositionMaster}
                        setAppAddPositionMaster={setAppAddPositionMaster}
                        setAppPositionMasterMsg={setAppPositionMasterMsg}
                    />

                    <EditPositionMaster
                        appLocationListData={appLocationListData}
                        appPositionMasterData={appPositionMasterData}
                        appEditPositionMaster={appEditPositionMaster}
                        setAppPositionMaster={setAppPositionMaster}
                        setAppEditPositionMaster={setAppEditPositionMaster}
                        setAppPositionMasterMsg={setAppPositionMasterMsg}
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

export default PositionMaster;
