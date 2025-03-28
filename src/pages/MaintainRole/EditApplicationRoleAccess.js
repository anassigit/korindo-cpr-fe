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
import { editApplicationRoleAccess, editRole, getMenuRoleLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import Lovv2 from "common/Lovv2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditApplicationRoleAccess = (props) => {

    const dispatch = useDispatch()

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
            menuId: '',
            menuName: '',
            startDate: '',
            endDate: '',
            create: false,
            read: false,
            update: false,
            print: false,
            delete: false,
        },
        validationSchema: Yup.object().shape({
            roleId: Yup.string().required("Wajib diisi"),
            menuId: Yup.string().required("Wajib diisi"),
            startDate: Yup.string().required("Wajib diisi"),
            endDate: Yup.string().required("Wajib diisi"),
            // create: Yup.string().required("Wajib diisi"),
            // read: Yup.string().required("Wajib diisi"),
            // update: Yup.string().required("Wajib diisi"),
            // print: Yup.string().required("Wajib diisi"),
            // delete : Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppMaintainRoleMsg('')

            let startDate = formatDate(values.startDate)
            let endDate = formatDate(values.endDate)

            dispatch(editApplicationRoleAccess({
                roleId: values.roleId,
                menuId: values.menuId,
                startDate: startDate,
                endDate: endDate,
                create: values.create,
                read: values.read,
                update: values.update,
                print: values.print,
                delete: values.delete,
            }))

        }
    });

    console.log(appEditApplicationRoleValidInput.errors)

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
        if (props.appEditAccessRole) {
            const startDate = new Date(props.appAccessData.startDate);
            const endDate = new Date(props.appAccessData.endDate);
            appEditApplicationRoleValidInput.resetForm()
            appEditApplicationRoleValidInput.setFieldValue('roleId', props.appMaintainRoleData.roleId)
            appEditApplicationRoleValidInput.setFieldValue('menuId', props.appAccessData.menuId)
            appEditApplicationRoleValidInput.setFieldValue('menuName', props.appAccessData.menuName)
            appEditApplicationRoleValidInput.setFieldValue('startDate', startDate)
            appEditApplicationRoleValidInput.setFieldValue('endDate', endDate)
            appEditApplicationRoleValidInput.setFieldValue('create', props.appAccessData.create)
            appEditApplicationRoleValidInput.setFieldValue('read', props.appAccessData.read)
            appEditApplicationRoleValidInput.setFieldValue('update', props.appAccessData.update)
            appEditApplicationRoleValidInput.setFieldValue('print', props.appAccessData.print)
            appEditApplicationRoleValidInput.setFieldValue('delete', props.appAccessData.delete)
        }
    }, [props.appEditAccessRole])

    const appCallBackEmployee = (row) => {
        appEditApplicationRoleValidInput.setFieldValue("menuId", row.menuId)
        appEditApplicationRoleValidInput.setFieldValue("menuName", row.menuName)
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
            style={{ display: props.appEditAccessRole ? 'block' : "none" }}
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
                                    Kode Menu <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    disabled
                                    value={appEditApplicationRoleValidInput.values.menuId}
                                />
                                <FormFeedback type="invalid">{appEditApplicationRoleValidInput.errors.menuId}</FormFeedback>
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
                                    Nama Menu <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    disabled
                                    type="text"
                                    value={appEditApplicationRoleValidInput.values.menuName}
                                    invalid={appEditApplicationRoleValidInput.touched.menuName && appEditApplicationRoleValidInput.errors.menuName
                                        ? true : false
                                    }
                                />
                                <FormFeedback type="invalid">{appEditApplicationRoleValidInput.errors.menuName}</FormFeedback>
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
                                    Create <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    type="checkbox"
                                    checked={appEditApplicationRoleValidInput.values.create}
                                    value={appEditApplicationRoleValidInput.values.create}
                                    invalid={appEditApplicationRoleValidInput.touched.create && appEditApplicationRoleValidInput.errors.create
                                        ? true : false
                                    }
                                    onChange={(e) => appEditApplicationRoleValidInput.setFieldValue('create', !appEditApplicationRoleValidInput.values.create)}
                                />
                                <FormFeedback type="invalid">{appEditApplicationRoleValidInput.errors.create}</FormFeedback>
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
                                    Read <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    type="checkbox"
                                    checked={appEditApplicationRoleValidInput.values.read}
                                    value={appEditApplicationRoleValidInput.values.read}
                                    invalid={appEditApplicationRoleValidInput.touched.read && appEditApplicationRoleValidInput.errors.read
                                        ? true : false
                                    }
                                    onChange={(e) => appEditApplicationRoleValidInput.setFieldValue('read', !appEditApplicationRoleValidInput.values.read)}
                                />
                                <FormFeedback type="invalid">{appEditApplicationRoleValidInput.errors.read}</FormFeedback>
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
                                    Update <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    type="checkbox"
                                    checked={appEditApplicationRoleValidInput.values.update}
                                    value={appEditApplicationRoleValidInput.values.update}
                                    invalid={appEditApplicationRoleValidInput.touched.update && appEditApplicationRoleValidInput.errors.update
                                        ? true : false
                                    }
                                    onChange={(e) => appEditApplicationRoleValidInput.setFieldValue('update', !appEditApplicationRoleValidInput.values.update)}
                                />
                                <FormFeedback type="invalid">{appEditApplicationRoleValidInput.errors.update}</FormFeedback>
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
                                    Delete <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    type="checkbox"
                                    checked={appEditApplicationRoleValidInput.values.delete}
                                    value={appEditApplicationRoleValidInput.values.delete}
                                    invalid={appEditApplicationRoleValidInput.touched.delete && appEditApplicationRoleValidInput.errors.delete
                                        ? true : false
                                    }
                                    onChange={(e) => appEditApplicationRoleValidInput.setFieldValue('delete', !appEditApplicationRoleValidInput.values.delete)}
                                />
                                <FormFeedback type="invalid">{appEditApplicationRoleValidInput.errors.delete}</FormFeedback>
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
                                    Print <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Input
                                    type="checkbox"
                                    checked={appEditApplicationRoleValidInput.values.print}
                                    value={appEditApplicationRoleValidInput.values.print}
                                    invalid={appEditApplicationRoleValidInput.touched.print && appEditApplicationRoleValidInput.errors.print
                                        ? true : false
                                    }
                                    onChange={(e) => appEditApplicationRoleValidInput.setFieldValue('print', !appEditApplicationRoleValidInput.values.print)}
                                />
                                <FormFeedback type="invalid">{appEditApplicationRoleValidInput.errors.print}</FormFeedback>
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
                    props.setTabAppRole(true)
                    props.setAppEditAccessRole(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
        </Container >
    );
};

EditApplicationRoleAccess.propTypes = {
    appEditAccessRole: PropTypes.any,
    setAppEditAccessRole: PropTypes.any,
    setAppMaintainRoleMsg: PropTypes.any,
    setTabAppRole: PropTypes.any,
    appMaintainRoleData: PropTypes.any,
    appAccessData: PropTypes.any,
}

export default EditApplicationRoleAccess;
