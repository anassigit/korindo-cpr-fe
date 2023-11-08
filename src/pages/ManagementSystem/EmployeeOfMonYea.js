import RootPageCustom from "common/RootPageCustom";
import TableCustom from "common/TableCustom";
import React, { useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Input,
    Label,
    Row,
    Spinner,
    UncontrolledTooltip
} from "reactstrap";
import '../../assets/scss/custom.scss';
import '../../config';
import { getListData, getYearListData } from "store/actions";
import TableCustom2 from "common/TableCustom2";

const EmployeeOfMonYea = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [detailModal, setDetailModal] = useState(false)

    const [searchVal, setSearchVal] = useState("")
    const [filterVal, setFilterVal] = useState("")
    const [yearVal, setYearVal] = useState(parseInt(new Date().getFullYear()))

    const appEmployeeMonYeaData = useSelector((state) => state.managementSystemReducer.respGetList);
    const appYearListData = useSelector((state) => state.managementSystemReducer.respGetYearList);

    const [appEmployeeMonYeaTabelSearch, setAppEmployeeMonYeaTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search:
        {
            year: "",
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
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "member_id",
            text: "NIK",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "member_name",
            text: "Nama Karyawan",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "dept_name",
            text: "Divisi",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "keyword",
            text: "Keyword",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
            headerStyle: { textAlign: 'center' },

        },
        {
            dataField: "periodFrom",
            text: "Periode From",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
        },
        {
            dataField: "periodTo",
            text: "Periode To",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
        },
        {
            dataField: "star",
            text: "Jumlah",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
        },
        {
            text: "Actions",
            headerStyle: { textAlign: 'center' },
            style: { justifyContent: 'center', display: 'flex', gap: '12px' },
            formatter: (cellContent, cellData) => {

                return (
                    <React.Fragment>
                        <a className="mdi mdi-pencil text-primary" />
                        <a className="mdi mdi-delete text-danger" />
                    </React.Fragment>
                )
            }
        },
    ]

    const toggleModal = (data) => {
        setDetailModal(!detailModal)
    }

    useEffect(() => {
        dispatch(getYearListData())
    }, [])

    useEffect(() => {
        setAppEmployeeMonYeaTabelSearch((prevState) => ({
            ...prevState,
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
            search: {
                ...prevState.search,
                search: searchVal,
                filter: filterVal,
                year: parseInt(yearVal),
            },
        }));
    };


    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <Container fluid>
                    <Card style={{ marginBottom: 0 }}>
                        <CardHeader>
                            <span className="mdi mdi-star-circle"></span> List Employee of Month/Year
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
                                <Button>
                                    <span className="mdi mdi-plus" /> Tambah
                                </Button>
                            </div>

                            <TableCustom2
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
            }
        />
    );
};

export default EmployeeOfMonYea;
