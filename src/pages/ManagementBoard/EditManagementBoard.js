import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
import Lovv2 from "common/Lovv2";
import DatePicker from "react-datepicker";
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
    Label
} from "reactstrap";
import { editMaintainReport, getReportDataAction, getReportParentListLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const EditManagementBoard = (props) => {

    const dispatch = useDispatch()

    const [appReportSearchLov, setAppReportSearchLov] = useState("");

    const selectedManagementBoard = useSelector((state) => {
        return state.managementBoardReducer.respGetReport2
    })

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const dateRef1 = useRef(null);
    const dateRef2 = useRef(null);

    const years = range(1900, new Date().getFullYear() + 1, 1);
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

    const appEditManagementBoardValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            reportId: '',
            reportName: '',
            modulId: '',
            parentReportId: '',
            parentReportName: '',
            reportPath: '',
            reportFrom: '',
            reportTo: '',
            icon: '',
            orderNo: '',
        },
        validationSchema: Yup.object().shape({
            reportId: Yup.string().required("Wajib diisi"),
            reportName: Yup.string().required("Wajib diisi"),
            modulId: Yup.string().required("Wajib diisi"),
            reportPath: Yup.string().required("Wajib diisi"),
            reportFrom: Yup.string().required("Wajib diisi"),
            reportTo: Yup.string().required("Wajib diisi"),
            orderNo: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppManagementBoardMsg('')

            dispatch(editMaintainReport({
                reportId: values.reportId,
                reportName: values.reportName,
                modulId: values.modulId,
                parentReportId: values.parentReportId,
                reportPath: values.reportPath,
                reportFrom: formatDate(values.reportFrom),
                reportTo: formatDate(values.reportTo),
                icon: values.icon,
                orderNo: values.orderNo,
            }));
        }
    })

    const formatDate = (date) => {
        if (date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return '';
    };

    useEffect(() => {
        if (props.appEditManagementBoard) {
            appEditManagementBoardValidInput.resetForm()

            dispatch(getReportDataA({
                reportId: props.appManagementBoardData?.reportId
            }))
        }
    }, [props.appEditManagementBoard])

    useEffect(() => {
        if (selectedManagementBoard.status === '1') {
            setAppReportSearchLov(props.appManagementBoardData?.reportModuleId)

            appEditManagementBoardValidInput.setFieldValue('reportId', selectedManagementBoard.data.result?.reportId)
            appEditManagementBoardValidInput.setFieldValue('reportName', selectedManagementBoard.data.result?.reportName)
            appEditManagementBoardValidInput.setFieldValue('modulId', selectedManagementBoard.data.result?.reportModuleId)
            appEditManagementBoardValidInput.setFieldValue('parentReportId', selectedManagementBoard.data.result?.parentReportId)
            appEditManagementBoardValidInput.setFieldValue('reportPath', selectedManagementBoard.data.result?.reportPath)
            appEditManagementBoardValidInput.setFieldValue('reportFrom', new Date(selectedManagementBoard.data.result?.reportFrom))
            appEditManagementBoardValidInput.setFieldValue('reportTo', new Date(selectedManagementBoard.data.result?.reportTo))
            appEditManagementBoardValidInput.setFieldValue('icon', selectedManagementBoard.data.result?.icon)
            appEditManagementBoardValidInput.setFieldValue('orderNo', selectedManagementBoard.data.result?.orderNo)
        }
    }, [selectedManagementBoard.data])

    const dateChanger = (name, selectedDate) => {

        if (name === 'from') {
            appEditManagementBoardValidInput.setFieldValue('reportFrom', selectedDate);

        } else if (name === 'to') {
            appEditManagementBoardValidInput.setFieldValue('reportTo', selectedDate);
        }

    };

    const handleDateClick1 = () => {
        dateRef1.current.setOpen(true)
    };

    const handleDateClick2 = () => {
        dateRef2.current.setOpen(true)
    };

    const handleDeleteClick = () => {
        setPreviewPhoto('');
    }

    const appLovReportListColumns = [
        {
            dataField: "reportId",
            text: "Report ID",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "reportName",
            text: "Report Name",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
    ]

    const appCallBackReport = (row) => {
        setAppReportSearchLov(row.reportId)
        appEditManagementBoardValidInput.setFieldValue("parentReportId", row.reportId)
        appEditManagementBoardValidInput.setFieldValue("parentReportName", row.reportName)
    }

    return (
        <Container
            style={{ display: props.appEditManagementBoard ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Tambah Karyawan Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appEditManagementBoardValidInput.handleSubmit();
                            return false
                        }}
                    >
                        <FormGroup>
                            <div
                                className="col-4"
                            >
                                <div
                                    className="d-flex flex-row col-10 align-items-start py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            ID Parent Report
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Lovv2
                                            title="Report"
                                            keyFieldData="reportId"
                                            columns={appLovReportListColumns}
                                            getData={getReportParentListLov}
                                            pageSize={10}
                                            callbackFunc={appCallBackReport}
                                            defaultSetInput="parentReportId"
                                            invalidData={appEditManagementBoardValidInput}
                                            fieldValue="parentReportId"
                                            stateSearchInput={appReportSearchLov}
                                            stateSearchInputSet={setAppReportSearchLov}
                                            touchedLovField={appEditManagementBoardValidInput.touched.parentReportId}
                                            errorLovField={appEditManagementBoardValidInput.errors.parentReportId}
                                        />
                                        <FormFeedback type="invalid">{appEditManagementBoardValidInput.errors.parentReportId}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            Parent Report Name
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
                                            value={appEditManagementBoardValidInput.values.parentReportName}
                                            invalid={appEditManagementBoardValidInput.touched.parentReportName && appEditManagementBoardValidInput.errors.parentReportName
                                                ? true : false
                                            }
                                            onChange={(e) => appEditManagementBoardValidInput.setFieldValue('parentReportName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditManagementBoardValidInput.errors.reportId}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            ID Report <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appEditManagementBoardValidInput.values.reportId}
                                            invalid={appEditManagementBoardValidInput.touched.reportId && appEditManagementBoardValidInput.errors.reportId
                                                ? true : false
                                            }
                                            onChange={(e) => appEditManagementBoardValidInput.setFieldValue('reportId', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditManagementBoardValidInput.errors.reportId}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            Report Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appEditManagementBoardValidInput.values.reportName}
                                            invalid={appEditManagementBoardValidInput.touched.reportName && appEditManagementBoardValidInput.errors.reportName
                                                ? true : false
                                            }
                                            onChange={(e) => appEditManagementBoardValidInput.setFieldValue('reportName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditManagementBoardValidInput.errors.reportName}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            Report Path <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appEditManagementBoardValidInput.values.reportPath}
                                            invalid={appEditManagementBoardValidInput.touched.reportPath && appEditManagementBoardValidInput.errors.reportPath
                                                ? true : false
                                            }
                                            onChange={(e) => appEditManagementBoardValidInput.setFieldValue('reportPath', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditManagementBoardValidInput.errors.reportPath}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            ID Modul <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appEditManagementBoardValidInput.values.modulId}
                                            invalid={appEditManagementBoardValidInput.touched.modulId && appEditManagementBoardValidInput.errors.modulId
                                                ? true : false
                                            }
                                            onChange={(e) => appEditManagementBoardValidInput.setFieldValue('modulId', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditManagementBoardValidInput.errors.modulId}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            Order/Urutan <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appEditManagementBoardValidInput.values.orderNo}
                                            invalid={appEditManagementBoardValidInput.touched.orderNo && appEditManagementBoardValidInput.errors.orderNo
                                                ? true : false
                                            }
                                            onChange={(e) => appEditManagementBoardValidInput.setFieldValue('orderNo', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditManagementBoardValidInput.errors.orderNo}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            Icon (MDI Icon)
                                        </Label>
                                    </div>
                                    {console.log(appEditManagementBoardValidInput.errors)}
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appEditManagementBoardValidInput.values.icon}
                                            invalid={appEditManagementBoardValidInput.touched.icon && appEditManagementBoardValidInput.errors.icon
                                                ? true : false
                                            }
                                            onChange={(e) => appEditManagementBoardValidInput.setFieldValue('icon', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditManagementBoardValidInput.errors.icon}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "2px",
                                            }}
                                        >
                                            Begin Effective <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <div style={{ display: 'flex' }}>
                                            <DatePicker
                                                ref={dateRef1}
                                                className={`form-control date-with-button ${appEditManagementBoardValidInput.touched.reportFrom && appEditManagementBoardValidInput.errors.reportFrom ? 'is-invalid' : ''}`}
                                                dateFormat="yyyy-MM-dd"
                                                maxDate={appEditManagementBoardValidInput.values.reportTo && new Date(appEditManagementBoardValidInput.values.reportTo)}
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
                                                selected={appEditManagementBoardValidInput.values.reportFrom}
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
                                        {appEditManagementBoardValidInput.touched.reportFrom && appEditManagementBoardValidInput.errors.reportFrom && (
                                            <div id="date-invalid">{appEditManagementBoardValidInput.errors.reportFrom}</div>
                                        )}
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                            }}
                                        >
                                            End Effective <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">

                                        <div style={{ display: 'flex' }}>
                                            <DatePicker
                                                ref={dateRef2}
                                                className={`form-control date-with-button ${appEditManagementBoardValidInput.touched.reportTo && appEditManagementBoardValidInput.errors.reportTo ? 'is-invalid' : ''}`}
                                                dateFormat="yyyy-MM-dd"
                                                minDate={appEditManagementBoardValidInput.values.reportFrom && new Date(appEditManagementBoardValidInput.values.reportFrom)}
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
                                                selected={appEditManagementBoardValidInput.values.reportTo}
                                                onChange={(tglSelesai) =>
                                                    dateChanger('to', tglSelesai ? tglSelesai : null)
                                                }
                                            />
                                            {/* <DatePicker
                                        ref={dateRef2}
                                        className={`form-control date-with-button ${appEditManagementBoardValidInput.touched.reportTo && appEditManagementBoardValidInput.errors.reportTo ? 'is-invalid' : ''}`}
                                        minDate={appEditManagementBoardValidInput.values.reportFrom && new Date(appEditManagementBoardValidInput.values.reportFrom)}
                                        selected={appEditManagementBoardValidInput.values.reportTo ? new Date(appEditManagementBoardValidInput.values.reportTo) : ''}
                                        onChange={(tglSelesai) =>
                                            dateChanger('to', tglSelesai ? tglSelesai : null)
                                        }
                                        isClearable={appEditManagementBoardValidInput.values.reportTo === '' ? false : true}
                                        dateFormat="yyyy-MM-dd"
                                        ariaInvalid={
                                            appEditManagementBoardValidInput.touched.reportTo && appEditManagementBoardValidInput.errors.reportTo
                                                ? true : false
                                        }
                                    /> */}
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
                                        {appEditManagementBoardValidInput.touched.reportTo && appEditManagementBoardValidInput.errors.reportTo && (
                                            <div id="date-invalid">{appEditManagementBoardValidInput.errors.reportTo}</div>
                                        )}
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
                className="btn btn-danger my-2"
                onClick={() => {
                    props.setAppManagementBoard(true)
                    props.setAppEditManagementBoard(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
        </Container >
    );
};

EditManagementBoard.propTypes = {
    appManagementBoardData: PropTypes.any,
    appEditManagementBoard: PropTypes.any,
    setAppManagementBoard: PropTypes.any,
    setAppEditManagementBoard: PropTypes.any,
    setAppManagementBoardMsg: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

export default EditManagementBoard;
