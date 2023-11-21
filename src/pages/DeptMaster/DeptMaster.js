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
import { deleteEmployeeOf, getYearListData, resetMessage } from "store/actions";
import '../../assets/scss/custom.scss';
import '../../config';
import { getDeptListDataAction } from "store/deptmaster/actions";

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

    const [awardId, setAwardId] = useState('')

    const appDeptListData = useSelector((state) => state.deptMasterReducer.respGetDeptList);

    const appMessageDelete = useSelector((state) => state.managementSystemReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.managementSystemReducer.msgAdd);
    const appMessageEdit = useSelector((state) => {
        return state.managementSystemReducer.msgEdit
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
            dataField: "deptId",
            text: "ID",
            hidden: true,
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "deptName",
            text: "Nama Departement",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "deptNameKor",
            text: "Nama Departement (Korean)",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            text: "Actions",
            headerStyle: { textAlign: 'center' },
            style: { justifyContent: 'center', display: 'flex', gap: '12px' },
            formatter: (cellContent, cellData) => {
                return (
                    <React.Fragment>
                        <a id={`edit-${cellData.id}`} className="mdi mdi-pencil text-primary" onClick={() => preEditEmployeeOf(cellData)} />
                        <a id={`delete-${cellData.id}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${cellData.id}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${cellData.id}`}>Delete</UncontrolledTooltip>
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
        if (data.id) {
            setAwardId(data.id)
        }
    }

    const toggleApply = () => {
        setAppDeptMasterMsg('')
        dispatch(deleteEmployeeOf({ award_id: awardId }))
        setModal(!modal)
        setLoadingSpinner(true)
    }

    useEffect(() => {
        let messageToUpdate;

        if (appMessageDelete.status === '1') {
            messageToUpdate = appMessageDelete;
        } else if (appMessageAdd.status === '1') {
            messageToUpdate = appMessageAdd;
        } else if (appMessageEdit.status === '1') {
            messageToUpdate = appMessageEdit;
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getDeptListDataAction(appDeptTabelSearch));
            setAppDeptMasterMsg(messageToUpdate);
        }
    }, [appMessageDelete, appMessageAdd, appMessageEdit]);

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
                                <span className="mdi mdi-star-circle"></span> Master Departement
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
                                                onKeyPress={handleEnterKeyPress}
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
                                    keyField={"deptId"}
                                    columns={appDeptColumn}
                                    redukResponse={appDeptListData}
                                    appdata={appDeptListData?.data != null && appDeptListData?.data.list ? appDeptListData?.data.list : []}
                                    appdataTotal={appDeptListData?.data != null ? appDeptListData?.data.count : 0}
                                    searchSet={setAppDeptTabelSearch}
                                    searchGet={appDeptTabelSearch}
                                    redukCall={getDeptListDataAction}
                                />

                                {console.log(appDeptListData)}
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
