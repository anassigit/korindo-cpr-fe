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
import { deleteEmployeeOf, editEmployeeOf, getCandidateData, getCandidateListData, getKeywordListData, getLocationListData, resetMessage } from "store/actions";
import DatePicker from "react-datepicker";
import moment from "moment";
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { getCandidateLov } from "store/lov/actions";

const EditEmployeeOf = (props) => {

    const dispatch = useDispatch()

    const [lovOneRender, setLovOneRender] = useState(0)

    const [appCandidateSearchLov, setAppCandidateSearchLov] = useState("");
    const [appLovParam, setAppLovParam] = useState({});

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [filterVal, setFilterVal] = useState("")

    const appKeywordListData = useSelector((state) => state.managementSystemReducer.respGetKeywordList);
    const appCandidateData = useSelector((state) => state.managementSystemReducer.respGetCandidate);
    const appLocationListData = useSelector((state) => state.managementSystemReducer.respGetLocationList);

    const lovData = useSelector(state => {
        return state.LovReducer.resp;
    });

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const formatDate = (date) => {
        if (date) {
            // Check if the input date is already in "yyyy-mm-dd" format
            const isAlreadyFormatted = /^\d{4}-\d{2}-\d{2}$/.test(date);

            if (!isAlreadyFormatted) {
                // If not, proceed with formatting
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
        }
        return date; // Return the input date if already formatted or if it's falsy
    };


    const appEditEmployeeValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            member_id: '',
            keyword: '',
            location_id: '',
            flag: '',
            period_from: '',
            period_to: '',
            star: '',
            description: '',
        },
        validationSchema: Yup.object().shape({
            member_id: Yup.string().required("Wajib diisi"),
            keyword: Yup.string().required("Wajib diisi"),
            flag: Yup.string().required("Wajib diisi"),
            period_from: Yup.string().required("Wajib diisi"),
            period_to: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            let dateFrom = formatDate(values.period_from)
            let dateTo = formatDate(values.period_to)

            dispatch(editEmployeeOf({
                award_id: props.appEmployeeOfMonYeaData.id,
                locationId: values.location_id,
                period_from: dateFrom,
                period_to: dateTo,
                member_id: values.member_id,
                description: values.description,
            }))

            props.setAppEmployeeOfMonYea(true)
            props.setAppEditEmployeeOfMonYea(false)
        }
    });

    useEffect(() => {
        if (props.appEditEmployeeOfMonYea) {
            setAppCandidateSearchLov("")
            dispatch(getKeywordListData())
            dispatch(getLocationListData())
            dispatch(getCandidateData({ award_id: props.appEmployeeOfMonYeaData.id }))
            setLovOneRender(0)
            setLoadingSpinner(true)
        } else {
            appEditEmployeeValidInput.resetForm()
            setLovOneRender(0)
        }
    }, [props.appEditEmployeeOfMonYea])

    useEffect(() => {
        appEditEmployeeValidInput.setFieldValue('keyword', appCandidateData?.data?.result.keyword)
        appEditEmployeeValidInput.setFieldValue('flag', appCandidateData?.data?.result.flag)
        appEditEmployeeValidInput.setFieldValue('location_id', appCandidateData?.data?.result.locationId)
        appEditEmployeeValidInput.setFieldValue('period_from', appCandidateData?.data?.result.periodFrom)
        appEditEmployeeValidInput.setFieldValue('period_to', appCandidateData?.data?.result.periodTo)
        appEditEmployeeValidInput.setFieldValue('star', appCandidateData?.data?.result.star)
        appEditEmployeeValidInput.setFieldValue('description', appCandidateData?.data?.result.description)
    }, [appCandidateData])


    useEffect(() => {

        if (appEditEmployeeValidInput.values.period_from === null) {
            appEditEmployeeValidInput.setFieldValue('period_from', '')
        }
        if (appEditEmployeeValidInput.values.period_to === null) {
            appEditEmployeeValidInput.setFieldValue('period_to', '')
        }

        const formattedDateFrom = formatDate(appEditEmployeeValidInput.values.period_from);
        const formattedDateTo = formatDate(appEditEmployeeValidInput.values.period_to);

        setAppLovParam({
            period_from: formattedDateFrom,
            period_to: formattedDateTo,
            locationId: appEditEmployeeValidInput.values.location_id,
        });

        if (formattedDateFrom && formattedDateTo && appEditEmployeeValidInput.values.location_id && !appEditEmployeeValidInput.values.member_id) {
            setAppCandidateSearchLov(appCandidateData?.data?.result.member_id)
            setLovOneRender(0)
        } else {
            setAppCandidateSearchLov("")
        }


    }, [appEditEmployeeValidInput.values.period_from, appEditEmployeeValidInput.values.period_to, appEditEmployeeValidInput.values.location_id]);

    useEffect(() => {
        if (lovData.status === '1' && lovOneRender === 0 && lovData?.data?.lov.length === 1) {
            appEditEmployeeValidInput.setFieldValue('member_id', lovData?.data?.lov[0].iidnrp)
            setAppCandidateSearchLov(lovData?.data?.lov[0].vfullname)
            setLovOneRender(1)
            setLoadingSpinner(false)
        }
    }, [lovData])

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
            text: "Departement Name",
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
            appEditEmployeeValidInput.setFieldValue('period_from', selectedDate);

        } else if (name === 'to') {
            appEditEmployeeValidInput.setFieldValue('period_to', selectedDate);
        }

    };

    const appCallBackEmployee = (row) => {
        appEditEmployeeValidInput.setFieldValue("star", row.star)
    }

    return (
        <Container
            style={{ display: props.appEditEmployeeOfMonYea ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-account-plus"></span> Ubah Penghargaan Karyawan
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appEditEmployeeValidInput.handleSubmit();
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
                                            <label htmlFor="monthRadio1">
                                                <Input
                                                    disabled
                                                    id="monthRadio1"
                                                    type="radio"
                                                    checked={appEditEmployeeValidInput.values.flag === "month"}
                                                    name="searchOption"
                                                    value="month"
                                                    onChange={() =>
                                                        appEditEmployeeValidInput.setFieldValue("flag", "month")
                                                    }
                                                />{" "}
                                                Month
                                            </label>
                                            <label htmlFor="yearRadio1">
                                                <Input
                                                    disabled
                                                    id="yearRadio1"
                                                    type="radio"
                                                    checked={appEditEmployeeValidInput.values.flag === "year"}
                                                    name="searchOption"
                                                    value="year"
                                                    onChange={() => appEditEmployeeValidInput.setFieldValue("flag", "year")}
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
                                            disabled
                                            type="select"
                                            style={{ color: '#495057' }}
                                            value={appEditEmployeeValidInput.values.keyword}
                                            onChange={(e) =>
                                                appEditEmployeeValidInput.setFieldValue("keyword", e.target.value)
                                            }
                                            invalid={
                                                appEditEmployeeValidInput.touched.keyword && appEditEmployeeValidInput.errors.keyword
                                                    ? true : false
                                            }
                                        >
                                            <option value={appEditEmployeeValidInput.values.keyword}>
                                                {appEditEmployeeValidInput.values.keyword}
                                            </option>
                                        </Input>
                                        <FormFeedback type="invalid">{appEditEmployeeValidInput.errors.keyword}</FormFeedback>
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
                                            value={appEditEmployeeValidInput.values.location_id}
                                            onChange={(e) =>
                                                appEditEmployeeValidInput.setFieldValue("location_id", e.target.value)
                                            }
                                            invalid={
                                                appEditEmployeeValidInput.touched.location_id && appEditEmployeeValidInput.errors.location_id
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
                                        <FormFeedback type="invalid">{appEditEmployeeValidInput.errors.location_id}</FormFeedback>
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
                                                className={`form-control ${appEditEmployeeValidInput.touched.period_from && appEditEmployeeValidInput.errors.period_from ? 'is-invalid' : ''}`}
                                                wrapperClassName="customDatePicker"
                                                maxDate={appEditEmployeeValidInput.values.period_to && new Date(appEditEmployeeValidInput.values.period_to)}
                                                selected={appEditEmployeeValidInput.values.period_from ? new Date(appEditEmployeeValidInput.values.period_from) : ''}
                                                onChange={(tglMulai) =>
                                                    dateChanger('from', tglMulai ? tglMulai : null)
                                                }
                                                isClearable={appEditEmployeeValidInput.values.period_from === '' ? false : true}
                                                dateFormat="yyyy-MM-dd"
                                                ariaInvalid={
                                                    appEditEmployeeValidInput.touched.period_from && appEditEmployeeValidInput.errors.period_from
                                                        ? true : false
                                                }
                                            />
                                            {appEditEmployeeValidInput.touched.period_from && appEditEmployeeValidInput.errors.period_from && (
                                                <div id="date-invalid">{appEditEmployeeValidInput.errors.period_from}</div>
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
                                                className={`form-control ${appEditEmployeeValidInput.touched.period_to && appEditEmployeeValidInput.errors.period_to ? 'is-invalid' : ''}`}
                                                wrapperClassName="customDatePicker"
                                                minDate={appEditEmployeeValidInput.values.period_from && new Date(appEditEmployeeValidInput.values.period_from)}
                                                selected={appEditEmployeeValidInput.values.period_to ? new Date(appEditEmployeeValidInput.values.period_to) : ''}
                                                onChange={(tglSelesai) =>
                                                    dateChanger('to', tglSelesai ? tglSelesai : null)
                                                }
                                                isClearable={appEditEmployeeValidInput.values.period_to === '' ? false : true}
                                                dateFormat="yyyy-MM-dd"
                                                ariaInvalid={
                                                    appEditEmployeeValidInput.touched.period_to && appEditEmployeeValidInput.errors.period_to
                                                        ? true : false
                                                }
                                            />
                                            {appEditEmployeeValidInput.touched.period_to && appEditEmployeeValidInput.errors.period_to && (
                                                <div id="date-invalid">{appEditEmployeeValidInput.errors.period_to}</div>
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
                                            invalidData={appEditEmployeeValidInput}
                                            fieldValue="vfullname"
                                            stateSearchInput={appCandidateSearchLov}
                                            stateSearchInputSet={setAppCandidateSearchLov}
                                            touchedLovField={appEditEmployeeValidInput.touched.member_id}
                                            errorLovField={appEditEmployeeValidInput.errors.member_id}
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
                                            value={appEditEmployeeValidInput.values.star}
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
                                            value={appEditEmployeeValidInput.values.description}
                                            onChange={(e) => appEditEmployeeValidInput.setFieldValue('description', e.target.value)}
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
                    props.setAppEditEmployeeOfMonYea(false)

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

EditEmployeeOf.propTypes = {
    appEditEmployeeOfMonYea: PropTypes.any,
    setAppEmployeeOfMonYea: PropTypes.any,
    setAppEditEmployeeOfMonYea: PropTypes.any,
    setAppEmployeeMsg: PropTypes.any,
    appEmployeeOfMonYeaData: PropTypes.any,
}

export default EditEmployeeOf;
