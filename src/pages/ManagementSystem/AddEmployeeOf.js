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
    FormGroup,
    Input,
    Label,
    Spinner
} from "reactstrap";
import '../../assets/scss/custom.scss';
import '../../config';
import { useFormik } from "formik";
import * as Yup from "yup";
import Lovv2 from "common/Lovv2";
import { getCandidateListData, getKeywordListData, resetMessage } from "store/actions";
import DatePicker from "react-datepicker";
import moment from "moment";
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { getCandidateLov } from "store/lov/actions";

const AddEmployeeOf = (props) => {

    const dispatch = useDispatch()

    const [appCandidateSearchLov, setAppCandidateSearchLov] = useState("");
    const [appCandidateSearchLov2, setAppCandidateSearchLov2] = useState("");

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [filterVal, setFilterVal] = useState("")

    const appKeywordListData = useSelector((state) => state.managementSystemReducer.respGetKeywordList);

    useEffect(() => {
        setAppCandidateSearchLov("")
        dispatch(getKeywordListData())
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const today = format(new Date(), 'yyyy-MM-dd');

    const appAddEmployeeValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            member_id: '',
            keyword_id: '',
            filter: 'month',
            period_from: null,
            period_to: null,
            star: '',
            description: '',
        },
        validationSchema: Yup.object().shape({
            member_id: Yup.string().required("Wajib diisi"),
            keyword_id: Yup.string().required("Wajib diisi"),
            filter: Yup.string().required("Wajib diisi"),
            period_from: Yup.string().required("Wajib diisi"),
            period_to: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            // console.log('temptableDetail : ', temptableDetail);
        }
    });


    useEffect(() => {
        if (props.appAddEmployeeOfMonYea === true) {
            setAppCandidateSearchLov("")
        }
    }, [props.appAddEmployeeOfMonYea])


    // useEffect(() => {
    //     const formatDate = (date) => {
    //         if (date) {
    //             const year = date.getFullYear();
    //             const month = String(date.getMonth() + 1).padStart(2, '0');
    //             const day = String(date.getDate()).padStart(2, '0');
    //             return `${year}-${month}-${day}`;
    //         }
    //         return '';
    //     };

    //     const formattedDateFrom = formatDate(appAddEmployeeValidInput.values.period_from);
    //     const formattedDateTo = formatDate(appAddEmployeeValidInput.values.period_to);

    //     setAppCandidateSearchLov({
    //         period_from: formattedDateFrom,
    //         period_to: formattedDateTo,
    //     });
    // }, [appAddEmployeeValidInput.values.period_from, appAddEmployeeValidInput.values.period_to]);

    const appLovCandidateListColumns = [
        {
            dataField: "iidnrp",
            text: "Employee No",
            sort: true,
            // events: {
            //     onClick: (e, column, columnIndex, data, rowIndex) => {
            //         toggleModal(data)
            //     },
            // },
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

        let tempDateTo = ''
        if (name === 'from') {
            appAddEmployeeValidInput.setFieldValue('period_from', selectedDate);

        } else if (name === 'to') {
            appAddEmployeeValidInput.setFieldValue('period_to', selectedDate);
            tempDateTo = selectedDate
        }

        const formatDate = (date) => {
            if (date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
            return '';
        };

        const formattedDateFrom = formatDate(appAddEmployeeValidInput.values.period_from);
        const formattedDateTo = formatDate(appAddEmployeeValidInput.values.period_to);

        debugger
        if(appAddEmployeeValidInput.values.period_from != null && appAddEmployeeValidInput.values.period_to != null ){
            setAppCandidateSearchLov2({
                period_from: formattedDateFrom,
                period_to: formattedDateTo,
            });
    
        }else{
            setAppCandidateSearchLov("")
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
                                            value={appAddEmployeeValidInput.values.keyword_id}
                                            onChange={(e) =>
                                                appAddEmployeeValidInput.setFieldValue("keyword_id", e.target.value)
                                            }
                                        >
                                            {appAddEmployeeValidInput.values.filter === "month" ? (
                                                appKeywordListData?.data?.month.map((item, index) => (
                                                    <option key={index} value={item.keyword_id}>
                                                        {item.keyword_Name}
                                                    </option>
                                                ))
                                            ) : (
                                                appKeywordListData?.data?.year.map((item, index) => (
                                                    <option key={index} value={item.keyword_id}>
                                                        {item.keyword_Name}
                                                    </option>
                                                ))
                                            )}
                                        </Input>
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
                                            {/* <Input
                                                type="date"
                                                onChange={(e) => appAddEmployeeValidInput.setFieldValue('period_from', e.target.value)}
                                            /> */}
                                            <DatePicker
                                                className="form-control"
                                                wrapperClassName="customDatePicker"
                                                maxDate={appAddEmployeeValidInput.values.period_to && new Date(appAddEmployeeValidInput.values.period_to)}
                                                selected={appAddEmployeeValidInput.values.period_from && new Date(appAddEmployeeValidInput.values.period_from)}
                                                onChange={(tglMulai) =>
                                                    dateChanger('from', tglMulai ? tglMulai : null)
                                                }
                                                isClearable
                                                dateFormat="yyyy-MM-dd" // Set the desired date format here
                                            />
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
                                            {/* <Input
                                                type="date"
                                                onChange={(e) => appAddEmployeeValidInput.setFieldValue('period_to', e.target.value)}
                                            /> */}
                                            <DatePicker
                                                className="form-control"
                                                wrapperClassName="customDatePicker"
                                                minDate={appAddEmployeeValidInput.values.period_from && new Date(appAddEmployeeValidInput.values.period_from)}
                                                selected={appAddEmployeeValidInput.values.period_to && new Date(appAddEmployeeValidInput.values.period_to)}
                                                onChange={(tglSelesai) =>
                                                    dateChanger('to', tglSelesai ? tglSelesai : null)
                                                }
                                                isClearable
                                                dateFormat="yyyy-MM-dd" // Set the desired date format here
                                            />
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
    setAppEmployeeMsg: PropTypes.any,
    appYearListData: PropTypes.any,
}

export default AddEmployeeOf;
