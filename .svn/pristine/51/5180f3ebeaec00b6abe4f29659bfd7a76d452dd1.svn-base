import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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
    Label
} from "reactstrap"
import '../../assets/scss/custom.scss'
import '../../config'
import { useFormik } from "formik"
import * as Yup from "yup"
import Lovv2 from "common/Lovv2"
import { addEmployeeOf, getKeywordListData, getLocationListData, resetMessage } from "store/actions"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { getCandidateLov } from "store/lov/actions"

const AddEmployeeOf = (props) => {

    const dispatch = useDispatch()

    const [appCandidateSearchLov, setAppCandidateSearchLov] = useState("")
    const [appLovParam, setAppLovParam] = useState({})

    const appKeywordListData = useSelector((state) => state.employeeOfMonYeaReducer.respGetKeywordList)
    const appLocationListData = useSelector((state) => state.employeeOfMonYeaReducer.respGetLocationList)

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const formatDate = (date) => {
        if (date) return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        return ''
    }

    const appAddEmployeeValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            memberId: '',
            memberName: '',
            keywordId: '',
            locationId: '',
            filter: 'month',
            award_Date: '',
            description: '',
        },
        validationSchema: Yup.object().shape({
            memberId: Yup.string().required("Wajib diisi"),
            memberName: Yup.string().required("Wajib diisi"),
            filter: Yup.string().required("Wajib diisi"),
            locationId: Yup.string().required("Wajib diisi"),
            award_Date: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppEmployeeOfMonYeaMsg('')
            dispatch(addEmployeeOf({
                filter: values.filter,
                keywordId: values.keywordId,
                locationId: values.locationId,
                award_Date: formatDate(values.award_Date),
                memberId: values.memberId,
                description: values.description
            }))
        }
    })

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
        if (appAddEmployeeValidInput.values.award_Date === null) {
            appAddEmployeeValidInput.setFieldValue('award_Date', '')
        }
        setAppLovParam({
            award_Date: formatDate(appAddEmployeeValidInput.values.award_Date),
            locationId: appAddEmployeeValidInput.values.locationId,
        })
        if (!formatDate(appAddEmployeeValidInput.values.award_Date) && !appAddEmployeeValidInput.values.locationId) {
            appAddEmployeeValidInput.setFieldValue('memberId', '')
        }
    }, [appAddEmployeeValidInput.values])

    const appLovCandidateListColumns = [
        {
            dataField: "memberId",
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
        }
    ]

    const appCallBackEmployee = (row) => {
        appAddEmployeeValidInput.setFieldValue("memberId", row.memberId)
        appAddEmployeeValidInput.setFieldValue("memberName", row.memberName)
    }

    useEffect(() => {
        if (appAddEmployeeValidInput.values.filter === 'year') {
            appAddEmployeeValidInput.setFieldValue('keywordId', appKeywordListData?.data?.year[0].keywordId)
        } else {
            appAddEmployeeValidInput.setFieldValue('keywordId', appKeywordListData?.data?.month[0].keywordId)
        }
    }, [appAddEmployeeValidInput.values.filter])

    useEffect(() => {
        if (!appAddEmployeeValidInput.values.award_Date) {
            setAppCandidateSearchLov('')
        } else {
            setAppCandidateSearchLov("")
        }
    }, [appAddEmployeeValidInput.values.award_Date, props.appAddEmployeeOfMonYea])

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
                            e.preventDefault()
                            appAddEmployeeValidInput.handleSubmit()
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
                                    <div className="col-5">
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
                                    <div className="col-5">
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
                                    <div className="col-5">
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

                                    <div className="col-5">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            Tanggal Penghargaan <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    {
                                        appAddEmployeeValidInput.values.filter === 'month' ? (
                                            <div className="col-8">
                                                <div className="col-6">
                                                    <DatePicker
                                                        className={`form-control ${appAddEmployeeValidInput.touched.award_Date && appAddEmployeeValidInput.errors.award_Date ? 'is-invalid' : ''}`}
                                                        wrapperClassName="customDatePicker"
                                                        selected={appAddEmployeeValidInput.values.award_Date ? new Date(appAddEmployeeValidInput.values.award_Date) : ''}
                                                        onChange={(selectedDate) => {
                                                            appAddEmployeeValidInput.setFieldValue('award_Date', selectedDate)
                                                        }}
                                                        isClearable={appAddEmployeeValidInput.values.award_Date === '' ? false : true}
                                                        dateFormat="yyyy-MM"
                                                        showMonthYearPicker
                                                    />
                                                    {appAddEmployeeValidInput.touched.award_Date && appAddEmployeeValidInput.errors.award_Date && (
                                                        <div id="date-invalid">{appAddEmployeeValidInput.errors.award_Date}</div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="col-8">
                                                <div className="col-6">
                                                    <DatePicker
                                                        className={`form-control ${appAddEmployeeValidInput.touched.award_Date && appAddEmployeeValidInput.errors.award_Date ? 'is-invalid' : ''}`}
                                                        wrapperClassName="customDatePicker"
                                                        selected={appAddEmployeeValidInput.values.award_Date ? new Date(appAddEmployeeValidInput.values.award_Date) : ''}
                                                        onChange={(selectedDate) => {
                                                            debugger
                                                            appAddEmployeeValidInput.setFieldValue('award_Date', selectedDate)
                                                        }}
                                                        isClearable={appAddEmployeeValidInput.values.award_Date === '' ? false : true}
                                                        dateFormat="yyyy-MM"
                                                        showYearPicker
                                                    />
                                                    {appAddEmployeeValidInput.touched.award_Date && appAddEmployeeValidInput.errors.award_Date && (
                                                        <div id="date-invalid">{appAddEmployeeValidInput.errors.award_Date}</div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-5">
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

                                    <div className="col-5">
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
                                    <div className="col-5">
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
        </Container >
    )
}

AddEmployeeOf.propTypes = {
    appAddEmployeeOfMonYea: PropTypes.any,
    setAppEmployeeOfMonYea: PropTypes.any,
    setAppAddEmployeeOfMonYea: PropTypes.any,
    setAppEmployeeOfMonYeaMsg: PropTypes.any,
    appEmployeeMonYeaData: PropTypes.any,
}

export default AddEmployeeOf
