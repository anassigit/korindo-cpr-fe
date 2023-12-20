import RootPageCustom from "common/RootPageCustom";
import React, { useEffect, useRef, useState } from "react";
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
import TableCustom2 from "common/TableCustom2";
import DatePicker from "react-datepicker";

const LaporanAllData = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const dateRef1 = useRef(null);
    const dateRef2 = useRef(null);

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    
    const [searchVal, setSearchVal] = useState('')

    const [appLaporanAllDataPage, setAppLaporanAllDataPage] = useState(true)
    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const appLaporanAllData = useSelector((state) => {
        return state.laporanAllDataReducer.respGetLaporanAllData
    })

    const years = range(1900, 2199 + 1, 1);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agt",
        "Sep",
        "Okt",
        "Nov",
        "Des",
    ]

    function range(start, end, step) {
        const result = [];
        for (let i = start; i < end; i += step) {
            result.push(i);
        }
        return result;
    }


    const [appLaporanAllDataTabelSearch, setAppLaporanAllDataTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search:
        {
            periodFrom: '2023-12-01',
            periodTo: '2023-12-05',
            memberId: '',
            locationId: '1',
            orgCd: '',
        }
    })

    const appLaporanAllDataColumn = [
        {
            dataField: "write_time",
            text: "Tgl",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#F6F7C4', borderColor: '#F6F7C4' },
        },
        {
            dataField: "fromDeptName",
            text: "Dari Div",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#F6F7C4', borderColor: '#F6F7C4' },
        },
        {
            dataField: "fromPositionName",
            text: "Dari Jabatan",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#F6F7C4', borderColor: '#F6F7C4' },
        },
        {
            dataField: "fromMemberId",
            text: "Dari Nik",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#F6F7C4', borderColor: '#F6F7C4' },
        },
        {
            dataField: "fromMemberName",
            text: "Dari Nama",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#F6F7C4', borderColor: '#F6F7C4' },
        },
        {
            dataField: "fromAge",
            text: "Dari Usia",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#F6F7C4', borderColor: '#F6F7C4' },
        },
        {
            dataField: "fromGender",
            text: "Dari Jenis Kelamin",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#F6F7C4', borderColor: '#F6F7C4' },
        },
        {
            dataField: "toDeptName",
            text: "Ke Div",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#FFDEB4', borderColor: '#FFDEB4' },
        },
        {
            dataField: "toPositionName",
            text: "Ke Jabatan",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#FFDEB4', borderColor: '#FFDEB4' },
        },
        {
            dataField: "toMemberId",
            text: "Ke Nik",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#FFDEB4', borderColor: '#FFDEB4' },
        },
        {
            dataField: "toMemberName",
            text: "Ke Nama",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#FFDEB4', borderColor: '#FFDEB4' },
        },
        {
            dataField: "toAge",
            text: "Ke Usia",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#FFDEB4', borderColor: '#FFDEB4' },
        },
        {
            dataField: "toGender",
            text: "Ke Jenis Kelamin",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#FFDEB4', borderColor: '#FFDEB4' },
        },
        {
            dataField: "stickerName",
            text: "Penghargaan",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#FFA1A1', borderColor: '#FFA1A1' },
        },
        {
            dataField: "comment",
            text: "Komentar",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#FFA1A1', borderColor: '#FFA1A1' },
        },
        {
            dataField: "star",
            text: "Nilai Poin",
            sort: true,
            headerStyle: { textAlign: 'center', backgroundColor: '#FFA1A1', borderColor: '#FFA1A1' },
        },
        {
            dataField: "action",
            text: "Action",
            headerStyle: { textAlign: 'center', },
            formatter: (row, rowData, rowIndex) => {
                return (
                    <a style={{ display: 'flex', justifyContent: 'center', fontSize: '16px', gap: '12px', margin: '0 25px 0 25px' }}>
                        <span
                            onClick={() => toggleModalContent(rowData)}
                            id={`viewtooltip-action-${rowIndex}`}
                            className="mdi mdi-text-box-outline text-primary"
                        />
                        <UncontrolledTooltip placement="top" target={`viewtooltip-action-${rowIndex}`}>
                            Detail
                        </UncontrolledTooltip>
                    </a>
                )
            }
        },
    ]

    useEffect(() => {
        // dispatch(getLaporanAllData)
        setLoadingSpinner(true)
    }, [])

    useEffect(() => {
        if (appLaporanAllData.status === '1' || appLaporanAllData.status === '0') {
            setLoadingSpinner(false)
        }
    }, [appLaporanAllData, appLaporanAllDataTabelSearch])

    useEffect(() => {
        if (appLaporanAllDataTabelSearch) {
            setLoadingSpinner(true)
        }

    }, [appLaporanAllDataTabelSearch])

    const handleDateClick1 = () => {
        dateRef1.current.setOpen(true)
    };

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

                                <div
                                    className="col-12 pb-2"
                                    style={{
                                        display: 'flex',
                                        gap: '12px',
                                    }}
                                >
                                    <div
                                        className="col-2"
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "18px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        Lokasi
                                        <Input
                                            type="select"
                                            value={searchVal}
                                            onChange={(e) => setSearchVal(e.target.value)}
                                        // onKeyDown={handleEnterKeyPress}
                                        />
                                    </div>
                                    <div
                                        className="col-2"
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "18px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        Kode Organisasi
                                        <Input
                                            type="select"
                                            value={searchVal}
                                            onChange={(e) => setSearchVal(e.target.value)}
                                        // onKeyDown={handleEnterKeyPress}
                                        />
                                    </div>
                                    <div
                                        className="col-2"
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "18px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        Nik
                                        <Input
                                            type="select"
                                            value={searchVal}
                                            onChange={(e) => setSearchVal(e.target.value)}
                                        // onKeyDown={handleEnterKeyPress}
                                        />
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                    className="pb-2"
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '80%',
                                            gap: '12px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '25.8%',
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div style={{
                                                width: '30%'
                                            }}>
                                                Periode Start <span className="text-danger">*</span>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <DatePicker
                                                    ref={dateRef1}
                                                    className={`form-control date-with-button`}
                                                    dateFormat="yyyy-MM-dd"
                                                    maxDate={startDate && new Date(startDate)}
                                                    renderCustomHeader={({
                                                        date,
                                                        changeYear,
                                                        changeMonth,
                                                        decreaseMonth,
                                                        increaseMonth,
                                                        prevMonthButtonDisabled,
                                                        nextMonthButtonDisabled,
                                                    }) => (
                                                        <div
                                                            style={{
                                                                margin: 10,
                                                                display: "flex",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <Button
                                                                style={{
                                                                    borderTopRightRadius: '0',
                                                                    borderBottomRightRadius: '0',
                                                                }}
                                                                onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                                {"<"}
                                                            </Button>
                                                            <select
                                                                style={{
                                                                    borderTopLeftRadius: '0',
                                                                    borderBottomLeftRadius: '0',
                                                                }}
                                                                className="form-control"
                                                                value={new Date(date).getFullYear()}
                                                                onChange={({ target: { value } }) => changeYear(value)}
                                                            >
                                                                {years.map((option) => (
                                                                    <option key={option} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                            </select>

                                                            <select
                                                                style={{
                                                                    borderTopRightRadius: '0',
                                                                    borderBottomRightRadius: '0',
                                                                }}
                                                                className="form-control"
                                                                value={months[new Date(date).getMonth()]}
                                                                onChange={({ target: { value } }) =>
                                                                    changeMonth(months.indexOf(value))
                                                                }
                                                            >
                                                                {months.map((option) => (
                                                                    <option key={option} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                            </select>

                                                            <Button
                                                                style={{
                                                                    borderTopLeftRadius: '0',
                                                                    borderBottomLeftRadius: '0',
                                                                }}
                                                                onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                                {">"}
                                                            </Button>
                                                        </div>
                                                    )}
                                                    selected={startDate}
                                                    onChange={(tglMulai) =>
                                                        dateChanger('from', tglMulai ? tglMulai : null)
                                                    }
                                                />

                                                <Button
                                                    style={{
                                                        borderTopLeftRadius: '0',
                                                        borderBottomLeftRadius: '0',
                                                    }}
                                                    onClick={handleDateClick1}
                                                >
                                                    <span className="mdi mdi-calendar" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                width: '25.8%',
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div style={{
                                                width: '40%'
                                            }}>
                                                Periode End <span className="text-danger">*</span>
                                            </div>
                                            <Input
                                                type="select"
                                                value={searchVal}
                                                onChange={(e) => setSearchVal(e.target.value)}
                                            // onKeyDown={handleEnterKeyPress}
                                            />
                                        </div>
                                    </div>
                                    <Button>
                                        <span className="mdi mdi-file-pdf" /> Download Excel
                                    </Button>
                                </div>

                                <TableCustom2
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
