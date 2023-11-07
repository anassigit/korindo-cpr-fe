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
    Container,
    Spinner,
    UncontrolledTooltip
} from "reactstrap";
import '../../assets/scss/custom.scss';
import '../../config';
import { getListData } from "store/actions";

const EmployeeOfMonYea = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [detailModal, setDetailModal] = useState(false)
    const [appDetailRecommendationData, setAppDetailRecommendationData] = useState(ReactSession.get('appDetailRecommendationData'))

    const appEmployeeMonYeaData = useSelector((state) => state.managementSystemReducer.respGetList);

    useEffect(() => {
        setAppDetailRecommendationData(ReactSession.get('appDetailRecommendationData'))
    }, [])

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
            dataField: "sticker",
            text: "Actions",
            headerStyle: { textAlign: 'center' },
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
        },
    ]

    const toggleModal = (data) => {
        setDetailModal(!detailModal)
    }

    useEffect(() => {
        if (appDetailRecommendationData) {
            dispatch(getListData(appEmployeeMonYeaTabelSearch))
        }
    }, [appEmployeeMonYeaTabelSearch])

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <Container fluid>
                    <Card style={{ marginBottom: 0 }}>
                        <CardHeader>
                            <span className="mdi mdi-star-circle"></span> List Employee of Month/Year
                        </CardHeader>
                        <CardBody className="bg-light" style={{ padding: 0, margin: 0, border: "1px solid #BBB" }}>
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
                </Container>
            }
        />
    );
};

export default EmployeeOfMonYea;
