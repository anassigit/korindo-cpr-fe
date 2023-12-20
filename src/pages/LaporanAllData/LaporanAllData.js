import RootPageCustom from "common/RootPageCustom";
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
    UncontrolledTooltip
} from "reactstrap";
import '../../assets/scss/custom.scss';
import '../../config';
import { getLaporanAllData } from "store/actions";
import TableCustom from "common/TableCustom";

const LaporanAllData = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [searchVal, setSearchVal] = useState('')

    const [appLaporanAllDataPage, setAppLaporanAllDataPage] = useState(true)
    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const appLaporanAllData = useSelector((state) => {
        return state.laporanAllDataReducer.respGetLaporanAllData
    })

    const [appLaporanAllDataTabelSearch, setAppLaporanAllDataTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search:
        {
            periodFrom: '2023-12-01',
            periodTo: '2023-12-30',
            memberId: '',
            locationId: '1',
            orgCd: '',
        }
    })

    const appLaporanAllDataColumn = [
        {
            dataField: "write_time",
            text: "Tgl",
            hidden: true,
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "fromDeptName",
            text: "Div",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "fromPositionName",
            text: "Jabatan",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "fromMemberId",
            text: "Nik",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "fromMemberName",
            text: "Nama",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "fromAge",
            text: "Usia",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "fromGender",
            text: "Jenis Kelamin",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "toDeptName",
            text: "Div",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "toPositionName",
            text: "Jabatan",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "toMemberId",
            text: "Nik",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "toMemberName",
            text: "Nama",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "toAge",
            text: "Usia",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "toGender",
            text: "Jenis Kelamin",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "stickerName",
            text: "Penghargaan",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "comment",
            text: "Komentar",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "star",
            text: "Nilai Poin",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "action",
            text: "Action",
            headerStyle: { textAlign: 'center' },
            formatter: (row, rowData, rowIndex) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '16px', gap: '12px', margin: '0 25px 0 25px' }}>
                        <span
                            onClick={() => toggleModalContent(rowData)}
                            id={`viewtooltip-action-${rowIndex}`}
                            className="mdi mdi-text-box-outline text-primary"
                        />
                        <UncontrolledTooltip placement="top" target={`viewtooltip-action-${rowIndex}`}>
                            Detail
                        </UncontrolledTooltip>
                    </div>
                )
            }
        },
    ]

    useEffect(() => {
        // dispatch(getLaporanAllData)
    }, [])

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {/* {appLaporanAllDataMsg !== "" ? <UncontrolledAlert toggle={() => { setAppLaporanAllDataMsg("") }} color={appLaporanAllDataMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appLaporanAllDataMsg == 'string' ? null : appLaporanAllDataMsg?.message}</UncontrolledAlert> : null} */}
                    <Container
                        style={{ display: appLaporanAllDataPage ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-file-chart"></span> Laporan All Data
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
                                            // onKeyDown={handleEnterKeyPress}
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

                                <TableCustom
                                    keyField={(row) => `${row.fromMemberId}-${row.toMemberId}`}
                                    columns={appLaporanAllDataColumn}
                                    redukResponse={appLaporanAllData}
                                    appdata={appLaporanAllData?.data != null && appLaporanAllData?.data.list ? appLaporanAllData?.data.list : []}
                                    appdataTotal={appLaporanAllData?.data != null ? appLaporanAllData?.data.count : 0}
                                    searchSet={setAppLaporanAllDataTabelSearch}
                                    searchGet={appLaporanAllDataTabelSearch}
                                    redukCall={getLaporanAllData}
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

                    {/* <MsgModal
                        toggle={toggleDeleteModal}
                        toggleApply={toggleApply}
                        modal={modal}
                        message={'Apakah anda yakin untuk menghapus ini?'}
                    /> */}
                </React.Fragment>
            }
        />
    );
};

export default LaporanAllData;
