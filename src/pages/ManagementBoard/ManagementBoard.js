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
import { editMaintainReport, getReportListDataAction, getStatusReport, resetMessage } from "store/actions";
import '../../assets/scss/custom.scss';
import '../../config';
// import EditManagementBoard from "./EditManagementBoard";

const ManagementBoard = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appManagementBoardMsg, setAppManagementBoardMsg] = useState("")
    const [searchVal, setSearchVal] = useState("")
    const [filterVal, setFilterVal] = useState("")
    const [appManagementBoard, setAppManagementBoard] = useState(true)
    const [modal, setModal] = useState(false)
    const [appManagementBoardData, setAppManagementBoardData] = useState({})
    const [statusId, setStatusId] = useState('')

    const appReportListData = useSelector((state) => {
        return state.managementBoardReducer.respGetReportList2
    });

    const appStatusListData = useSelector((state) => {
        return state.managementBoardReducer.respGetStatusReport
    });

    const appMessageEdit = useSelector((state) => {
        return state.managementBoardReducer.msgEdit
    });

    const [appReportTabelSearch, setAppReportTabelSearch] = useState({
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

    const appReportColumn = [
        {
            dataField: "write_time",
            text: "Tgl",
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' }
        },
        {
            dataField: "reportId",
            text: "Kode Report",
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' }
        },
        {
            dataField: "statusName",
            text: "Status",
            headerStyle: { textAlign: 'center' }
        },
        {
            dataField: "complainMemberName",
            text: "Reporter",
            headerStyle: { textAlign: 'center' }
        },
        {
            dataField: "fromMemberName",
            text: "Pemberi Bintang",
            headerStyle: { textAlign: 'center' }
        },
        {
            dataField: "toMemberName",
            text: "Penerima Bintang",
            headerStyle: { textAlign: 'center' }
        },
        {
            dataField: "comment",
            text: "Komentar",
            headerStyle: { textAlign: 'center' },
            style: { minWidth: "30vw", maxWidth: "25vw", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" },
            formatter: (row, _rowData, rowIndex) => {
                return (
                    <React.Fragment>
                        <span id={`viewtooltip-${rowIndex}`}>{row}</span>
                        <UncontrolledTooltip placement="bottom-start" target={`viewtooltip-${rowIndex}`}>
                            {row}
                        </UncontrolledTooltip>

                    </React.Fragment>
                )
            }
        },
        {
            dataField: "reportName",
            text: "Jenis",
            headerStyle: { textAlign: 'center' }
        },
        {
            text: "Actions",
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center', fontSize: '16px' },
            formatter: (cellContent, cellData, index) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <a id={`edit-${index}`} className="mdi mdi-pencil text-primary" onClick={() => preEditApp(cellData)} />
                        <UncontrolledTooltip target={`edit-${index}`}>Edit</UncontrolledTooltip>
                    </div>
                )
            }
        },
    ]

    useEffect(() => {
        dispatch(getStatusReport())
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        setAppReportTabelSearch((prevState) => ({
            ...prevState,
            page: 1,
            offset: 0,
            sort: "",
            order: "",
            search: {
                ...prevState.search,
                search: searchVal,
                viewType: filterVal
            }
        }));
    }, [filterVal])

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClick();
        }
    };

    const handleClick = () => {
        setAppReportTabelSearch((prevState) => ({
            ...prevState,
            page: 1,
            offset: 0,
            search: {
                ...prevState.search,
                search: searchVal,
            },
        }));
    };
    const preEditApp = (data) => {
        setModal(!modal)
        if (data.reportId) {
            setAppManagementBoardData(data)
        } else {
            setAppManagementBoardData(null)
        }
    }

    useEffect(() => {
        let messageToUpdate;

        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1') {
                setAppManagementBoard(true);
                setModal(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getReportListDataAction(appReportTabelSearch));
            setAppManagementBoardMsg(messageToUpdate);
        }
    }, [appMessageEdit]);

    const toggleApply = () => {
        setAppManagementBoardMsg('')
        dispatch(editMaintainReport({
            reportId: parseInt(appManagementBoardData.reportId),
            statusId: parseInt(statusId),
        }))
        setModal(!modal)
        setLoadingSpinner(true)
    }

    useEffect(() => {
        if (appStatusListData.status === '1') {
            setStatusId(appStatusListData?.data?.list[0].statusId)
        }
    }, [appStatusListData])

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appManagementBoardMsg !== "" ? <UncontrolledAlert toggle={() => { setAppManagementBoardMsg("") }} color={appManagementBoardMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appManagementBoardMsg == 'string' ? null : appManagementBoardMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appManagementBoard ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-alert"></span> Management Board
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
                                    className="col-3 pb-3"
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "12px",
                                        justifyContent: "left",
                                        alignItems: "center",
                                    }}
                                >
                                    Status
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "12px",
                                        }}
                                    >
                                        <Label check={true}>
                                            <Input
                                                type="radio"
                                                name="searchOption"
                                                value="all"
                                                onClick={() => setFilterVal("0")}
                                                defaultChecked
                                            /> Semua
                                        </Label>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name="searchOption"
                                                value="standBy"
                                                onClick={() => setFilterVal("1")}
                                            /> Menunggu
                                        </Label>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name="searchOption"
                                                value="already"
                                                onClick={() => setFilterVal("2")}
                                            /> Sudah
                                        </Label>
                                    </div>
                                </div>
                                <TableCustom
                                    keyField={"reportId"}
                                    columns={appReportColumn}
                                    redukResponse={appReportListData}
                                    appdata={appReportListData?.data != null && appReportListData?.data.list ? appReportListData?.data.list : []}
                                    appdataTotal={appReportListData?.data != null ? appReportListData?.data.count : 0}
                                    searchSet={setAppReportTabelSearch}
                                    searchGet={appReportTabelSearch}
                                    redukCall={getReportListDataAction}
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

                    <MsgModal
                        title={'Edit Status Laporan'}
                        toggle={preEditApp}
                        toggleApply={toggleApply}
                        modal={modal}
                        message={
                            <>
                                <div className="pb-2">
                                    <b style={{ fontSize: '14px' }}>Pilih Keyword</b>
                                </div>
                                <Input
                                    type="select"
                                    value={statusId}
                                    onChange={(e) => setStatusId(e.target.value)}
                                >
                                    {
                                        Array.isArray(appStatusListData?.data?.list) ? appStatusListData.data.list.map((item, index) => (
                                            <option
                                                key={item.statusId}
                                                value={item.statusId}
                                            >
                                                {item.statusName}
                                            </option>
                                        ))
                                            : null
                                    }
                                </Input>
                            </>
                        }
                    />

                </React.Fragment>
            }
        />
    );
};

export default ManagementBoard;
