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
            member_id: '',
            keyword: '',
            location_id: '',
            filter: 'month',
            period_from: '',
            period_to: '',
            star: '',
            description: '',
        },
        validationSchema: Yup.object().shape({
            member_id: Yup.string().required("Wajib diisi"),
            filter: Yup.string().required("Wajib diisi"),
            location_id: Yup.string().required("Wajib diisi"),
            period_from: Yup.string().required("Wajib diisi"),
            period_to: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppEmployeeOfMonYeaMsg('')

            let dateFrom = formatDate(values.period_from)
            let dateTo = formatDate(values.period_to)

            dispatch(addEmployeeOf({
                filter: values.filter,
                keyword_id: values.keyword,
                locationId: values.location_id,
                period_from: dateFrom,
                period_to: dateTo,
                iidnrp: values.member_id,
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
        appAddEmployeeValidInput.setFieldValue('keyword', appKeywordListData?.data?.month[0].keyword_Id)
    }, [appKeywordListData])

    useEffect(() => {
        appAddEmployeeValidInput.setFieldValue('location_id', appLocationListData?.data?.list[0].locationId)
    }, [appLocationListData])

    useEffect(() => {
        if (appCandidateSearchLov === '') {
            appAddEmployeeValidInput.setFieldValue("member_id", '')
        }
    }, [appCandidateSearchLov])

    useEffect(() => {
        if (props.appAddEmployeeOfMonYea === true) {
            setAppCandidateSearchLov("")
        }
    }, [props.appAddEmployeeOfMonYea])

    useEffect(() => {

        if (appAddEmployeeValidInput.values.period_from === null) {
            appAddEmployeeValidInput.setFieldValue('period_from', '')
        }
        if (appAddEmployeeValidInput.values.period_to === null) {
            appAddEmployeeValidInput.setFieldValue('period_to', '')
        }

        const formattedDateFrom = formatDate(appAddEmployeeValidInput.values.period_from);
        const formattedDateTo = formatDate(appAddEmployeeValidInput.values.period_to)

        setAppLovParam({
            period_from: formattedDateFrom,
            period_to: formattedDateTo,
            locationId: appAddEmployeeValidInput.values.location_id,
        });
        
        if (!formattedDateFrom && !formattedDateTo && !appAddEmployeeValidInput.values.location_id) {
            appAddEmployeeValidInput.setFieldValue('member_id', '')
            setAppCandidateSearchLov("")
        }

    }, [appAddEmployeeValidInput.values]);

    const appLovCandidateListColumns = [
        {
            dataField: "iidnrp",
            text: "Employee No",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "vfullname",
            text: "Employee Name",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "dept_nm",
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
            appAddEmployeeValidInput.setFieldValue('period_from', selectedDate);

        } else if (name === 'to') {
            appAddEmployeeValidInput.setFieldValue('period_to', selectedDate);
        }

    };

    const appCallBackEmployee = (row) => {
        appAddEmployeeValidInput.setFieldValue("member_id", row.iidnrp)
        appAddEmployeeValidInput.setFieldValue("star", row.star)
    }

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
                                            value={appAddEmployeeValidInput.values.keyword}
                                            onChange={(e) =>
                                                appAddEmployeeValidInput.setFieldValue("keyword", e.target.value)
                                            }
                                            invalid={
                                                appAddEmployeeValidInput.touched.keyword && appAddEmployeeValidInput.errors.keyword
                                                    ? true : false
                                            }
                                        >
                                            {appAddEmployeeValidInput.values.filter === "month" ? (
                                                Array.isArray(appKeywordListData?.data?.month) ? appKeywordListData?.data?.month.map((item, index) => (
                                                    <option key={index} value={item.keyword_Id}>
                                                        {item.keyword_Name}
                                                    </option>
                                                )) :
                                                (
                                                    <option>

                                                    </option>
                                                )
                                            ) : (
                                                Array.isArray(appKeywordListData?.data?.year) ? appKeywordListData?.data?.year.map((item, index) => (
                                                    <option key={index} value={item.keyword}>
                                                        {item.keyword_Name}
                                                    </option>
                                                ))
                                                :
                                                (
                                                    <option>
                                                        
                                                    </option>
                                                )
                                            )}
                                        </Input>
                                        <FormFeedback type="invalid">{appAddEmployeeValidInput.errors.keyword}</FormFeedback>
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
                                            value={appAddEmployeeValidInput.values.location_id}
                                            onChange={(e) =>
                                                appAddEmployeeValidInput.setFieldValue("location_id", e.target.value)
                                            }
                                            invalid={
                                                appAddEmployeeValidInput.touched.location_id && appAddEmployeeValidInput.errors.location_id
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
                                        <FormFeedback type="invalid">{appAddEmployeeValidInput.errors.location_id}</FormFeedback>
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
                                                className={`form-control ${appAddEmployeeValidInput.touched.period_from && appAddEmployeeValidInput.errors.period_from ? 'is-invalid' : ''}`}
                                                wrapperClassName="customDatePicker"
                                                maxDate={appAddEmployeeValidInput.values.period_to && new Date(appAddEmployeeValidInput.values.period_to)}
                                                selected={appAddEmployeeValidInput.values.period_from ? new Date(appAddEmployeeValidInput.values.period_from) : ''}
                                                onChange={(tglMulai) =>
                                                    dateChanger('from', tglMulai ? tglMulai : null)
                                                }
                                                isClearable={appAddEmployeeValidInput.values.period_from === '' ? false : true}
                                                dateFormat="yyyy-MM-dd"
                                                ariaInvalid={
                                                    appAddEmployeeValidInput.touched.period_from && appAddEmployeeValidInput.errors.period_from
                                                        ? true : false
                                                }
                                            />
                                            {appAddEmployeeValidInput.touched.period_from && appAddEmployeeValidInput.errors.period_from && (
                                                <div id="date-invalid">{appAddEmployeeValidInput.errors.period_from}</div>
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
                                                className={`form-control ${appAddEmployeeValidInput.touched.period_to && appAddEmployeeValidInput.errors.period_to ? 'is-invalid' : ''}`}
                                                wrapperClassName="customDatePicker"
                                                minDate={appAddEmployeeValidInput.values.period_from && new Date(appAddEmployeeValidInput.values.period_from)}
                                                selected={appAddEmployeeValidInput.values.period_to ? new Date(appAddEmployeeValidInput.values.period_to) : ''}
                                                onChange={(tglSelesai) =>
                                                    dateChanger('to', tglSelesai ? tglSelesai : null)
                                                }
                                                isClearable={appAddEmployeeValidInput.values.period_to === '' ? false : true}
                                                dateFormat="yyyy-MM-dd"
                                                ariaInvalid={
                                                    appAddEmployeeValidInput.touched.period_to && appAddEmployeeValidInput.errors.period_to
                                                        ? true : false
                                                }
                                            />
                                            {appAddEmployeeValidInput.touched.period_to && appAddEmployeeValidInput.errors.period_to && (
                                                <div id="date-invalid">{appAddEmployeeValidInput.errors.period_to}</div>
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
                                            keyFieldData="iidnrp"
                                            columns={appLovCandidateListColumns}
                                            getData={getCandidateLov}
                                            pageSize={10}
                                            callbackFunc={appCallBackEmployee}
                                            defaultSetInput="vfullname"
                                            invalidData={appAddEmployeeValidInput}
                                            fieldValue="vfullname"
                                            stateSearchInput={appCandidateSearchLov}
                                            stateSearchInputSet={setAppCandidateSearchLov}
                                            touchedLovField={appAddEmployeeValidInput.touched.member_id}
                                            errorLovField={appAddEmployeeValidInput.errors.member_id}
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
