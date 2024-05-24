<<<<<<< HEAD
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
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
import { addMaintainMenu, getMenuParentListLov, getPositionAndLevelLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import DatePicker from "react-datepicker";
import Lovv2 from "common/Lovv2";

const AddMaintainMenu = (props) => {

    const dispatch = useDispatch()

    const [appMenuSearchLov, setAppMenuSearchLov] = useState("");

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

    const appAddMaintainMenuValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            menuId: '',
            menuName: '',
            modulId: '',
            parentMenuId: '',
            parentMenuName: '',
            menuPath: '',
            menuFrom: '',
            menuTo: '',
            icon: '',
            orderNo: '',
        },
        validationSchema: Yup.object().shape({
            menuId: Yup.string().required("Wajib diisi"),
            menuName: Yup.string().required("Wajib diisi"),
            modulId: Yup.string().required("Wajib diisi"),
            menuPath: Yup.string().required("Wajib diisi"),
            menuFrom: Yup.string().required("Wajib diisi"),
            menuTo: Yup.string().required("Wajib diisi"),
            orderNo: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppMaintainMenuMsg('')

            dispatch(addMaintainMenu({
                menuId: values.menuId,
                menuName: values.menuName,
                modulId: values.modulId,
                parentMenuId: values.parentMenuId,
                menuPath: values.menuPath,
                menuFrom: formatDate(values.menuFrom),
                menuTo: formatDate(values.menuTo),
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
        if (props.appAddMaintainMenu) {
            appAddMaintainMenuValidInput.resetForm()
        }
    }, [props.appAddMaintainMenu])

    const dateChanger = (name, selectedDate) => {

        if (name === 'from') {
            appAddMaintainMenuValidInput.setFieldValue('menuFrom', selectedDate);

        } else if (name === 'to') {
            appAddMaintainMenuValidInput.setFieldValue('menuTo', selectedDate);
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
        setAppMenuSearchLov(row.menuId)
        appAddMaintainMenuValidInput.setFieldValue("parentMenuId", row.menuId)
        appAddMaintainMenuValidInput.setFieldValue("parentMenuName", row.menuName)
    }

    return (
        <Container
            style={{ display: props.appAddMaintainMenu ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Tambah Menu Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appAddMaintainMenuValidInput.handleSubmit();
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
                                            ID Parent Menu
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        {
                                            props.appAddMaintainMenu && (
                                                <Lovv2
                                                    title="Menu"
                                                    keyFieldData="menuId"
                                                    columns={appLovMenuListColumns}
                                                    getData={getMenuParentListLov}
                                                    pageSize={10}
                                                    callbackFunc={appCallBackMenu}
                                                    defaultSetInput="parentMenuId"
                                                    invalidData={appAddMaintainMenuValidInput}
                                                    fieldValue="parentMenuId"
                                                    stateSearchInput={appMenuSearchLov}
                                                    stateSearchInputSet={setAppMenuSearchLov}
                                                    touchedLovField={appAddMaintainMenuValidInput.touched.parentMenuId}
                                                    errorLovField={appAddMaintainMenuValidInput.errors.parentMenuId}
                                                    hasNoSearch={true}
                                                />
                                            )
                                        }
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.parentMenuId}</FormFeedback>
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
                                            Parent Menu Name
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
                                            value={appAddMaintainMenuValidInput.values.parentMenuName}
                                            invalid={appAddMaintainMenuValidInput.touched.parentMenuName && appAddMaintainMenuValidInput.errors.parentMenuName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('parentMenuName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.menuId}</FormFeedback>
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
                                            ID Menu <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appAddMaintainMenuValidInput.values.menuId}
                                            invalid={appAddMaintainMenuValidInput.touched.menuId && appAddMaintainMenuValidInput.errors.menuId
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('menuId', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.menuId}</FormFeedback>
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
                                            Menu Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appAddMaintainMenuValidInput.values.menuName}
                                            invalid={appAddMaintainMenuValidInput.touched.menuName && appAddMaintainMenuValidInput.errors.menuName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('menuName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.menuName}</FormFeedback>
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
                                            Menu Path <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appAddMaintainMenuValidInput.values.menuPath}
                                            invalid={appAddMaintainMenuValidInput.touched.menuPath && appAddMaintainMenuValidInput.errors.menuPath
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('menuPath', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.menuPath}</FormFeedback>
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
                                            value={appAddMaintainMenuValidInput.values.modulId}
                                            invalid={appAddMaintainMenuValidInput.touched.modulId && appAddMaintainMenuValidInput.errors.modulId
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('modulId', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.modulId}</FormFeedback>
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
                                            value={appAddMaintainMenuValidInput.values.orderNo}
                                            invalid={appAddMaintainMenuValidInput.touched.orderNo && appAddMaintainMenuValidInput.errors.orderNo
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('orderNo', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.orderNo}</FormFeedback>
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
                                    {console.log(appAddMaintainMenuValidInput.errors)}
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appAddMaintainMenuValidInput.values.icon}
                                            invalid={appAddMaintainMenuValidInput.touched.icon && appAddMaintainMenuValidInput.errors.icon
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('icon', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.icon}</FormFeedback>
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
                                                className={`form-control date-with-button ${appAddMaintainMenuValidInput.touched.menuFrom && appAddMaintainMenuValidInput.errors.menuFrom ? 'is-invalid' : ''}`}
                                                dateFormat="yyyy-MM-dd"
                                                maxDate={appAddMaintainMenuValidInput.values.menuTo && new Date(appAddMaintainMenuValidInput.values.menuTo)}
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
                                                selected={appAddMaintainMenuValidInput.values.menuFrom}
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
                                        {appAddMaintainMenuValidInput.touched.menuFrom && appAddMaintainMenuValidInput.errors.menuFrom && (
                                            <div id="date-invalid">{appAddMaintainMenuValidInput.errors.menuFrom}</div>
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
                                                className={`form-control date-with-button ${appAddMaintainMenuValidInput.touched.menuTo && appAddMaintainMenuValidInput.errors.menuTo ? 'is-invalid' : ''}`}
                                                dateFormat="yyyy-MM-dd"
                                                minDate={appAddMaintainMenuValidInput.values.menuFrom && new Date(appAddMaintainMenuValidInput.values.menuFrom)}
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
                                                selected={appAddMaintainMenuValidInput.values.menuTo}
                                                onChange={(tglSelesai) =>
                                                    dateChanger('to', tglSelesai ? tglSelesai : null)
                                                }
                                            />
                                            {/* <DatePicker
                                        ref={dateRef2}
                                        className={`form-control date-with-button ${appAddMaintainMenuValidInput.touched.menuTo && appAddMaintainMenuValidInput.errors.menuTo ? 'is-invalid' : ''}`}
                                        minDate={appAddMaintainMenuValidInput.values.menuFrom && new Date(appAddMaintainMenuValidInput.values.menuFrom)}
                                        selected={appAddMaintainMenuValidInput.values.menuTo ? new Date(appAddMaintainMenuValidInput.values.menuTo) : ''}
                                        onChange={(tglSelesai) =>
                                            dateChanger('to', tglSelesai ? tglSelesai : null)
                                        }
                                        isClearable={appAddMaintainMenuValidInput.values.menuTo === '' ? false : true}
                                        dateFormat="yyyy-MM-dd"
                                        ariaInvalid={
                                            appAddMaintainMenuValidInput.touched.menuTo && appAddMaintainMenuValidInput.errors.menuTo
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
                                        {appAddMaintainMenuValidInput.touched.menuTo && appAddMaintainMenuValidInput.errors.menuTo && (
                                            <div id="date-invalid">{appAddMaintainMenuValidInput.errors.menuTo}</div>
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
                    props.setAppMaintainMenu(true)
                    props.setAppAddMaintainMenu(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
        </Container >
    );
};

AddMaintainMenu.propTypes = {
    appAddMaintainMenu: PropTypes.any,
    setAppMaintainMenu: PropTypes.any,
    setAppAddMaintainMenu: PropTypes.any,
    setAppMaintainMenuMsg: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

export default AddMaintainMenu;
=======
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
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
import { addMaintainMenu, getMenuParentListLov, getPositionAndLevelLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import DatePicker from "react-datepicker";
import Lovv2 from "common/Lovv2";

const AddMaintainMenu = (props) => {

    const dispatch = useDispatch()

    const [appMenuSearchLov, setAppMenuSearchLov] = useState("");

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

    const appAddMaintainMenuValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            menuId: '',
            menuName: '',
            modulId: '',
            parentMenuId: '',
            parentMenuName: '',
            menuPath: '',
            menuFrom: '',
            menuTo: '',
            icon: '',
            orderNo: '',
        },
        validationSchema: Yup.object().shape({
            menuId: Yup.string().required("Wajib diisi"),
            menuName: Yup.string().required("Wajib diisi"),
            modulId: Yup.string().required("Wajib diisi"),
            menuPath: Yup.string().required("Wajib diisi"),
            menuFrom: Yup.string().required("Wajib diisi"),
            menuTo: Yup.string().required("Wajib diisi"),
            orderNo: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppMaintainMenuMsg('')

            dispatch(addMaintainMenu({
                menuId: values.menuId,
                menuName: values.menuName,
                modulId: values.modulId,
                parentMenuId: values.parentMenuId,
                menuPath: values.menuPath,
                menuFrom: formatDate(values.menuFrom),
                menuTo: formatDate(values.menuTo),
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
        if (props.appAddMaintainMenu) {
            appAddMaintainMenuValidInput.resetForm()
        }
    }, [props.appAddMaintainMenu])

    const dateChanger = (name, selectedDate) => {

        if (name === 'from') {
            appAddMaintainMenuValidInput.setFieldValue('menuFrom', selectedDate);

        } else if (name === 'to') {
            appAddMaintainMenuValidInput.setFieldValue('menuTo', selectedDate);
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
        setAppMenuSearchLov(row.menuId)
        appAddMaintainMenuValidInput.setFieldValue("parentMenuId", row.menuId)
        appAddMaintainMenuValidInput.setFieldValue("parentMenuName", row.menuName)
    }

    return (
        <Container
            style={{ display: props.appAddMaintainMenu ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Tambah Menu Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appAddMaintainMenuValidInput.handleSubmit();
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
                                            ID Parent Menu
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        {
                                            props.appAddMaintainMenu && (
                                                <Lovv2
                                                    title="Menu"
                                                    keyFieldData="menuId"
                                                    columns={appLovMenuListColumns}
                                                    getData={getMenuParentListLov}
                                                    pageSize={10}
                                                    callbackFunc={appCallBackMenu}
                                                    defaultSetInput="parentMenuId"
                                                    invalidData={appAddMaintainMenuValidInput}
                                                    fieldValue="parentMenuId"
                                                    stateSearchInput={appMenuSearchLov}
                                                    stateSearchInputSet={setAppMenuSearchLov}
                                                    touchedLovField={appAddMaintainMenuValidInput.touched.parentMenuId}
                                                    errorLovField={appAddMaintainMenuValidInput.errors.parentMenuId}
                                                    hasNoSearch={true}
                                                />
                                            )
                                        }
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.parentMenuId}</FormFeedback>
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
                                            Parent Menu Name
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
                                            value={appAddMaintainMenuValidInput.values.parentMenuName}
                                            invalid={appAddMaintainMenuValidInput.touched.parentMenuName && appAddMaintainMenuValidInput.errors.parentMenuName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('parentMenuName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.menuId}</FormFeedback>
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
                                            ID Menu <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appAddMaintainMenuValidInput.values.menuId}
                                            invalid={appAddMaintainMenuValidInput.touched.menuId && appAddMaintainMenuValidInput.errors.menuId
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('menuId', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.menuId}</FormFeedback>
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
                                            Menu Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appAddMaintainMenuValidInput.values.menuName}
                                            invalid={appAddMaintainMenuValidInput.touched.menuName && appAddMaintainMenuValidInput.errors.menuName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('menuName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.menuName}</FormFeedback>
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
                                            Menu Path <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appAddMaintainMenuValidInput.values.menuPath}
                                            invalid={appAddMaintainMenuValidInput.touched.menuPath && appAddMaintainMenuValidInput.errors.menuPath
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('menuPath', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.menuPath}</FormFeedback>
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
                                            value={appAddMaintainMenuValidInput.values.modulId}
                                            invalid={appAddMaintainMenuValidInput.touched.modulId && appAddMaintainMenuValidInput.errors.modulId
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('modulId', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.modulId}</FormFeedback>
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
                                            value={appAddMaintainMenuValidInput.values.orderNo}
                                            invalid={appAddMaintainMenuValidInput.touched.orderNo && appAddMaintainMenuValidInput.errors.orderNo
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('orderNo', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.orderNo}</FormFeedback>
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
                                    {console.log(appAddMaintainMenuValidInput.errors)}
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appAddMaintainMenuValidInput.values.icon}
                                            invalid={appAddMaintainMenuValidInput.touched.icon && appAddMaintainMenuValidInput.errors.icon
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMaintainMenuValidInput.setFieldValue('icon', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMaintainMenuValidInput.errors.icon}</FormFeedback>
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
                                                className={`form-control date-with-button ${appAddMaintainMenuValidInput.touched.menuFrom && appAddMaintainMenuValidInput.errors.menuFrom ? 'is-invalid' : ''}`}
                                                dateFormat="yyyy-MM-dd"
                                                maxDate={appAddMaintainMenuValidInput.values.menuTo && new Date(appAddMaintainMenuValidInput.values.menuTo)}
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
                                                selected={appAddMaintainMenuValidInput.values.menuFrom}
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
                                        {appAddMaintainMenuValidInput.touched.menuFrom && appAddMaintainMenuValidInput.errors.menuFrom && (
                                            <div id="date-invalid">{appAddMaintainMenuValidInput.errors.menuFrom}</div>
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
                                                className={`form-control date-with-button ${appAddMaintainMenuValidInput.touched.menuTo && appAddMaintainMenuValidInput.errors.menuTo ? 'is-invalid' : ''}`}
                                                dateFormat="yyyy-MM-dd"
                                                minDate={appAddMaintainMenuValidInput.values.menuFrom && new Date(appAddMaintainMenuValidInput.values.menuFrom)}
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
                                                selected={appAddMaintainMenuValidInput.values.menuTo}
                                                onChange={(tglSelesai) =>
                                                    dateChanger('to', tglSelesai ? tglSelesai : null)
                                                }
                                            />
                                            {/* <DatePicker
                                        ref={dateRef2}
                                        className={`form-control date-with-button ${appAddMaintainMenuValidInput.touched.menuTo && appAddMaintainMenuValidInput.errors.menuTo ? 'is-invalid' : ''}`}
                                        minDate={appAddMaintainMenuValidInput.values.menuFrom && new Date(appAddMaintainMenuValidInput.values.menuFrom)}
                                        selected={appAddMaintainMenuValidInput.values.menuTo ? new Date(appAddMaintainMenuValidInput.values.menuTo) : ''}
                                        onChange={(tglSelesai) =>
                                            dateChanger('to', tglSelesai ? tglSelesai : null)
                                        }
                                        isClearable={appAddMaintainMenuValidInput.values.menuTo === '' ? false : true}
                                        dateFormat="yyyy-MM-dd"
                                        ariaInvalid={
                                            appAddMaintainMenuValidInput.touched.menuTo && appAddMaintainMenuValidInput.errors.menuTo
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
                                        {appAddMaintainMenuValidInput.touched.menuTo && appAddMaintainMenuValidInput.errors.menuTo && (
                                            <div id="date-invalid">{appAddMaintainMenuValidInput.errors.menuTo}</div>
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
                    props.setAppMaintainMenu(true)
                    props.setAppAddMaintainMenu(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
        </Container >
    );
};

AddMaintainMenu.propTypes = {
    appAddMaintainMenu: PropTypes.any,
    setAppMaintainMenu: PropTypes.any,
    setAppAddMaintainMenu: PropTypes.any,
    setAppMaintainMenuMsg: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

export default AddMaintainMenu;
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
