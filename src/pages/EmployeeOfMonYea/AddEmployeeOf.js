import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Spinner
} from "reactstrap";
import '../../assets/scss/custom.scss';
import '../../config';
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import Lovv2 from "common/Lovv2";
import { addEmployeeOf, getCandidateListData, getKeywordListData, getLocationListData, resetMessage } from "store/actions";
import DatePicker from "react-datepicker";
import moment from "moment";
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { getCandidateLov } from "store/lov/actions";

const AddEmployeeOf = (props) => {

    const dispatch = useDispatch()

    const [appCandidateSearchLov, setAppCandidateSearchLov] = useState("");
    const [appLovParam, setAppLovParam] = useState({});

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [filterVal, setFilterVal] = useState("")

    const appKeywordListData = useSelector((state) => state.employeeOfMonYeaReducer.respGetKeywordList);
    const appLocationListData = useSelector((state) => state.employeeOfMonYeaReducer.respGetLocationList);

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const formatDate = (date) => {
        if (date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return '';
    };

    const appAddEmployeeValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            memberId: '',
            memberName: '',
            keywordId: '',
            locationId: '',
            filter: 'month',
            periodFrom: '',
            periodTo: '',
            star: '',
            description: '',
        },
        validationSchema: Yup.object().shape({
            memberId: Yup.string().required("Wajib diisi"),
            memberName: Yup.string().required("Wajib diisi"),
            filter: Yup.string().required("Wajib diisi"),
            locationId: Yup.string().required("Wajib diisi"),
            periodFrom: Yup.string().required("Wajib diisi"),
            periodTo: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppEmployeeOfMonYeaMsg('')

            let dateFrom = formatDate(values.periodFrom)
            let dateTo = formatDate(values.periodTo)

            dispatch(addEmployeeOf({
                filter: values.filter,
                keywordId: values.keywordId,
                locationId: values.locationId,
                periodFrom: dateFrom,
                periodTo: dateTo,
                memberId: values.memberId,
                description: values.description,
            }))

        }
    });

    useEffect(() => {
        if (props.appAddEmployeeOfMonYea) {
            setAppCandidateSearchLov("")
            dispatch(getKeywordListData())
            dispatch(getLocationListData())
            appAddEmployeeValidInput.resetForm()
        }
    }, [props.appAddEmployeeOfMonYea])

    useEffect(() => {
        appAddEmployeeValidInput.setFieldValue('keywordId', appKeywordListData?.data?.month[0].keywordId)
    }, [appKeywordListData])

    useEffect(() => {
        appAddEmployeeValidInput.setFieldValue('locationId', appLocationListData?.data?.list[0].locationId)
    }, [appLocationListData])

    useEffect(() => {
        if (appCandidateSearchLov === '') {
            appAddEmployeeValidInput.setFieldValue("memberId", '')
        }
    }, [appCandidateSearchLov])

    useEffect(() => {
        if (props.appAddEmployeeOfMonYea === true) {
            setAppCandidateSearchLov("")
        }
    }, [props.appAddEmployeeOfMonYea])

    useEffect(() => {

        if (appAddEmployeeValidInput.values.periodFrom === null) {
            appAddEmployeeValidInput.setFieldValue('periodFrom', '')
        }
        if (appAddEmployeeValidInput.values.periodTo === null) {
            appAddEmployeeValidInput.setFieldValue('periodTo', '')
        }

        const formattedDateFrom = formatDate(appAddEmployeeValidInput.values.periodFrom);
        const formattedDateTo = formatDate(appAddEmployeeValidInput.values.periodTo)

        setAppLovParam({
            periodFrom: formattedDateFrom,
            periodTo: formattedDateTo,
            locationId: appAddEmployeeValidInput.values.locationId,
        });
        
        if (!formattedDateFrom && !formattedDateTo && !appAddEmployeeValidInput.values.locationId) {
            appAddEmployeeValidInput.setFieldValue('memberId', '')
            // setAppCandidateSearchLov("")
        }

    }, [appAddEmployeeValidInput.values]);

    const appLovCandidateListColumns = [
        {
            dataField: "memberName",
            text: "Employee No",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "memberName",
            text: "Employee Name",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "deptName",
            text: "Department Name",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "star",
            text: "Jumlah",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
    ]

    const dateChanger = (name, selectedDate) => {

        if (name === 'from') {
            appAddEmployeeValidInput.setFieldValue('periodFrom', selectedDate);

        } else if (name === 'to') {
            appAddEmployeeValidInput.setFieldValue('periodTo', selectedDate);
        }

    };

    const appCallBackEmployee = (row) => {
        appAddEmployeeValidInput.setFieldValue("memberId", row.memberId)
        appAddEmployeeValidInput.setFieldValue("memberName", row.memberName)
        appAddEmployeeValidInput.setFieldValue("star", row.star)
    }

    useEffect(() => {
        if (appAddEmployeeValidInput.values.filter === 'year'){
            appAddEmployeeValidInput.setFieldValue('keywordId', appKeywordListData?.data?.year[0].keywordId)
        } else {
            appAddEmployeeValidInput.setFieldValue('keywordId', appKeywordListData?.data?.month[0].keywordId)
        }
    }, [appAddEmployeeValidInput.values.filter])

    useEffect(() => {
        if (!appAddEmployeeValidInput.values.periodFrom || !appAddEmployeeValidInput.values.periodTo) {
            setAppCandidateSearchLov("Mohon isi periode terlebih dahulu...")
        }
    }, [appAddEmployeeValidInput.values.periodFrom, appAddEmployeeValidInput.values.periodTo])

    return (
        <Container
            style={{ display: props.appAddEmployeeOfMonYea ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-account-plus"></span> Tambah Penghargaan Karyawan
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appAddEmployeeValidInput.handleSubmit();
                            return false
                        }}
                    >
                        <FormGroup>
                            <div
                                className="col-4"
                            >
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            Periode/Year <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div
                                        className="col-8"
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: "12px",
                                            }}
                                        >
                                            <label htmlFor="monthRadio">
                                                <Input
                                                    id="monthRadio"
                                                    type="radio"
                                                    checked={appAddEmployeeValidInput.values.filter === "month"}
                                                    name="searchOption"
                                                    value="month"
                                                    onChange={() =>
                                                        appAddEmployeeValidInput.setFieldValue("filter", "month")
                                                    }
                                                />{" "}
                                                Month
                                            </label>
                                            <label htmlFor="yearRadio">
                                                <Input
                                                    id="yearRadio"
                                                    type="radio"
                                                    checked={appAddEmployeeValidInput.values.filter === "year"}
                                                    name="searchOption"
                                                    value="year"
                                                    onChange={() => appAddEmployeeValidInput.setFieldValue("filter", "year")}
                                                />{" "}
                                                Year
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            Keyword <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="select"
                                            value={appAddEmployeeValidInput.values.keywordId}
                                            onChange={(e) =>
                                                appAddEmployeeValidInput.setFieldValue("keywordId", e.target.value)
                                            }
                                            invalid={
                                                appAddEmployeeValidInput.touched.keywordId && appAddEmployeeValidInput.errors.keywordId
                                                    ? true : false
                                            }
                                        >
                                            {appAddEmployeeValidInput.values.filter === "month" ? (
                                                Array.isArray(appKeywordListData?.data?.month) ? appKeywordListData?.data?.month.map((item, index) => (
                                                    <option key={index} value={item.keywordId}>
                                                        {item.keywordName}
                                                    </option>
                                                )) :
                                                (
                                                    <option>

                                                    </option>
                                                )
                                            ) : (
                                                Array.isArray(appKeywordListData?.data?.year) ? appKeywordListData?.data?.year.map((item, index) => (
                                                    <option key={index} value={item.keywordId}>
                                                        {item.keywordName}
                                                    </option>
                                                ))
                                                :
                                                (
                                                    <option>
                                                        
                                                    </option>
                                                )
                                            )}
                                        </Input>
                                        <FormFeedback type="invalid">{appAddEmployeeValidInput.errors.keywordId}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            Lokasi <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="select"
                                            value={appAddEmployeeValidInput.values.locationId}
                                            onChange={(e) =>
                                                appAddEmployeeValidInput.setFieldValue("locationId", e.target.value)
                                            }
                                            invalid={
                                                appAddEmployeeValidInput.touched.locationId && appAddEmployeeValidInput.errors.locationId
                                                    ? true : false
                                            }
                                        >
                                            {
                                                appLocationListData?.data?.list.map((item, index) => (
                                                    <option key={index} value={item.locationId}>
                                                        {item.locationName}
                                                    </option>
                                                ))
                                            }
                                        </Input>
                                        <FormFeedback type="invalid">{appAddEmployeeValidInput.errors.locationId}</FormFeedback>
                                    </div>
                                </div>

                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            Periode From <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <div className="col-6">
                                            <DatePicker
                                                className={`form-control ${appAddEmployeeValidInput.touched.periodFrom && appAddEmployeeValidInput.errors.periodFrom ? 'is-invalid' : ''}`}
                                                wrapperClassName="customDatePicker"
                                                maxDate={appAddEmployeeValidInput.values.periodTo && new Date(appAddEmployeeValidInput.values.periodTo)}
                                                selected={appAddEmployeeValidInput.values.periodFrom ? new Date(appAddEmployeeValidInput.values.periodFrom) : ''}
                                                onChange={(tglMulai) =>
                                                    dateChanger('from', tglMulai ? tglMulai : null)
                                                }
                                                isClearable={appAddEmployeeValidInput.values.periodFrom === '' ? false : true}
                                                dateFormat="yyyy-MM-dd"
                                                ariaInvalid={
                                                    appAddEmployeeValidInput.touched.periodFrom && appAddEmployeeValidInput.errors.periodFrom
                                                        ? true : false
                                                }
                                            />
                                            {appAddEmployeeValidInput.touched.periodFrom && appAddEmployeeValidInput.errors.periodFrom && (
                                                <div id="date-invalid">{appAddEmployeeValidInput.errors.periodFrom}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            Periode To <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <div className="col-6">
                                            <DatePicker
                                                className={`form-control ${appAddEmployeeValidInput.touched.periodTo && appAddEmployeeValidInput.errors.periodTo ? 'is-invalid' : ''}`}
                                                wrapperClassName="customDatePicker"
                                                minDate={appAddEmployeeValidInput.values.periodFrom && new Date(appAddEmployeeValidInput.values.periodFrom)}
                                                selected={appAddEmployeeValidInput.values.periodTo ? new Date(appAddEmployeeValidInput.values.periodTo) : ''}
                                                onChange={(tglSelesai) =>
                                                    dateChanger('to', tglSelesai ? tglSelesai : null)
                                                }
                                                isClearable={appAddEmployeeValidInput.values.periodTo === '' ? false : true}
                                                dateFormat="yyyy-MM-dd"
                                                ariaInvalid={
                                                    appAddEmployeeValidInput.touched.periodTo && appAddEmployeeValidInput.errors.periodTo
                                                        ? true : false
                                                }
                                            />
                                            {appAddEmployeeValidInput.touched.periodTo && appAddEmployeeValidInput.errors.periodTo && (
                                                <div id="date-invalid">{appAddEmployeeValidInput.errors.periodTo}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            Nama Karyawan <span className="text-danger"> *</span>
                                        </Label>
                                    </div>

                                    <div className="col-8">
                                        <Lovv2
                                            title="Karyawan"
                                            keyFieldData="memberId"
                                            columns={appLovCandidateListColumns}
                                            getData={getCandidateLov}
                                            pageSize={10}
                                            callbackFunc={appCallBackEmployee}
                                            defaultSetInput="memberName"
                                            invalidData={appAddEmployeeValidInput}
                                            fieldValue="memberName"
                                            stateSearchInput={appCandidateSearchLov}
                                            stateSearchInputSet={setAppCandidateSearchLov}
                                            touchedLovField={appAddEmployeeValidInput.touched.memberName}
                                            errorLovField={appAddEmployeeValidInput.errors.memberName}
                                            pParam={appLovParam}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            Jumlah Bintang <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            disabled
                                            value={appAddEmployeeValidInput.values.star}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            Deskripsi
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="textarea"
                                            value={appAddEmployeeValidInput.values.description}
                                            onChange={(e) => appAddEmployeeValidInput.setFieldValue('description', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >
                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Button
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
            <Button
                className="btn btn-danger my-3"
                onClick={() => {
                    props.setAppEmployeeOfMonYea(true)
                    props.setAppAddEmployeeOfMonYea(false)
                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
            <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
            </div>
        </Container >
    );
};

AddEmployeeOf.propTypes = {
    appAddEmployeeOfMonYea: PropTypes.any,
    setAppEmployeeOfMonYea: PropTypes.any,
    setAppAddEmployeeOfMonYea: PropTypes.any,
    setAppEmployeeOfMonYeaMsg: PropTypes.any,
}

export default AddEmployeeOf;
