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
import { getCandidateListData, getKeywordListData } from "store/actions";
import DatePicker from "react-datepicker";
import moment from "moment";
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const AddEmployeeOf = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [filterVal, setFilterVal] = useState("")

    const appKeywordListData = useSelector((state) => state.managementSystemReducer.respGetKeywordList);

    const today = format(new Date(), 'yyyy-MM-dd');

    const appAddEmployeeValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            member_id: '',
            keyword_id: '',
            filter: 'month',
            period_from: today,
            period_to: today,
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

    const [appCandidateSearchLov, setAppCandidateSearchLov] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "",
        order: "",
        search:
        {
            period_from: appAddEmployeeValidInput.values.period_from,
            period_to: appAddEmployeeValidInput.values.period_to,
        }
    });

    useEffect(() => {
        dispatch(getKeywordListData())
    }, [])

    // useEffect(() => {
    //     dispatch(getCandidateListData({
    //         limit: 5,
    //         offset: 0,
    //         sort: "",
    //         order: "desc",
    //         search: {
    //             period_from: appAddEmployeeValidInput.values.period_from,
    //             period_to: appAddEmployeeValidInput.values.period_to,
    //         }
    //     }))
    // }, [appAddEmployeeValidInput.values])

    const appLovCandidateListColumns = [
        {
            dataField: "member_id",
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
            dataField: "member_name",
            text: "Employee Name",
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
                                                minDate={appAddEmployeeValidInput.values.period_from ? moment(appAddEmployeeValidInput.values.period_from, 'yyyy-MM').toDate() : null}
                                                selected={appAddEmployeeValidInput.values.period_from ? moment(appAddEmployeeValidInput.values.period_from, 'yyyy-MM').toDate() : null}
                                                onChange={(tglMulai) =>
                                                    dateChanger('from', tglMulai ? moment(tglMulai).format('yyyy-MM') : null)
                                                }
                                                onKeyDown={(e) => {
                                                    e.preventDefault();
                                                }}
                                                isClearable
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
                                                maxDate={appAddEmployeeValidInput.values.period_from ? moment(appAddEmployeeValidInput.values.period_from, 'yyyy-MM').toDate() : null}
                                                selected={appAddEmployeeValidInput.values.period_to ? moment(appAddEmployeeValidInput.values.period_to, 'yyyy-MM').toDate() : null}
                                                onChange={(tglSelesai) =>
                                                    dateChanger('to', tglSelesai ? moment(tglSelesai).format('yyyy-MM') : null)
                                                }
                                                onKeyDown={(e) => {
                                                    e.preventDefault();
                                                }}
                                                isClearable
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
                                        {/* <Lovv2
                                            title="Karyawan"
                                            keyFieldData="member_id"
                                            columns={appLovCandidateListColumns}
                                            getData={getCandidateListData}
                                            pageSize={10}
                                            //callbackFunc={app038p02callBackLovWilayah}
                                            defaultSetInput="member_id"
                                            invalidData={appAddEmployeeValidInput}
                                            fieldValue="member_id"
                                            stateSearchInput={appCandidateSearchLov}
                                            stateSearchInputSet={setAppCandidateSearchLov}
                                            touchedLovField={appAddEmployeeValidInput.touched.member_id}
                                            errorLovField={appAddEmployeeValidInput.errors.member_id}
                                        /> */}
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
                                            Jumlah <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            disabled
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
                                            Deskripsi <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="textarea"
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
