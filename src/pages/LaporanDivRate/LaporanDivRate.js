import Lovv2 from "common/Lovv2";
import RootPageCustom from "common/RootPageCustom";
import TableCustom2 from "common/TableCustom2";
import React, { useEffect, useRef, useState } from "react";
import { ReactSession } from 'react-client-session';
import DatePicker from "react-datepicker";
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
    UncontrolledAlert
} from "reactstrap";
import { downloadDivRateAction, getDeptDivRate, getLaporanDivRate, getLocationDivRate, getMemberListLov, resetMessage } from "store/actions";
import '../../assets/scss/custom.scss';
import '../../config';

const LaporanDivRate = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const orgRef = useRef(null);

    const dateRef1 = useRef(null);
    const dateRef2 = useRef(null);

    const [searchClick, setSearchClick] = useState(false)

    const [appLaporanDivRateMsg, setAppLaporanDivRateMsg] = useState('')

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [appCandidateSearchLov, setAppCandidateSearchLov] = useState("");
    const [appLovParam, setAppLovParam] = useState({
        orgCd: ''
    });

    const [appLaporanDivRatePage, setAppLaporanDivRatePage] = useState(true)
    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const appLaporanDivRate = useSelector((state) => {
        return state.laporanDivRateReducer.respGetLaporanDivRate
    })

    const appLocationDivRate = useSelector((state) => {
        return state.laporanDivRateReducer.respGetLocationDivRate
    })

    const downloadStatus = useSelector((state) => {
        return state.laporanDivRateReducer.respDownload
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


    const [appLaporanDivRateTabelSearch, setAppLaporanDivRateTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search:
        {
            periodFrom: startDate,
            periodTo: endDate,



        }
    })

    const appLaporanDivRateColumn = [
        {
            dataField: "orgCd",
            text: "Div",
            hidden: true,
            headerStyle: { textAlign: 'center', },
        },
        {
            dataField: "deptName",
            text: "Div",
            headerStyle: { textAlign: 'center', },
        },
        {
            dataField: "strDeptRate",
            text: "Partisipasi Div",
            headerStyle: { textAlign: 'center', },
        },
        {
            dataField: "deptRate",
            text: "% Partisipan Div",
            headerStyle: { textAlign: 'center', },
        },
    ]

    useEffect(() => {
        setLoadingSpinner(true)
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        if (appLaporanDivRate.status === '0' && searchClick) {
            setAppLaporanDivRateMsg(appLaporanDivRate)
        } else if (appLaporanDivRate.status === '1' && searchClick) {
            setAppLaporanDivRateMsg('')
        }
        setLoadingSpinner(false)
    }, [appLaporanDivRate])

    useEffect(() => {
        if (downloadStatus === 'Success') {
            setLoadingSpinner(false)
        }
    }, [downloadStatus])

    useEffect(() => {
        if (appLaporanDivRateTabelSearch) {
            setLoadingSpinner(true)
        }
    }, [appLaporanDivRateTabelSearch])

    const handleDateClick1 = () => {
        dateRef1.current.setOpen(true)
    }

    const handleDateClick2 = () => {
        dateRef2.current.setOpen(true)
    }

    const dateChanger = (name, selectedDate) => {

        if (name === 'from') {
            setStartDate(selectedDate)

        } else if (name === 'to') {
            setEndDate(selectedDate)
        }
    };

    const formatDate = (date) => {
        if (date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return '';
    };
    // const handleOrgRef = () => {
    //     orgRef.current.click()
    // }

    console.log(appLaporanDivRateMsg)

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appLaporanDivRateMsg !== "" ? <UncontrolledAlert toggle={() => { setAppLaporanDivRateMsg("") }} color={"danger"}>
                        {typeof appLaporanDivRateMsg == 'string' ? null : appLaporanDivRateMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appLaporanDivRatePage ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-file-chart"></span> Laporan All Data
                            </CardHeader>
                            <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>

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
                                                    maxDate={endDate && new Date(endDate)}
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
                                                width: '30%'
                                            }}>
                                                Periode End <span className="text-danger">*</span>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <DatePicker
                                                    ref={dateRef2}
                                                    className={`form-control date-with-button`}
                                                    dateFormat="yyyy-MM-dd"
                                                    minDate={startDate && new Date(startDate)}
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
                                                    selected={endDate}
                                                    onChange={(tglSelesai) =>
                                                        dateChanger('to', tglSelesai ? tglSelesai : null)
                                                    }
                                                />

                                                <Button
                                                    style={{
                                                        borderTopLeftRadius: '0',
                                                        borderBottomLeftRadius: '0',
                                                    }}
                                                    onClick={handleDateClick2}
                                                >
                                                    <span className="mdi mdi-calendar" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="pb-2"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Button
                                        onClick={() => {
                                            setSearchClick(true)
                                            setAppLaporanDivRateTabelSearch({
                                                page: 1,
                                                limit: 10,
                                                offset: 0,
                                                sort: "",
                                                order: "",
                                                search:
                                                {
                                                    periodFrom: formatDate(startDate),
                                                    periodTo: formatDate(endDate),
                                                }
                                            })
                                        }}
                                    >
                                        <span className="fas fa-search" /> Search
                                    </Button>

                                    <Button
                                        disabled={!(startDate && endDate)}
                                        style={{
                                            backgroundColor: startDate && endDate ? null : "#A9A9A9",
                                            borderColor: startDate && endDate ? null : "#A9A9A9",
                                        }}
                                        onClick={
                                            async () => {
                                                setLoadingSpinner(true)
                                                try {
                                                    var indexed_array = {
                                                        "periodFrom": formatDate(startDate),
                                                        "periodTo": formatDate(endDate),
                                                        "locationId": locationId,
                                                        "orgCd": orgCd,
                                                        "memberId": memberId,
                                                        "fileName": 'Laporan All Data',
                                                    };
                                                    dispatch(downloadDivRateAction(indexed_array));
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                            }}
                                    >
                                        <span className="mdi mdi-file-pdf" /> Download Excel
                                    </Button>
                                </div>

                                <TableCustom2
                                    keyField={(row) => `${row.fromMemberId}-${row.toMemberId}`}
                                    columns={appLaporanDivRateColumn}
                                    redukResponse={appLaporanDivRate}
                                    appdata={appLaporanDivRate?.data != null && appLaporanDivRate?.data.list ? appLaporanDivRate?.data.list : []}
                                    appdataTotal={appLaporanDivRate?.data != null ? appLaporanDivRate?.data.count : 0}
                                    searchSet={setAppLaporanDivRateTabelSearch}
                                    searchGet={appLaporanDivRateTabelSearch}
                                    redukCall={getLaporanDivRate}
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

                </React.Fragment>
            }
        />
    );
};

export default LaporanDivRate;
