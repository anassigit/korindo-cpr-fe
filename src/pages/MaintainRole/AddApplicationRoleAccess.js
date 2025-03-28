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
import { addApplicationRoleAccess, addRole, getMenuRoleLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import Lovv2 from "common/Lovv2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddApplicationRoleAccess = (props) => {

    const dispatch = useDispatch()

    const [appMenuSearchLov, setAppMenuSearchLov] = useState("");
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

            dispatch(addApplicationRoleAccess({
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
        if (props.appAddAccessRole) {
            appAddApplicationRoleValidInput.resetForm()
            appAddApplicationRoleValidInput.setFieldValue('roleId', props.appMaintainRoleData.roleId)
        }
    }, [props.appAddAccessRole])

    const appLovMenuListColumns = [
        {
            dataField: "menuId",
            text: "Menu ID",
            sort: true,
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "menuName",
            text: "Menu Name",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
    ]

    const appCallBackMenu = (row) => {
        appAddApplicationRoleValidInput.setFieldValue("menuId", row.menuId)
        appAddApplicationRoleValidInput.setFieldValue("menuName", row.menuName)
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
            style={{ display: props.appAddAccessRole ? 'block' : "none" }}
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
                                    Kode Menu <span className="text-danger"> *</span>
                                </Label>
                            </div>
                            <div className="col-8">
                                <Lovv2
                                    title="Kode Menu"
                                    keyFieldData="menuId"
                                    columns={appLovMenuListColumns}
                                    getData={getMenuRoleLov}
                                    pageSize={10}
                                    callbackFunc={appCallBackMenu}
                                    defaultSetInput="menuId"
                                    invalidData={appAddApplicationRoleValidInput}
                                    fieldValue="menuId"
                                    stateSearchInput={appMenuSearchLov}
                                    stateSearchInputSet={setAppMenuSearchLov}
                                    touchedLovField={appAddApplicationRoleValidInput.touched.menuId}
                                    errorLovField={appAddApplicationRoleValidInput.errors.menuId}
                                />
                                <FormFeedback type="invalid">{appAddApplicationRoleValidInput.errors.menuId}</FormFeedback>
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
                                    value={appAddApplicationRoleValidInput.values.menuName}
                                    invalid={appAddApplicationRoleValidInput.touched.menuName && appAddApplicationRoleValidInput.errors.menuName
                                        ? true : false
                                    }
                                />
                                <FormFeedback type="invalid">{appAddApplicationRoleValidInput.errors.menuName}</FormFeedback>
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
                                    value={appAddApplicationRoleValidInput.values.create}
                                    invalid={appAddApplicationRoleValidInput.touched.create && appAddApplicationRoleValidInput.errors.create
                                        ? true : false
                                    }
                                    onChange={(e) => appAddApplicationRoleValidInput.setFieldValue('create', !appAddApplicationRoleValidInput.values.create)}
                                />
                                <FormFeedback type="invalid">{appAddApplicationRoleValidInput.errors.create}</FormFeedback>
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
                                    value={appAddApplicationRoleValidInput.values.read}
                                    invalid={appAddApplicationRoleValidInput.touched.read && appAddApplicationRoleValidInput.errors.read
                                        ? true : false
                                    }
                                    onChange={(e) => appAddApplicationRoleValidInput.setFieldValue('read', !appAddApplicationRoleValidInput.values.read)}
                                />
                                <FormFeedback type="invalid">{appAddApplicationRoleValidInput.errors.read}</FormFeedback>
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
                                    value={appAddApplicationRoleValidInput.values.update}
                                    invalid={appAddApplicationRoleValidInput.touched.update && appAddApplicationRoleValidInput.errors.update
                                        ? true : false
                                    }
                                    onChange={(e) => appAddApplicationRoleValidInput.setFieldValue('update', !appAddApplicationRoleValidInput.values.update)}
                                />
                                <FormFeedback type="invalid">{appAddApplicationRoleValidInput.errors.update}</FormFeedback>
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
                                    value={appAddApplicationRoleValidInput.values.delete}
                                    invalid={appAddApplicationRoleValidInput.touched.delete && appAddApplicationRoleValidInput.errors.delete
                                        ? true : false
                                    }
                                    onChange={(e) => appAddApplicationRoleValidInput.setFieldValue('delete', !appAddApplicationRoleValidInput.values.delete)}
                                />
                                <FormFeedback type="invalid">{appAddApplicationRoleValidInput.errors.delete}</FormFeedback>
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
                                    value={appAddApplicationRoleValidInput.values.print}
                                    invalid={appAddApplicationRoleValidInput.touched.print && appAddApplicationRoleValidInput.errors.print
                                        ? true : false
                                    }
                                    onChange={(e) => appAddApplicationRoleValidInput.setFieldValue('print', !appAddApplicationRoleValidInput.values.print)}
                                />
                                <FormFeedback type="invalid">{appAddApplicationRoleValidInput.errors.print}</FormFeedback>
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
                    props.setTabAppRole(true)
                    props.setAppAddAccessRole(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
        </Container >
    );
};

AddApplicationRoleAccess.propTypes = {
    appAddAccessRole: PropTypes.any,
    setAppAddAccessRole: PropTypes.any,
    setAppMaintainRoleMsg: PropTypes.any,
    setTabAppRole: PropTypes.any,
    appMaintainRoleData: PropTypes.any,
}

export default AddApplicationRoleAccess;
