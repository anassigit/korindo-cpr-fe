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
import { editApplicationRoleUser, editRole, getUserRoleLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import Lovv2 from "common/Lovv2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditApplicationRoleUser = (props) => {

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

    const appEditApplicationRoleValidInput = useFormik({
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

            dispatch(editApplicationRoleUser({
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
        if (props.appEditUserRole) {
            let startDate = new Date(props.appSelectedRole.startDate)
            let endDate = new Date(props.appSelectedRole.endDate)
            appEditApplicationRoleValidInput.resetForm()
            appEditApplicationRoleValidInput.setFieldValue('roleId', props.appSelectedRole.roleId)
            appEditApplicationRoleValidInput.setFieldValue('memberId', props.appSelectedRole.memberId)
            appEditApplicationRoleValidInput.setFieldValue('memberName', props.appSelectedRole.memberName)
            appEditApplicationRoleValidInput.setFieldValue('startDate', startDate)
            appEditApplicationRoleValidInput.setFieldValue('endDate', endDate)
        }
    }, [props.appEditUserRole])

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
        appEditApplicationRoleValidInput.setFieldValue("memberId", row.memberId)
        appEditApplicationRoleValidInput.setFieldValue("memberName", row.memberName)
    }

    const dateChanger = (name, selectedDate) => {

        if (name === 'from') {
            appEditApplicationRoleValidInput.setFieldValue('startDate', selectedDate);

        } else if (name === 'to') {
            appEditApplicationRoleValidInput.setFieldValue('endDate', selectedDate);
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
            style={{ display: props.appEditUserRole ? 'block' : "none" }}
            fluid
        >
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    appEditApplicationRoleValidInput.handleSubmit();
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
                                    value={appEditApplicationRoleValidInput.values.roleId}
                                    invalid={appEditApplicationRoleValidInput.touched.roleId && appEditApplicationRoleValidInput.errors.roleId
                                        ? true : false
                                    }
                                />
                                <FormFeedback type="invalid">{appEditApplicationRoleValidInput.errors.roleId}</FormFeedback>
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
                                <Input
                                    disabled
                                    value={appEditApplicationRoleValidInput.values.memberId}
                                />
                                <FormFeedback type="invalid">{appEditApplicationRoleValidInput.errors.memberId}</FormFeedback>
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
                                    value={appEditApplicationRoleValidInput.values.memberName}
                                    invalid={appEditApplicationRoleValidInput.touched.memberName && appEditApplicationRoleValidInput.errors.memberName
                                        ? true : false
                                    }
                                />
                                <FormFeedback type="invalid">{appEditApplicationRoleValidInput.errors.memberName}</FormFeedback>
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
                                        className={`form-control date-with-button ${appEditApplicationRoleValidInput.touched.startDate && appEditApplicationRoleValidInput.errors.startDate ? 'is-invalid' : ''}`}
                                        dateFormat="yyyy-MM-dd"
                                        maxDate={appEditApplicationRoleValidInput.values.endDate && new Date(appEditApplicationRoleValidInput.values.endDate)}
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
                                        selected={appEditApplicationRoleValidInput.values.startDate}
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
                                {appEditApplicationRoleValidInput.touched.startDate && appEditApplicationRoleValidInput.errors.startDate && (
                                    <div id="date-invalid">{appEditApplicationRoleValidInput.errors.startDate}</div>
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
                                        className={`form-control date-with-button ${appEditApplicationRoleValidInput.touched.endDate && appEditApplicationRoleValidInput.errors.endDate ? 'is-invalid' : ''}`}
                                        dateFormat="yyyy-MM-dd"
                                        minDate={appEditApplicationRoleValidInput.values.startDate && new Date(appEditApplicationRoleValidInput.values.startDate)}
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
                                        selected={appEditApplicationRoleValidInput.values.endDate}
                                        onChange={(tglSelesai) =>
                                            dateChanger('to', tglSelesai ? tglSelesai : null)
                                        }
                                    />
                                    {/* <DatePicker
                                        ref={dateRef2}
                                        className={`form-control date-with-button ${appEditApplicationRoleValidInput.touched.endDate && appEditApplicationRoleValidInput.errors.endDate ? 'is-invalid' : ''}`}
                                        minDate={appEditApplicationRoleValidInput.values.startDate && new Date(appEditApplicationRoleValidInput.values.startDate)}
                                        selected={appEditApplicationRoleValidInput.values.endDate ? new Date(appEditApplicationRoleValidInput.values.endDate) : ''}
                                        onChange={(tglSelesai) =>
                                            dateChanger('to', tglSelesai ? tglSelesai : null)
                                        }
                                        isClearable={appEditApplicationRoleValidInput.values.endDate === '' ? false : true}
                                        dateFormat="yyyy-MM-dd"
                                        ariaInvalid={
                                            appEditApplicationRoleValidInput.touched.endDate && appEditApplicationRoleValidInput.errors.endDate
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
                                {appEditApplicationRoleValidInput.touched.endDate && appEditApplicationRoleValidInput.errors.endDate && (
                                    <div id="date-invalid">{appEditApplicationRoleValidInput.errors.endDate}</div>
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
                    props.setAppEditUserRole(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
        </Container >
    );
};

EditApplicationRoleUser.propTypes = {
    appEditUserRole: PropTypes.any,
    setAppEditUserRole: PropTypes.any,
    setAppMaintainRoleMsg: PropTypes.any,
    setTabUserRole: PropTypes.any,
    appMaintainRoleData: PropTypes.any,
    appSelectedRole: PropTypes.any,
}

export default EditApplicationRoleUser;
