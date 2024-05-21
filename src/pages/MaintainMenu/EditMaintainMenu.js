import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
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
    Label,
    Spinner
} from "reactstrap";
import { editMaintainMenu, getMenuDataAction, getMenuParentListLov, getPositionAndLevelLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import DatePicker from "react-datepicker";
import Lovv2 from "common/Lovv2";

const EditMaintainMenu = (props) => {

    const dispatch = useDispatch()

    const [appMenuSearchLov, setAppMenuSearchLov] = useState("");

    const selectedMaintainMenu = useSelector((state) => {
        return state.maintainMenuReducer.respGetMenu2
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

    const appEditMaintainMenuValidInput = useFormik({
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

            dispatch(editMaintainMenu({
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
        if (props.appEditMaintainMenu) {
            appEditMaintainMenuValidInput.resetForm()

            dispatch(getMenuDataAction({
                menuId: props.appMaintainMenuData?.menuId
            }))
        }
    }, [props.appEditMaintainMenu])

    useEffect(() => {
        if (selectedMaintainMenu.status === '1') {
            setAppMenuSearchLov(props.appMaintainMenuData?.parentMenuId)
            appEditMaintainMenuValidInput.setFieldValue('menuId', selectedMaintainMenu.data.result?.menuId)
            appEditMaintainMenuValidInput.setFieldValue('menuName', selectedMaintainMenu.data.result?.menuName)
            appEditMaintainMenuValidInput.setFieldValue('modulId', selectedMaintainMenu.data.result?.menuModuleId)
            appEditMaintainMenuValidInput.setFieldValue('parentMenuId', selectedMaintainMenu.data.result?.parentMenuId)
            appEditMaintainMenuValidInput.setFieldValue('parentMenuName', selectedMaintainMenu.data.result?.parentMenuName)
            appEditMaintainMenuValidInput.setFieldValue('menuPath', selectedMaintainMenu.data.result?.menuPath)
            appEditMaintainMenuValidInput.setFieldValue('menuFrom', new Date(selectedMaintainMenu.data.result?.menuFrom))
            appEditMaintainMenuValidInput.setFieldValue('menuTo', new Date(selectedMaintainMenu.data.result?.menuTo))
            appEditMaintainMenuValidInput.setFieldValue('icon', selectedMaintainMenu.data.result?.icon)
            appEditMaintainMenuValidInput.setFieldValue('orderNo', selectedMaintainMenu.data.result?.orderNo)
        }
    }, [selectedMaintainMenu.data])

    const dateChanger = (name, selectedDate) => {

        if (name === 'from') {
            appEditMaintainMenuValidInput.setFieldValue('menuFrom', selectedDate);

        } else if (name === 'to') {
            appEditMaintainMenuValidInput.setFieldValue('menuTo', selectedDate);
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
        appEditMaintainMenuValidInput.setFieldValue("parentMenuId", row.menuId)
        appEditMaintainMenuValidInput.setFieldValue("parentMenuName", row.menuName)
    }

    return (
        <Container
            style={{ display: props.appEditMaintainMenu ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Ubah Menu Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appEditMaintainMenuValidInput.handleSubmit();
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
                                        <Lovv2
                                            title="Menu"
                                            keyFieldData="menuId"
                                            columns={appLovMenuListColumns}
                                            getData={getMenuParentListLov}
                                            pageSize={10}
                                            callbackFunc={appCallBackMenu}
                                            defaultSetInput="parentMenuId"
                                            invalidData={appEditMaintainMenuValidInput}
                                            fieldValue="parentMenuId"
                                            stateSearchInput={appMenuSearchLov}
                                            stateSearchInputSet={setAppMenuSearchLov}
                                            touchedLovField={appEditMaintainMenuValidInput.touched.parentMenuId}
                                            errorLovField={appEditMaintainMenuValidInput.errors.parentMenuId}
                                            hasNoSearch={true}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.parentMenuId}</FormFeedback>
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
                                            value={appEditMaintainMenuValidInput.values.parentMenuName}
                                            invalid={appEditMaintainMenuValidInput.touched.parentMenuName && appEditMaintainMenuValidInput.errors.parentMenuName
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMaintainMenuValidInput.setFieldValue('parentMenuName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.menuId}</FormFeedback>
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
                                            value={appEditMaintainMenuValidInput.values.menuId}
                                            invalid={appEditMaintainMenuValidInput.touched.menuId && appEditMaintainMenuValidInput.errors.menuId
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMaintainMenuValidInput.setFieldValue('menuId', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.menuId}</FormFeedback>
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
                                            value={appEditMaintainMenuValidInput.values.menuName}
                                            invalid={appEditMaintainMenuValidInput.touched.menuName && appEditMaintainMenuValidInput.errors.menuName
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMaintainMenuValidInput.setFieldValue('menuName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.menuName}</FormFeedback>
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
                                            value={appEditMaintainMenuValidInput.values.menuPath}
                                            invalid={appEditMaintainMenuValidInput.touched.menuPath && appEditMaintainMenuValidInput.errors.menuPath
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMaintainMenuValidInput.setFieldValue('menuPath', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.menuPath}</FormFeedback>
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
                                            value={appEditMaintainMenuValidInput.values.modulId}
                                            invalid={appEditMaintainMenuValidInput.touched.modulId && appEditMaintainMenuValidInput.errors.modulId
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMaintainMenuValidInput.setFieldValue('modulId', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.modulId}</FormFeedback>
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
                                            value={appEditMaintainMenuValidInput.values.orderNo}
                                            invalid={appEditMaintainMenuValidInput.touched.orderNo && appEditMaintainMenuValidInput.errors.orderNo
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMaintainMenuValidInput.setFieldValue('orderNo', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.orderNo}</FormFeedback>
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
                                    {console.log(appEditMaintainMenuValidInput.errors)}
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appEditMaintainMenuValidInput.values.icon}
                                            invalid={appEditMaintainMenuValidInput.touched.icon && appEditMaintainMenuValidInput.errors.icon
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMaintainMenuValidInput.setFieldValue('icon', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.icon}</FormFeedback>
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
                                                className={`form-control date-with-button ${appEditMaintainMenuValidInput.touched.menuFrom && appEditMaintainMenuValidInput.errors.menuFrom ? 'is-invalid' : ''}`}
                                                dateFormat="yyyy-MM-dd"
                                                maxDate={appEditMaintainMenuValidInput.values.menuTo && new Date(appEditMaintainMenuValidInput.values.menuTo)}
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
                                                selected={appEditMaintainMenuValidInput.values.menuFrom}
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
                                        {appEditMaintainMenuValidInput.touched.menuFrom && appEditMaintainMenuValidInput.errors.menuFrom && (
                                            <div id="date-invalid">{appEditMaintainMenuValidInput.errors.menuFrom}</div>
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
                                                className={`form-control date-with-button ${appEditMaintainMenuValidInput.touched.menuTo && appEditMaintainMenuValidInput.errors.menuTo ? 'is-invalid' : ''}`}
                                                dateFormat="yyyy-MM-dd"
                                                minDate={appEditMaintainMenuValidInput.values.menuFrom && new Date(appEditMaintainMenuValidInput.values.menuFrom)}
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
                                                selected={appEditMaintainMenuValidInput.values.menuTo}
                                                onChange={(tglSelesai) =>
                                                    dateChanger('to', tglSelesai ? tglSelesai : null)
                                                }
                                            />
                                            {/* <DatePicker
                                        ref={dateRef2}
                                        className={`form-control date-with-button ${appEditMaintainMenuValidInput.touched.menuTo && appEditMaintainMenuValidInput.errors.menuTo ? 'is-invalid' : ''}`}
                                        minDate={appEditMaintainMenuValidInput.values.menuFrom && new Date(appEditMaintainMenuValidInput.values.menuFrom)}
                                        selected={appEditMaintainMenuValidInput.values.menuTo ? new Date(appEditMaintainMenuValidInput.values.menuTo) : ''}
                                        onChange={(tglSelesai) =>
                                            dateChanger('to', tglSelesai ? tglSelesai : null)
                                        }
                                        isClearable={appEditMaintainMenuValidInput.values.menuTo === '' ? false : true}
                                        dateFormat="yyyy-MM-dd"
                                        ariaInvalid={
                                            appEditMaintainMenuValidInput.touched.menuTo && appEditMaintainMenuValidInput.errors.menuTo
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
                                        {appEditMaintainMenuValidInput.touched.menuTo && appEditMaintainMenuValidInput.errors.menuTo && (
                                            <div id="date-invalid">{appEditMaintainMenuValidInput.errors.menuTo}</div>
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
                    props.setAppEditMaintainMenu(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali&nsbp;
            </Button>
        </Container >
    );
};

EditMaintainMenu.propTypes = {
    appMaintainMenuData: PropTypes.any,
    appEditMaintainMenu: PropTypes.any,
    setAppMaintainMenu: PropTypes.any,
    setAppEditMaintainMenu: PropTypes.any,
    setAppMaintainMenuMsg: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

export default EditMaintainMenu;
