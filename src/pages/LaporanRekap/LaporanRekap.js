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
    UncontrolledAlert,
    UncontrolledTooltip
} from "reactstrap";
import '../../assets/scss/custom.scss';
import '../../config';
import { downloadRekapAction, getDeptRekap, getLaporanRekap, getLocationRekap, getMemberListLov, resetMessage } from "store/actions";
import TableCustom from "common/TableCustom";
import TableCustom2 from "common/TableCustom2";
import DatePicker from "react-datepicker";
import ModalDept from "./ModalDept";
import Lovv2 from "common/Lovv2";
import { downloadRekap } from "helpers/backend_helper";

const LaporanRekap = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [modal, setModal] = useState()

    const orgRef = useRef(null);

    const dateRef1 = useRef(null);
    const dateRef2 = useRef(null);

    const [searchClick, setSearchClick] = useState(false)

    const [appLaporanRekapMsg, setAppLaporanRekapMsg] = useState('')

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [tempOrgCd, setTempOrgCd] = useState('')

    const [orgCd, setOrgCd] = useState('')
    const [memberId, setMemberId] = useState('')
    const [locationId, setLocationId] = useState('')

    const [appCandidateSearchLov, setAppCandidateSearchLov] = useState("");
    const [appLovParam, setAppLovParam] = useState({
        orgCd: ''
    });

    const [appLaporanRekapPage, setAppLaporanRekapPage] = useState(true)
    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const appLaporanRekap = useSelector((state) => {
        return state.laporanRekapReducer.respGetLaporanRekap
    })

    const appLocationRekap = useSelector((state) => {
        return state.laporanRekapReducer.respGetLocationRekap
    })

    const downloadStatus = useSelector((state) => {
        return state.laporanRekapReducer.respDownload
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


    const [appLaporanRekapTabelSearch, setAppLaporanRekapTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search:
        {
            periodFrom: startDate,
            periodTo: endDate,
            memberId: memberId,
            locationId: locationId,
            orgCd: orgCd,
        }
    })

    const appLaporanRekapColumn = [
        {
            dataField: "num",
            text: "Rank",
            headerStyle: { textAlign: 'center' },
            style: { textAlign: 'center' },
        },
        {
            dataField: "deptName",
            text: "Divisi",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "positionName",
            text: "Jabatan",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "memberId",
            text: "Nik",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "memberName",
            text: "Nama",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "age",
            text: "Usia",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "gender",
            text: "Jenis Kelamin",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "recvStarCount",
            text: "Jumlah Aktual Bintang Yang Diterima",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "recvStar",
            text: "Nilai Poin",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "sendStar",
            text: "Bintang Terkirim",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "strDeptRate",
            text: "Partisipasi Div",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "deptRate",
            text: "% Partisipan Div",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "totalScore",
            text: "Total Poin",
            headerStyle: { textAlign: 'center' },
        },
    ]

    const appLovCandidateListColumns = [
        {
            dataField: "memberId",
            text: "Nik",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "memberName",
            text: "Nama Karyawan",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "deptName",
            text: "Departemen",
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "positionName",
            text: "Jabatan",
            headerStyle: { textAlign: 'center' },
        },
    ]

    useEffect(() => {
        setLoadingSpinner(true)
        dispatch(getLocationRekap())
        dispatch(getDeptRekap())
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        if (appLaporanRekap.status === '0' && searchClick) {
            setAppLaporanRekapMsg(appLaporanRekap)
        } else if (appLaporanRekap.status === '1' && searchClick) {
            setAppLaporanRekapMsg('')
        }
        setLoadingSpinner(false)
    }, [appLaporanRekap])

    useEffect(() => {
        if (downloadStatus === 'Success') {
            setLoadingSpinner(false)
        }
    }, [downloadStatus])

    useEffect(() => {
        if (appLaporanRekapTabelSearch) {
            setLoadingSpinner(true)
        }
    }, [appLaporanRekapTabelSearch])

    useEffect(() => {
        let locationData = appLocationRekap?.data?.list
        if (locationData) {
            if (locationData.length > 0) {
                setLocationId(locationData[0].locationId)
                setAppLaporanRekapTabelSearch((prevState) => {
                    return ({
                        ...prevState,
                        search: {
                            ...prevState.search,
                            locationId: locationData[0].locationId
                        }
                    })
                })
            }
        }
    }, [appLocationRekap])

    const handleDateClick1 = () => {
        dateRef1.current.setOpen(true)
    }

    const handleDateClick2 = () => {
        dateRef2.current.setOpen(true)
    }

    const toggle = () => {
        setModal(!modal)
    }

    const toggleApply = () => {
        setModal(!modal)
        setOrgCd(tempOrgCd)
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

    const appCallBackEmployee = (row) => {
        setMemberId(row.memberId)
    }

    useEffect(() => {
        setAppCandidateSearchLov('')
        setAppLovParam({
            orgCd: orgCd
        })
    }, [orgCd])

    // const handleOrgRef = () => {
    //     orgRef.current.click()
    // }

    console.log(appLaporanRekapMsg)

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appLaporanRekapMsg !== "" ? <UncontrolledAlert toggle={() => { setAppLaporanRekapMsg("") }} color={"danger"}>
                        {typeof appLaporanRekapMsg == 'string' ? null : appLaporanRekapMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appLaporanRekapPage ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-file-chart"></span> Laporan Rekap
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
                                            value={locationId}
                                            onChange={(e) => setLocationId(e.target.value)}
                                        // onKeyDown={handleEnterKeyPress}
                                        >
                                            {
                                                appLocationRekap?.data?.list && appLocationRekap?.data?.list.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.locationId}
                                                        >
                                                            {item.locationName}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </Input>
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
                                        <div style={{ width: '100%', display: 'flex' }}>
                                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                <Input
                                                    disabled
                                                    ref={orgRef}
                                                    style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0', marginBottom: 0 }}
                                                    type="search"
                                                    value={orgCd}
                                                />
                                                {
                                                    orgCd && (
                                                        <a
                                                            className="mdi mdi-close text-danger"
                                                            style={{ position: 'absolute', right: 8, }}
                                                            onClick={() => setOrgCd('')}
                                                        />
                                                    )
                                                }
                                            </div>
                                            <Button
                                                onClick={toggle}
                                                style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                            >
                                                <span className="fas fa-search" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div
                                        className="col-2"
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "18px",
                                            alignItems: "center",
                                        }}
                                    >
                                        Nik
                                        <div style={{ width: '70%' }}>
                                            <Lovv2
                                                title="Karyawan"
                                                sortBy="memberName"
                                                keyFieldData="memberId"
                                                columns={appLovCandidateListColumns}
                                                getData={getMemberListLov}
                                                pageSize={10}
                                                callbackFunc={appCallBackEmployee}
                                                defaultSetInput="memberId"
                                                // invalidData={appAddEmployeeValidInput}
                                                fieldValue="memberId"
                                                stateSearchInput={appCandidateSearchLov}
                                                stateSearchInputSet={setAppCandidateSearchLov}
                                                // touchedLovField={appAddEmployeeValidInput.touched.memberName}
                                                // errorLovField={appAddEmployeeValidInput.errors.memberName}
                                                pParam={appLovParam}
                                            />
                                        </div>
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
                                            setAppLaporanRekapTabelSearch({
                                                page: 1,
                                                limit: 10,
                                                offset: 0,
                                                sort: "",
                                                order: "",
                                                search:
                                                {
                                                    periodFrom: formatDate(startDate),
                                                    periodTo: formatDate(endDate),
                                                    memberId: memberId,
                                                    locationId: locationId,
                                                    orgCd: orgCd,
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
                                                        "fileName": 'Laporan Rekap',
                                                    };
                                                    dispatch(downloadRekapAction(indexed_array));
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                            }}
                                    >
                                        <span className="mdi mdi-file-pdf" /> Download Excel
                                    </Button>
                                </div>

                                <TableCustom2
                                    keyField={(row) => `${row.num}`}
                                    columns={appLaporanRekapColumn}
                                    redukResponse={appLaporanRekap}
                                    appdata={appLaporanRekap?.data != null && appLaporanRekap?.data.list ? appLaporanRekap?.data.list : []}
                                    appdataTotal={appLaporanRekap?.data != null ? appLaporanRekap?.data.count : 0}
                                    searchSet={setAppLaporanRekapTabelSearch}
                                    searchGet={appLaporanRekapTabelSearch}
                                    redukCall={getLaporanRekap}
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

                    <ModalDept
                        modal={modal}
                        toggle={toggle}
                        toggleApply={toggleApply}
                        orgCd={orgCd}
                        setOrgCd={setOrgCd}
                        tempOrgCd={tempOrgCd}
                        setTempOrgCd={setTempOrgCd}
                    />
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

export default LaporanRekap;
