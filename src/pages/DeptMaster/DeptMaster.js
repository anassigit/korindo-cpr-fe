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
import { resetMessage } from "store/actions";
import { deleteDeptMaster, getDeptListDataAction } from "store/deptmaster/actions";
import '../../assets/scss/custom.scss';
import '../../config';
import AddDeptMaster from "./AddDeptMaster";
import EditDeptMaster from "./EditDeptMaster";

const DeptMaster = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [modal, setModal] = useState(false)

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appDeptMasterMsg, setAppDeptMasterMsg] = useState("")

    const [searchVal, setSearchVal] = useState("")

    const [appDeptMaster, setAppDeptMaster] = useState(true)
    const [appAddDeptMaster, setAppAddDeptMaster] = useState(false)
    const [appEditDeptMaster, setAppEditDeptMaster] = useState(false)

    const [appDeptMasterData, setAppDeptMasterData] = useState({})

    const [deptCd, setDeptCd] = useState('')

    const appDeptListData = useSelector((state) => {
        return state.deptMasterReducer.respGetDeptList
    });

    const appMessageDelete = useSelector((state) => state.deptMasterReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.deptMasterReducer.msgAdd);

    const appMessageEdit = useSelector((state) => {
        return state.deptMasterReducer.msgEdit
    });

    const [appDeptTabelSearch, setAppDeptTabelSearch] = useState({
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

    const appDeptColumn = [
        {
            dataField: "deptCd",
            text: "Department Kode",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
        },
        {
            dataField: "deptName",
            text: "Nama Department",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "deptNameKor",
            text: "Nama Department (Korean)",
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
                        <a id={`edit-${cellData.deptCd}`} className="mdi mdi-pencil text-primary" onClick={() => preEditEmployeeOf(cellData)} />
                        <a id={`delete-${cellData.deptCd}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${cellData.deptCd}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${cellData.deptCd}`}>Delete</UncontrolledTooltip>
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
        setAppDeptTabelSearch((prevState) => ({
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
        setAppAddDeptMaster(true)
        setAppDeptMaster(false)
    }

    const preEditEmployeeOf = (data) => {
        setAppEditDeptMaster(true)
        setAppDeptMaster(false)
        setAppDeptMasterData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data.deptCd) {
            setDeptCd(data.deptCd)
        }
    }

    const toggleApply = () => {
        setAppDeptMasterMsg('')
        dispatch(deleteDeptMaster({ deptCd: deptCd }))
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
            dispatch(getDeptListDataAction(appDeptTabelSearch));
            setAppDeptMasterMsg(messageToUpdate);
        }
    }, [appMessageDelete]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageAdd.status === '1' || appMessageAdd.status === '0') {
            messageToUpdate = appMessageAdd;
            if (appMessageAdd.status === '1') {
                setAppDeptMaster(true);
                setAppAddDeptMaster(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getDeptListDataAction(appDeptTabelSearch));
            setAppDeptMasterMsg(messageToUpdate);
        }
    }, [appMessageAdd]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1') {
                setAppDeptMaster(true);
                setAppEditDeptMaster(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getDeptListDataAction(appDeptTabelSearch));
            setAppDeptMasterMsg(messageToUpdate);
        }
    }, [appMessageEdit]);

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appDeptMasterMsg !== "" ? <UncontrolledAlert toggle={() => { setAppDeptMasterMsg("") }} color={appDeptMasterMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appDeptMasterMsg == 'string' ? null : appDeptMasterMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appDeptMaster ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-office-building"></span> Master Department
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
                                        onClick={() => preAddEmployeeOf()}
                                    >
                                        <span className="mdi mdi-plus" /> Tambah
                                    </Button>
                                </div>

                                <TableCustom
                                    keyField={"deptCd"}
                                    columns={appDeptColumn}
                                    redukResponse={appDeptListData}
                                    appdata={appDeptListData?.data != null && appDeptListData?.data.list ? appDeptListData?.data.list : []}
                                    appdataTotal={appDeptListData?.data != null ? appDeptListData?.data.count : 0}
                                    searchSet={setAppDeptTabelSearch}
                                    searchGet={appDeptTabelSearch}
                                    redukCall={getDeptListDataAction}
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

                    <AddDeptMaster
                        appAddDeptMaster={appAddDeptMaster}
                        setAppDeptMaster={setAppDeptMaster}
                        setAppAddDeptMaster={setAppAddDeptMaster}
                        setAppDeptMasterMsg={setAppDeptMasterMsg}
                    />

                    <EditDeptMaster
                        appDeptMasterData={appDeptMasterData}
                        appEditDeptMaster={appEditDeptMaster}
                        setAppDeptMaster={setAppDeptMaster}
                        setAppEditDeptMaster={setAppEditDeptMaster}
                        setAppDeptMasterMsg={setAppDeptMasterMsg}
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

export default DeptMaster;
