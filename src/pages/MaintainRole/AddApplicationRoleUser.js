<<<<<<< HEAD
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
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
import { addApplicationRoleUser, addRole, getUserRoleLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import Lovv2 from "common/Lovv2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddApplicationRoleUser = (props) => {

    const dispatch = useDispatch()

    const [appMemberSearchLov, setAppMemberSearchLov] = useState("");
    const dateRef1 = useRef(null);
    const dateRef2 = useRef(null);

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

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appAddApplicationRoleValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            roleId: '',
            memberId: '',
            memberName: '',
            startDate: '',
            endDate: '',
        },
        validationSchema: Yup.object().shape({
            roleId: Yup.string().required("Wajib diisi"),
            memberId: Yup.string().required("Wajib diisi"),
            startDate: Yup.string().required("Wajib diisi"),
            endDate: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppMaintainRoleMsg('')


            let startDate = formatDate(values.startDate)
            let endDate = formatDate(values.endDate)

            dispatch(addApplicationRoleUser({
                roleId: values.roleId,
                memberId: values.memberId,
                startDate: startDate,
                endDate: endDate,
            }))

        }
    });

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
        if (props.appAddUserRole) {
            appAddApplicationRoleValidInput.resetForm()
            setAppMemberSearchLov('')
            appAddApplicationRoleValidInput.setFieldValue('roleId', props.appMaintainRoleData.roleId)
        }
    }, [props.appAddUserRole])

    const appLovMemberListColumns = [
        {
            dataField: "memberId",
            text: "Member ID",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "memberName",
            text: "Member Name",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
    ]

    const appCallBackEmployee = (row) => {
        appAddApplicationRoleValidInput.setFieldValue("memberId", row.memberId)
        appAddApplicationRoleValidInput.setFieldValue("memberName", row.memberName)
    }

    const dateChanger = (name, selectedDate) => {

        if (name === 'from') {
            appAddApplicationRoleValidInput.setFieldValue('startDate', selectedDate);

        } else if (name === 'to') {
            appAddApplicationRoleValidInput.setFieldValue('endDate', selectedDate);
        }

    };

    const handleDateClick1 = () => {
        dateRef1.current.setOpen(true)
    };

    const handleDateClick2 = () => {
        dateRef2.current.setOpen(true)
    };

    return (
        <Container
            style={{ display: props.appAddUserRole ? 'block' : "none" }}
            fluid
        >
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    appAddApplicationRoleValidInput.handleSubmit();
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
                                    }}
                                >
                                    Kode Role <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    disabled
                                    type="text"
                                    value={appAddApplicationRoleValidInput.values.roleId}
                                    invalid={appAddApplicationRoleValidInput.touched.roleId && appAddApplicationRoleValidInput.errors.roleId
                                        ? true : false
                                    }
                                />
                                <FormFeedback type="invalid">{appAddApplicationRoleValidInput.errors.roleId}</FormFeedback>
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
                                    Kode Karyawan <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Lovv2
                                    title="Kode Karyawan"
                                    keyFieldData="memberId"
                                    columns={appLovMemberListColumns}
                                    getData={getUserRoleLov}
                                    pageSize={10}
                                    callbackFunc={appCallBackEmployee}
                                    defaultSetInput="memberId"
                                    invalidData={appAddApplicationRoleValidInput}
                                    fieldValue="memberId"
                                    stateSearchInput={appMemberSearchLov}
                                    stateSearchInputSet={setAppMemberSearchLov}
                                    touchedLovField={appAddApplicationRoleValidInput.touched.memberId}
                                    errorLovField={appAddApplicationRoleValidInput.errors.memberId}
                                />
                                <FormFeedback type="invalid">{appAddApplicationRoleValidInput.errors.memberId}</FormFeedback>
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
                                    Nama Karyawan <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    disabled
                                    type="text"
                                    value={appAddApplicationRoleValidInput.values.memberName}
                                    invalid={appAddApplicationRoleValidInput.touched.memberName && appAddApplicationRoleValidInput.errors.memberName
                                        ? true : false
                                    }
                                />
                                <FormFeedback type="invalid">{appAddApplicationRoleValidInput.errors.memberName}</FormFeedback>
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
                                    Begin Effective <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">

                                <div style={{ display: 'flex' }}>
                                    <DatePicker
                                        ref={dateRef1}
                                        className={`form-control date-with-button ${appAddApplicationRoleValidInput.touched.startDate && appAddApplicationRoleValidInput.errors.startDate ? 'is-invalid' : ''}`}
                                        dateFormat="yyyy-MM-dd"
                                        maxDate={appAddApplicationRoleValidInput.values.endDate && new Date(appAddApplicationRoleValidInput.values.endDate)}
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
                                        selected={appAddApplicationRoleValidInput.values.startDate}
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
                                {appAddApplicationRoleValidInput.touched.startDate && appAddApplicationRoleValidInput.errors.startDate && (
                                    <div id="date-invalid">{appAddApplicationRoleValidInput.errors.startDate}</div>
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
                                        className={`form-control date-with-button ${appAddApplicationRoleValidInput.touched.endDate && appAddApplicationRoleValidInput.errors.endDate ? 'is-invalid' : ''}`}
                                        dateFormat="yyyy-MM-dd"
                                        minDate={appAddApplicationRoleValidInput.values.startDate && new Date(appAddApplicationRoleValidInput.values.startDate)}
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
                                        selected={appAddApplicationRoleValidInput.values.endDate}
                                        onChange={(tglSelesai) =>
                                            dateChanger('to', tglSelesai ? tglSelesai : null)
                                        }
                                    />
                                    {/* <DatePicker
                                        ref={dateRef2}
                                        className={`form-control date-with-button ${appAddApplicationRoleValidInput.touched.endDate && appAddApplicationRoleValidInput.errors.endDate ? 'is-invalid' : ''}`}
                                        minDate={appAddApplicationRoleValidInput.values.startDate && new Date(appAddApplicationRoleValidInput.values.startDate)}
                                        selected={appAddApplicationRoleValidInput.values.endDate ? new Date(appAddApplicationRoleValidInput.values.endDate) : ''}
                                        onChange={(tglSelesai) =>
                                            dateChanger('to', tglSelesai ? tglSelesai : null)
                                        }
                                        isClearable={appAddApplicationRoleValidInput.values.endDate === '' ? false : true}
                                        dateFormat="yyyy-MM-dd"
                                        ariaInvalid={
                                            appAddApplicationRoleValidInput.touched.endDate && appAddApplicationRoleValidInput.errors.endDate
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
                                {appAddApplicationRoleValidInput.touched.endDate && appAddApplicationRoleValidInput.errors.endDate && (
                                    <div id="date-invalid">{appAddApplicationRoleValidInput.errors.endDate}</div>
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
            <Button
                className="btn btn-danger my-2"
                onClick={() => {
                    props.setTabUserRole(true)
                    props.setAppAddUserRole(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
        </Container >
    );
};

AddApplicationRoleUser.propTypes = {
    appAddUserRole: PropTypes.any,
    setAppAddUserRole: PropTypes.any,
    setAppMaintainRoleMsg: PropTypes.any,
    setTabUserRole: PropTypes.any,
    appMaintainRoleData: PropTypes.any,
}

export default AddApplicationRoleUser;
=======
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
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
import { addApplicationRoleUser, addRole, getUserRoleLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import Lovv2 from "common/Lovv2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddApplicationRoleUser = (props) => {

    const dispatch = useDispatch()

    const [appMemberSearchLov, setAppMemberSearchLov] = useState("");
    const dateRef1 = useRef(null);
    const dateRef2 = useRef(null);

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

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appAddApplicationRoleValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            roleId: '',
            memberId: '',
            memberName: '',
            startDate: '',
            endDate: '',
        },
        validationSchema: Yup.object().shape({
            roleId: Yup.string().required("Wajib diisi"),
            memberId: Yup.string().required("Wajib diisi"),
            startDate: Yup.string().required("Wajib diisi"),
            endDate: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppMaintainRoleMsg('')


            let startDate = formatDate(values.startDate)
            let endDate = formatDate(values.endDate)

            dispatch(addApplicationRoleUser({
                roleId: values.roleId,
                memberId: values.memberId,
                startDate: startDate,
                endDate: endDate,
            }))

        }
    });

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
        if (props.appAddUserRole) {
            appAddApplicationRoleValidInput.resetForm()
            setAppMemberSearchLov('')
            appAddApplicationRoleValidInput.setFieldValue('roleId', props.appMaintainRoleData.roleId)
        }
    }, [props.appAddUserRole])

    const appLovMemberListColumns = [
        {
            dataField: "memberId",
            text: "Member ID",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "memberName",
            text: "Member Name",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
    ]

    const appCallBackEmployee = (row) => {
        appAddApplicationRoleValidInput.setFieldValue("memberId", row.memberId)
        appAddApplicationRoleValidInput.setFieldValue("memberName", row.memberName)
    }

    const dateChanger = (name, selectedDate) => {

        if (name === 'from') {
            appAddApplicationRoleValidInput.setFieldValue('startDate', selectedDate);

        } else if (name === 'to') {
            appAddApplicationRoleValidInput.setFieldValue('endDate', selectedDate);
        }

    };

    const handleDateClick1 = () => {
        dateRef1.current.setOpen(true)
    };

    const handleDateClick2 = () => {
        dateRef2.current.setOpen(true)
    };

    return (
        <Container
            style={{ display: props.appAddUserRole ? 'block' : "none" }}
            fluid
        >
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    appAddApplicationRoleValidInput.handleSubmit();
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
                                    }}
                                >
                                    Kode Role <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    disabled
                                    type="text"
                                    value={appAddApplicationRoleValidInput.values.roleId}
                                    invalid={appAddApplicationRoleValidInput.touched.roleId && appAddApplicationRoleValidInput.errors.roleId
                                        ? true : false
                                    }
                                />
                                <FormFeedback type="invalid">{appAddApplicationRoleValidInput.errors.roleId}</FormFeedback>
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
                                    Kode Karyawan <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Lovv2
                                    title="Kode Karyawan"
                                    keyFieldData="memberId"
                                    columns={appLovMemberListColumns}
                                    getData={getUserRoleLov}
                                    pageSize={10}
                                    callbackFunc={appCallBackEmployee}
                                    defaultSetInput="memberId"
                                    invalidData={appAddApplicationRoleValidInput}
                                    fieldValue="memberId"
                                    stateSearchInput={appMemberSearchLov}
                                    stateSearchInputSet={setAppMemberSearchLov}
                                    touchedLovField={appAddApplicationRoleValidInput.touched.memberId}
                                    errorLovField={appAddApplicationRoleValidInput.errors.memberId}
                                />
                                <FormFeedback type="invalid">{appAddApplicationRoleValidInput.errors.memberId}</FormFeedback>
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
                                    Nama Karyawan <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    disabled
                                    type="text"
                                    value={appAddApplicationRoleValidInput.values.memberName}
                                    invalid={appAddApplicationRoleValidInput.touched.memberName && appAddApplicationRoleValidInput.errors.memberName
                                        ? true : false
                                    }
                                />
                                <FormFeedback type="invalid">{appAddApplicationRoleValidInput.errors.memberName}</FormFeedback>
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
                                    Begin Effective <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">

                                <div style={{ display: 'flex' }}>
                                    <DatePicker
                                        ref={dateRef1}
                                        className={`form-control date-with-button ${appAddApplicationRoleValidInput.touched.startDate && appAddApplicationRoleValidInput.errors.startDate ? 'is-invalid' : ''}`}
                                        dateFormat="yyyy-MM-dd"
                                        maxDate={appAddApplicationRoleValidInput.values.endDate && new Date(appAddApplicationRoleValidInput.values.endDate)}
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
                                        selected={appAddApplicationRoleValidInput.values.startDate}
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
                                {appAddApplicationRoleValidInput.touched.startDate && appAddApplicationRoleValidInput.errors.startDate && (
                                    <div id="date-invalid">{appAddApplicationRoleValidInput.errors.startDate}</div>
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
                                        className={`form-control date-with-button ${appAddApplicationRoleValidInput.touched.endDate && appAddApplicationRoleValidInput.errors.endDate ? 'is-invalid' : ''}`}
                                        dateFormat="yyyy-MM-dd"
                                        minDate={appAddApplicationRoleValidInput.values.startDate && new Date(appAddApplicationRoleValidInput.values.startDate)}
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
                                        selected={appAddApplicationRoleValidInput.values.endDate}
                                        onChange={(tglSelesai) =>
                                            dateChanger('to', tglSelesai ? tglSelesai : null)
                                        }
                                    />
                                    {/* <DatePicker
                                        ref={dateRef2}
                                        className={`form-control date-with-button ${appAddApplicationRoleValidInput.touched.endDate && appAddApplicationRoleValidInput.errors.endDate ? 'is-invalid' : ''}`}
                                        minDate={appAddApplicationRoleValidInput.values.startDate && new Date(appAddApplicationRoleValidInput.values.startDate)}
                                        selected={appAddApplicationRoleValidInput.values.endDate ? new Date(appAddApplicationRoleValidInput.values.endDate) : ''}
                                        onChange={(tglSelesai) =>
                                            dateChanger('to', tglSelesai ? tglSelesai : null)
                                        }
                                        isClearable={appAddApplicationRoleValidInput.values.endDate === '' ? false : true}
                                        dateFormat="yyyy-MM-dd"
                                        ariaInvalid={
                                            appAddApplicationRoleValidInput.touched.endDate && appAddApplicationRoleValidInput.errors.endDate
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
                                {appAddApplicationRoleValidInput.touched.endDate && appAddApplicationRoleValidInput.errors.endDate && (
                                    <div id="date-invalid">{appAddApplicationRoleValidInput.errors.endDate}</div>
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
            <Button
                className="btn btn-danger my-2"
                onClick={() => {
                    props.setTabUserRole(true)
                    props.setAppAddUserRole(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
        </Container >
    );
};

AddApplicationRoleUser.propTypes = {
    appAddUserRole: PropTypes.any,
    setAppAddUserRole: PropTypes.any,
    setAppMaintainRoleMsg: PropTypes.any,
    setTabUserRole: PropTypes.any,
    appMaintainRoleData: PropTypes.any,
}

export default AddApplicationRoleUser;
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
