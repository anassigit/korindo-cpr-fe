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
import { deleteEmployeeOf, getListData, getYearListData, resetMessage } from "store/actions";
import '../../assets/scss/custom.scss';
import '../../config';
import AddEmployeeOf from "./AddEmployeeOf";
import EditEmployeeOf from "./EditEmployeeOf";

const EmployeeOfMonYea = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [modal, setModal] = useState(false)

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appEmployeeOfMonYeaMsg, setAppEmployeeOfMonYeaMsg] = useState("")

    const [appEmployeeOfMonYea, setAppEmployeeOfMonYea] = useState(true)
    const [appAddEmployeeOfMonYea, setAppAddEmployeeOfMonYea] = useState(false)
    const [appEditEmployeeOfMonYea, setAppEditEmployeeOfMonYea] = useState(false)

    const [appEmployeeOfMonYeaData, setAppEmployeeOfMonYeaData] = useState({})

    const [awardId, setAwardId] = useState('')

    const [searchVal, setSearchVal] = useState("")
    const [filterVal, setFilterVal] = useState("")
    const [yearVal, setYearVal] = useState()

    const appEmployeeMonYeaData = useSelector((state) => state.employeeOfMonYeaReducer.respGetList);
    const appYearListData = useSelector((state) => state.employeeOfMonYeaReducer.respGetYearList);

    const appMessageDelete = useSelector((state) => state.employeeOfMonYeaReducer.msgDelete);
    const appMessageAdd = useSelector((state) => state.employeeOfMonYeaReducer.msgAdd);
    const appMessageEdit = useSelector((state) => {
        return state.employeeOfMonYeaReducer.msgEdit
    });

    const [appEmployeeMonYeaTabelSearch, setAppEmployeeMonYeaTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search:
        {
            year: new Date().getFullYear(),
            filter: "",
            search: "",
        }
    });

    const appEmployeeMonYeaColumn = [
        {
            dataField: "id",
            text: "ID",
            hidden: true,
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "memberId",
            text: "NIK",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
        },
        {
            dataField: "memberName",
            text: "Nama Karyawan",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "deptName",
            text: "Divisi",
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
            dataField: "flag",
            text: "Year/Month",
            sort: true,
            headerStyle: { textAlign: 'center' },

        },
        {
            dataField: "keywordName",
            text: "Keyword",
            sort: true,
            headerStyle: { textAlign: 'center' },

        },
        {
            dataField: "award_Date",
            text: "Tanggal Penghargaan",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
        },
        {
            dataField: "score",
            text: "Nilai",
            sort: true,
            headerStyle: { textAlign: 'center' },

        },
        {
            dataField: "view",
            text: "Aktif",
            sort: true,
            headerStyle: { textAlign: 'center' },
            formatter: (value, row) => {
                return (
                    <>
                        {value === 0 ? 'false' : 'true'}
                    </>
                )
            }

        },
        {
            text: "Actions",
            headerStyle: { textAlign: 'center' },
            style: { justifyContent: 'center', display: 'flex', gap: '12px' },
            formatter: (cellContent, cellData) => {
                return (
                    <React.Fragment>
                        <a id={`edit-${cellData.awardId}`} className="mdi mdi-pencil text-primary" onClick={() => preEditApp(cellData)} />
                        <a id={`delete-${cellData.awardId}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
                        <UncontrolledTooltip target={`edit-${cellData.awardId}`}>Edit</UncontrolledTooltip>
                        <UncontrolledTooltip target={`delete-${cellData.awardId}`}>Delete</UncontrolledTooltip>
                    </React.Fragment>
                )
            }
        },
    ]

    useEffect(() => {
        dispatch(getYearListData())
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        setAppEmployeeMonYeaTabelSearch((prevState) => ({
            ...prevState,
            page: 1,
            offset: 0,
            search: {
                ...prevState.search,
                search: searchVal,
                filter: filterVal,
                year: parseInt(yearVal),
            },
        }));
    }, [filterVal, yearVal])

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClick();
        }
    };

    const handleClick = () => {
        setAppEmployeeMonYeaTabelSearch((prevState) => ({
            ...prevState,
            page: 1,
            offset: 0,
            search: {
                ...prevState.search,
                search: searchVal,
                filter: filterVal,
                year: parseInt(yearVal),
            },
        }));
    };

    const preAddApp = () => {
        setAppAddEmployeeOfMonYea(true)
        setAppEmployeeOfMonYea(false)
    }

    const preEditApp = (data) => {
        setAppEditEmployeeOfMonYea(true)
        setAppEmployeeOfMonYea(false)
        setAppEmployeeOfMonYeaData(data)
    }

    const toggleDeleteModal = (data) => {
        setModal(!modal)
        if (data.awardId) {
            setAwardId(data.awardId)
        }
    }

    const toggleApply = () => {
        setAppEmployeeOfMonYeaMsg('')
        dispatch(deleteEmployeeOf({ awardId: awardId }))
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
            dispatch(getListData(appEmployeeMonYeaTabelSearch));
            setAppEmployeeOfMonYeaMsg(messageToUpdate);
        }
        dispatch(getYearListData())
    }, [appMessageDelete]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageAdd.status === '1' || appMessageAdd.status === '0') {
            messageToUpdate = appMessageAdd;
            if (appMessageAdd.status === '1') {
                setAppEmployeeOfMonYea(true);
                setAppAddEmployeeOfMonYea(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getListData(appEmployeeMonYeaTabelSearch));
            setAppEmployeeOfMonYeaMsg(messageToUpdate);
        }
        dispatch(getYearListData())
    }, [appMessageAdd]);

    useEffect(() => {
        let messageToUpdate;

        if (appMessageEdit.status === '1' || appMessageEdit.status === '0') {
            messageToUpdate = appMessageEdit;
            if (appMessageEdit.status === '1') {
                setAppEmployeeOfMonYea(true);
                setAppEditEmployeeOfMonYea(false);
            }
        }

        if (messageToUpdate) {
            setLoadingSpinner(false);
            dispatch(getListData(appEmployeeMonYeaTabelSearch));
            setAppEmployeeOfMonYeaMsg(messageToUpdate);
        }
        dispatch(getYearListData())
    }, [appMessageEdit]);

    useEffect(() => {
        if (appYearListData.status === '1') {
            if (Array.isArray(appYearListData?.data?.list)) {
                setYearVal(appYearListData?.data?.list[0])
            }
        }
    }, [appYearListData])

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appEmployeeOfMonYeaMsg !== "" ? <UncontrolledAlert toggle={() => { setAppEmployeeOfMonYeaMsg("") }} color={appEmployeeOfMonYeaMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appEmployeeOfMonYeaMsg == 'string' ? null : appEmployeeOfMonYeaMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appEmployeeOfMonYea ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-account"></span> List Employee of Month/Year
                            </CardHeader>
                            <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                                >
                                    <div
                                        className="col-6 pb-2"
                                    >
                                        <div
                                            className="col-5"
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
                                    <div
                                        className="pb-2"
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "12px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        Tahun
                                        <Input
                                            type="select"
                                            value={yearVal}
                                            onChange={(e) => setYearVal(e.target.value)}
                                        >
                                            {
                                                appYearListData?.data?.list
                                                    .sort((a, b) => {
                                                        return b - a
                                                    })
                                                    .map((item, index) => {

                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item}
                                                            >
                                                                {item}
                                                            </option>
                                                        )
                                                    })
                                            }
                                        </Input>
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
                                    Periode/Year
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
                                                onClick={() => setFilterVal("all")}
                                                defaultChecked
                                            /> All
                                        </Label>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name="searchOption"
                                                value="year"
                                                onClick={() => setFilterVal("year")}
                                            /> Year
                                        </Label>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name="searchOption"
                                                value="month"
                                                onClick={() => setFilterVal("month")}
                                            /> Month
                                        </Label>
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
                                    columns={appEmployeeMonYeaColumn}
                                    redukResponse={appEmployeeMonYeaData}
                                    appdata={appEmployeeMonYeaData.data != null && appEmployeeMonYeaData.data.list ? appEmployeeMonYeaData.data.list : []}
                                    appdataTotal={appEmployeeMonYeaData.data != null ? appEmployeeMonYeaData.data.count : 0}
                                    searchSet={setAppEmployeeMonYeaTabelSearch}
                                    searchGet={appEmployeeMonYeaTabelSearch}
                                    redukCall={getListData}
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
                    </Container >
                    <AddEmployeeOf
                        setAppEmployeeOfMonYea={setAppEmployeeOfMonYea}
                        appAddEmployeeOfMonYea={appAddEmployeeOfMonYea}
                        setAppAddEmployeeOfMonYea={setAppAddEmployeeOfMonYea}
                        setAppEmployeeOfMonYeaMsg={setAppEmployeeOfMonYeaMsg}
                        appEmployeeMonYeaData={appEmployeeMonYeaData?.data?.list}
                    />
                    <EditEmployeeOf
                        setAppEmployeeOfMonYea={setAppEmployeeOfMonYea}
                        appEditEmployeeOfMonYea={appEditEmployeeOfMonYea}
                        setAppEditEmployeeOfMonYea={setAppEditEmployeeOfMonYea}
                        setAppEmployeeOfMonYeaMsg={setAppEmployeeOfMonYeaMsg}
                        appEmployeeOfMonYeaData={appEmployeeOfMonYeaData}
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

export default EmployeeOfMonYea;
