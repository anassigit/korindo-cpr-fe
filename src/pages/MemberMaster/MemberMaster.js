<<<<<<< HEAD
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
import { deleteMemberMaster, getMemberListDataAction } from "store/actions";
import '../../assets/scss/custom.scss';
import '../../config';
import AddMemberMaster from "./AddMemberMaster";
import EditMemberMaster from "./EditMemberMaster";

const MemberMaster = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [modal, setModal] = useState(false)

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appMemberMasterMsg, setAppMemberMasterMsg] = useState("")

    const [searchVal, setSearchVal] = useState("")

    const [appMemberMaster, setAppMemberMaster] = useState(true)
    const [appAddMemberMaster, setAppAddMemberMaster] = useState(false)
    const [appEditMemberMaster, setAppEditMemberMaster] = useState(false)

    const [appMemberMasterData, setAppMemberMasterData] = useState({})

    const [memberId, setmemberId] = useState('')

    const appMemberListData = useSelector((state) => {
        return state.memberMasterReducer.respGetMemberList
    });

    const appMemberLocationListData = useSelector((state) => {
        return state.memberMasterReducer.respGetLocationList5
    });

    const appMessageDelete = useSelector((state) => state.memberMasterReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.memberMasterReducer.msgAdd);

    const appMessageEdit = useSelector((state) => {
        return state.memberMasterReducer.msgEdit
    });

    const [appMemberTabelSearch, setAppMemberTabelSearch] = useState({
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

    const appMemberColumn = [
        {
            dataField: "memberId",
            text: "Kode Karyawan",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "memberName",
            text: "Nama Karyawan",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "positionName",
            text: "Posisi",
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
            formatter: (cellContent, cellData, index) => {
                return (
                    <React.Fragment>
                        <a id={`edit-${index}`} className="mdi mdi-pencil text-primary" onClick={() => preEditApp(cellData)} />
                        <a id={`delete-${index}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${index}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${index}`}>Delete</UncontrolledTooltip>
                    </React.Fragment>
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
        setAppMemberTabelSearch((prevState) => ({
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
        setAppAddMemberMaster(true)
        setAppMemberMaster(false)
    }

    const preEditApp = (data) => {
        setAppEditMemberMaster(true)
        setAppMemberMaster(false)
        setAppMemberMasterData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data.memberId) {
            setmemberId(data.memberId)
        }
    }

    const toggleApply = () => {
        setAppMemberMasterMsg('')
        dispatch(deleteMemberMaster({ memberId: memberId }))
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
            dispatch(getMemberListDataAction(appMemberTabelSearch));
            setAppMemberMasterMsg(messageToUpdate);
        }
    }, [appMessageDelete]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageAdd.status === '1' || appMessageAdd.status === '0') {
            messageToUpdate = appMessageAdd;
            if (appMessageAdd.status === '1') {
                setAppMemberMaster(true);
                setAppAddMemberMaster(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getMemberListDataAction(appMemberTabelSearch));
            setAppMemberMasterMsg(messageToUpdate);
        }
    }, [appMessageAdd]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1') {
                setAppMemberMaster(true);
                setAppEditMemberMaster(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getMemberListDataAction(appMemberTabelSearch));
            setAppMemberMasterMsg(messageToUpdate);
        }
    }, [appMessageEdit]);

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appMemberMasterMsg !== "" ? <UncontrolledAlert toggle={() => { setAppMemberMasterMsg("") }} color={appMemberMasterMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appMemberMasterMsg == 'string' ? null : appMemberMasterMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appMemberMaster ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-source-branch"></span> Master Karyawan
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
                                        onClick={() => preAddApp()}
                                    >
                                        <span className="mdi mdi-plus" /> Tambah
                                    </Button>
                                </div>

                                <TableCustom
                                    keyField={"memberId"}
                                    columns={appMemberColumn}
                                    redukResponse={appMemberListData}
                                    appdata={appMemberListData?.data != null && appMemberListData?.data.list ? appMemberListData?.data.list : []}
                                    appdataTotal={appMemberListData?.data != null ? appMemberListData?.data.count : 0}
                                    searchSet={setAppMemberTabelSearch}
                                    searchGet={appMemberTabelSearch}
                                    redukCall={getMemberListDataAction}
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

                    <AddMemberMaster
                        appMemberLocationListData={appMemberLocationListData}
                        appAddMemberMaster={appAddMemberMaster}
                        setAppMemberMaster={setAppMemberMaster}
                        setAppAddMemberMaster={setAppAddMemberMaster}
                        setAppMemberMasterMsg={setAppMemberMasterMsg}
                        setLoadingSpinner={setLoadingSpinner}
                    />

                    <EditMemberMaster
                        appMemberLocationListData={appMemberLocationListData}
                        appMemberMasterData={appMemberMasterData}
                        appEditMemberMaster={appEditMemberMaster}
                        setAppMemberMaster={setAppMemberMaster}
                        setAppEditMemberMaster={setAppEditMemberMaster}
                        setAppMemberMasterMsg={setAppMemberMasterMsg}
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

export default MemberMaster;
=======
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
import { deleteMemberMaster, getMemberListDataAction } from "store/actions";
import '../../assets/scss/custom.scss';
import '../../config';
import AddMemberMaster from "./AddMemberMaster";
import EditMemberMaster from "./EditMemberMaster";

const MemberMaster = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [modal, setModal] = useState(false)

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appMemberMasterMsg, setAppMemberMasterMsg] = useState("")

    const [searchVal, setSearchVal] = useState("")

    const [appMemberMaster, setAppMemberMaster] = useState(true)
    const [appAddMemberMaster, setAppAddMemberMaster] = useState(false)
    const [appEditMemberMaster, setAppEditMemberMaster] = useState(false)

    const [appMemberMasterData, setAppMemberMasterData] = useState({})

    const [memberId, setmemberId] = useState('')

    const appMemberListData = useSelector((state) => {
        return state.memberMasterReducer.respGetMemberList
    });

    const appMemberLocationListData = useSelector((state) => {
        return state.memberMasterReducer.respGetLocationList5
    });

    const appMessageDelete = useSelector((state) => state.memberMasterReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.memberMasterReducer.msgAdd);

    const appMessageEdit = useSelector((state) => {
        return state.memberMasterReducer.msgEdit
    });

    const [appMemberTabelSearch, setAppMemberTabelSearch] = useState({
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

    const appMemberColumn = [
        {
            dataField: "memberId",
            text: "Kode Karyawan",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "memberName",
            text: "Nama Karyawan",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "positionName",
            text: "Posisi",
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
            formatter: (cellContent, cellData, index) => {
                return (
                    <React.Fragment>
                        <a id={`edit-${index}`} className="mdi mdi-pencil text-primary" onClick={() => preEditApp(cellData)} />
                        <a id={`delete-${index}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${index}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${index}`}>Delete</UncontrolledTooltip>
                    </React.Fragment>
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
        setAppMemberTabelSearch((prevState) => ({
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
        setAppAddMemberMaster(true)
        setAppMemberMaster(false)
    }

    const preEditApp = (data) => {
        setAppEditMemberMaster(true)
        setAppMemberMaster(false)
        setAppMemberMasterData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data.memberId) {
            setmemberId(data.memberId)
        }
    }

    const toggleApply = () => {
        setAppMemberMasterMsg('')
        dispatch(deleteMemberMaster({ memberId: memberId }))
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
            dispatch(getMemberListDataAction(appMemberTabelSearch));
            setAppMemberMasterMsg(messageToUpdate);
        }
    }, [appMessageDelete]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageAdd.status === '1' || appMessageAdd.status === '0') {
            messageToUpdate = appMessageAdd;
            if (appMessageAdd.status === '1') {
                setAppMemberMaster(true);
                setAppAddMemberMaster(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getMemberListDataAction(appMemberTabelSearch));
            setAppMemberMasterMsg(messageToUpdate);
        }
    }, [appMessageAdd]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1') {
                setAppMemberMaster(true);
                setAppEditMemberMaster(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getMemberListDataAction(appMemberTabelSearch));
            setAppMemberMasterMsg(messageToUpdate);
        }
    }, [appMessageEdit]);

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appMemberMasterMsg !== "" ? <UncontrolledAlert toggle={() => { setAppMemberMasterMsg("") }} color={appMemberMasterMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appMemberMasterMsg == 'string' ? null : appMemberMasterMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appMemberMaster ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-source-branch"></span> Master Karyawan
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
                                        onClick={() => preAddApp()}
                                    >
                                        <span className="mdi mdi-plus" /> Tambah
                                    </Button>
                                </div>

                                <TableCustom
                                    keyField={"memberId"}
                                    columns={appMemberColumn}
                                    redukResponse={appMemberListData}
                                    appdata={appMemberListData?.data != null && appMemberListData?.data.list ? appMemberListData?.data.list : []}
                                    appdataTotal={appMemberListData?.data != null ? appMemberListData?.data.count : 0}
                                    searchSet={setAppMemberTabelSearch}
                                    searchGet={appMemberTabelSearch}
                                    redukCall={getMemberListDataAction}
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

                    <AddMemberMaster
                        appMemberLocationListData={appMemberLocationListData}
                        appAddMemberMaster={appAddMemberMaster}
                        setAppMemberMaster={setAppMemberMaster}
                        setAppAddMemberMaster={setAppAddMemberMaster}
                        setAppMemberMasterMsg={setAppMemberMasterMsg}
                        setLoadingSpinner={setLoadingSpinner}
                    />

                    <EditMemberMaster
                        appMemberLocationListData={appMemberLocationListData}
                        appMemberMasterData={appMemberMasterData}
                        appEditMemberMaster={appEditMemberMaster}
                        setAppMemberMaster={setAppMemberMaster}
                        setAppEditMemberMaster={setAppEditMemberMaster}
                        setAppMemberMasterMsg={setAppMemberMasterMsg}
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

export default MemberMaster;
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
