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
    Label,
    Spinner
} from "reactstrap"
import '../../assets/scss/custom.scss'
import '../../config'
import { ErrorMessage, useFormik } from "formik"
import * as Yup from "yup"
import Lovv2 from "common/Lovv2"
import { deleteEmployeeOf, editEmployeeOf, getCandidateData, getCandidateListData, getKeywordListData, getLocationListData, resetMessage } from "store/actions"
import DatePicker from "react-datepicker"
import moment from "moment"
import { format } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css"
import { getCandidateLov } from "store/lov/actions"

const EditEmployeeOf = (props) => {

    const dispatch = useDispatch()

    const [lovOneRender, setLovOneRender] = useState(0)

    const [appCandidateSearchLov, setAppCandidateSearchLov] = useState("")
    const [appLovParam, setAppLovParam] = useState({})

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [filterVal, setFilterVal] = useState("")

    const appCandidateData = useSelector((state) => state.employeeOfMonYeaReducer.respGetCandidate)
    const appLocationListData = useSelector((state) => state.employeeOfMonYeaReducer.respGetLocationList)

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const formatDate = (date) => {
        if (date) if (!/^\d{4}-\d{2}$/.test(date)) return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        return date
    }

    const appEditEmployeeValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            memberId: '',
            keywordName: '',
            locationId: '',
            flag: '',
            award_Date: '',
            star: '',
            description: '',
            memberName: '',
            score: '',
            view: '',
        },
        validationSchema: Yup.object().shape({
            memberId: Yup.string().required("Wajib diisi"),
            keywordName: Yup.string().required("Wajib diisi"),
            flag: Yup.string().required("Wajib diisi"),
            award_Date: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppEmployeeOfMonYeaMsg("")
            let award_Date = formatDate(values.award_Date)
            dispatch(editEmployeeOf({
                awardId: props.appEmployeeOfMonYeaData.awardId,
                locationId: values.locationId,
                award_Date: award_Date,
                view: values.view,
                memberId: values.memberId,
                description: values.description,
            }))
            props.setAppEmployeeOfMonYeaMsg('')
        }
    })

    useEffect(() => {
        if (props.appEditEmployeeOfMonYea) {
            setAppCandidateSearchLov("")
            dispatch(getKeywordListData())
            dispatch(getLocationListData())
            dispatch(getCandidateData({ awardId: props.appEmployeeOfMonYeaData.awardId }))
            setLovOneRender(0)
            setLoadingSpinner(true)
        } else {
            appEditEmployeeValidInput.resetForm()
            setLovOneRender(0)
        }
    }, [props.appEditEmployeeOfMonYea])

    useEffect(() => {
        if (appCandidateData.status === '1') {
            appEditEmployeeValidInput.setFieldValue('memberId', appCandidateData?.data?.result.memberId)
            appEditEmployeeValidInput.setFieldValue('keywordName', appCandidateData?.data?.result.keywordName)
            appEditEmployeeValidInput.setFieldValue('flag', appCandidateData?.data?.result.flag)
            appEditEmployeeValidInput.setFieldValue('locationId', appCandidateData?.data?.result.locationId)
            appEditEmployeeValidInput.setFieldValue('award_Date', appCandidateData?.data?.result.award_Date)
            // appEditEmployeeValidInput.setFieldValue('star', appCandidateData?.data?.result.star)
            appEditEmployeeValidInput.setFieldValue('description', appCandidateData?.data?.result.description)
            appEditEmployeeValidInput.setFieldValue('score', appCandidateData?.data?.result.score)
            appEditEmployeeValidInput.setFieldValue('view', appCandidateData?.data?.result.view)
            setAppCandidateSearchLov(appCandidateData?.data?.result.memberName)
            setLoadingSpinner(false)
        }

    }, [appCandidateData])

    useEffect(() => {

        if (appEditEmployeeValidInput.values.award_Date === null) {
            appEditEmployeeValidInput.setFieldValue('award_Date', '')
        }

        const formattedAward_Date = formatDate(appEditEmployeeValidInput.values.award_Date)

        setAppLovParam({
            award_Date: formattedAward_Date,
            locationId: appEditEmployeeValidInput.values.locationId,
        })

        if (!formattedAward_Date || !appEditEmployeeValidInput.values.locationId) {
            appEditEmployeeValidInput.setFieldValue('memberId', '')
            // setAppCandidateSearchLov("")
        }

    }, [appEditEmployeeValidInput.values.award_Date, appEditEmployeeValidInput.values.locationId])


    const appLovCandidateListColumns = [
        {
            dataField: "memberId",
            text: "Nik",
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
        // {
        //     dataField: "star",
        //     text: "Jumlah",
        //     sort: true,
        //     headerStyle: { textAlign: 'center' },
        // },
    ]

    const appCallBackEmployee = (row) => {
        appEditEmployeeValidInput.setFieldValue("memberId", row.memberId)
        // appEditEmployeeValidInput.setFieldValue("star", row.star)
    }

    useEffect(() => {
        if (!appEditEmployeeValidInput.values.award_Date) {
            setAppCandidateSearchLov("")
        }
    }, [appEditEmployeeValidInput.values.award_Date])

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
                            e.preventDefault()
                            appEditEmployeeValidInput.handleSubmit()
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
                                            disabled
                                            type="select"
                                            style={{ color: '#495057' }}
                                            value={appEditEmployeeValidInput.values.keywordName}
                                            onChange={(e) =>
                                                appEditEmployeeValidInput.setFieldValue("keywordName", e.target.value)
                                            }
                                            invalid={
                                                appEditEmployeeValidInput.touched.keywordName && appEditEmployeeValidInput.errors.keywordName
                                                    ? true : false
                                            }
                                        >
                                            <option value={appEditEmployeeValidInput.values.keywordName}>
                                                {appEditEmployeeValidInput.values.keywordName}
                                            </option>
                                        </Input>
                                        <FormFeedback type="invalid">{appEditEmployeeValidInput.errors.keywordName}</FormFeedback>
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
                                            value={appEditEmployeeValidInput.values.locationId}
                                            onChange={(e) => {
                                                appEditEmployeeValidInput.setFieldValue("locationId", e.target.value)
                                                appEditEmployeeValidInput.setFieldValue("memberId", '')
                                                appEditEmployeeValidInput.setFieldValue("memberName", '')
                                                appEditEmployeeValidInput.setFieldValue("star", '')
                                                setAppCandidateSearchLov("")
                                            }}
                                            invalid={
                                                appEditEmployeeValidInput.touched.locationId && appEditEmployeeValidInput.errors.locationId
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
                                        <FormFeedback type="invalid">{appEditEmployeeValidInput.errors.locationId}</FormFeedback>
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
                                    <div className="col-8">
                                        <div className="col-6">
                                            <DatePicker
                                                className={`form-control ${appEditEmployeeValidInput.touched.award_Date && appEditEmployeeValidInput.errors.award_Date ? 'is-invalid' : ''}`}
                                                wrapperClassName="customDatePicker"
                                                selected={appEditEmployeeValidInput.values.award_Date ? new Date(appEditEmployeeValidInput.values.award_Date) : ''}
                                                onChange={(selectedDate) => {
                                                    appEditEmployeeValidInput.setFieldValue('award_Date', selectedDate)
                                                }}
                                                isClearable={appEditEmployeeValidInput.values.award_Date === '' ? false : true}
                                                dateFormat="yyyy-MM"
                                                showMonthYearPicker
                                            />
                                            {appEditEmployeeValidInput.touched.award_Date && appEditEmployeeValidInput.errors.award_Date && (
                                                <div id="date-invalid">{appEditEmployeeValidInput.errors.award_Date}</div>
                                            )}
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
                                            invalidData={appEditEmployeeValidInput}
                                            fieldValue="memberName"
                                            stateSearchInput={appCandidateSearchLov}
                                            stateSearchInputSet={setAppCandidateSearchLov}
                                            touchedLovField={appEditEmployeeValidInput.touched.memberId}
                                            errorLovField={appEditEmployeeValidInput.errors.memberId}
                                            pParam={appLovParam}
                                        />
                                    </div>
                                </div>
                                {/* <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-5">
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
                                </div> */}
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
                                            value={appEditEmployeeValidInput.values.description}
                                            onChange={(e) => appEditEmployeeValidInput.setFieldValue('description', e.target.value)}
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
                                            Nilai
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            disabled
                                            value={appEditEmployeeValidInput.values.score}
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
                                            Aktif
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="checkbox"
                                            checked={appEditEmployeeValidInput.values.view === 1 ? true : false}
                                            onChange={(e) => {
                                                appEditEmployeeValidInput.setFieldValue('view', appEditEmployeeValidInput.values.view === 1 ? 0 : 1)
                                            }}
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
    )
}

EditEmployeeOf.propTypes = {
    appEditEmployeeOfMonYea: PropTypes.any,
    setAppEmployeeOfMonYea: PropTypes.any,
    setAppEditEmployeeOfMonYea: PropTypes.any,
    setAppEmployeeOfMonYeaMsg: PropTypes.any,
    appEmployeeOfMonYeaData: PropTypes.any,
}

export default EditEmployeeOf
