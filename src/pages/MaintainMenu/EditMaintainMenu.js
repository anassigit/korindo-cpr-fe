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
import { editMaintainMenu, getMenuDataAction, getPositionAndLevelLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import DatePicker from "react-datepicker";
import Lovv2 from "common/Lovv2";

const EditMaintainMenu = (props) => {

    const dispatch = useDispatch()
    const fileInputRef = useRef(null);
    const dateRef = useRef(null);

    const [photo, setPhoto] = useState(null)
    const [previewPhoto, setPreviewPhoto] = useState('')

    const appMenuData = useSelector((state) => {
        return state.maintainMenuReducer.respGetMenu2
    });

    const [appPositionSearchLov, setAppPositionSearchLov] = useState('');
    const [appLovParam, setAppLovParam] = useState({});

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const [birthdayDate, setBirthdayDate] = useState('');
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
            menuFullName: '',
            birthday: '',
            email: '',
            hp: '',
            password: '',
            locationId: '',
            positionCd: '',
            positionName: '',
            levelCd: '',
            levelName: '',
            gender: '',
            status: '',
            profileFoto: '',
            deletePhoto: '',
        },
        validationSchema: Yup.object().shape({
            menuId: Yup.string().required("Wajib diisi"),
            menuName: Yup.string().required("Wajib diisi"),
            menuFullName: Yup.string().required("Wajib diisi"),
            birthday: Yup.string().required("Wajib diisi"),
            email: Yup.string().required("Wajib diisi"),
            hp: Yup.string().required("Wajib diisi"),
            locationId: Yup.string().required("Wajib diisi"),
            positionName: Yup.string().required("Wajib diisi"),
            levelCd: Yup.string().required("Wajib diisi"),
            gender: Yup.string().required("Wajib diisi"),
            status: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppMaintainMenuMsg('')
            props.setLoadingSpinner(true)
            
            const formData = new FormData();
            const birthday = new Date(values.birthday);
            const formattedBirthday = `${birthday.getFullYear()}-${(birthday.getMonth() + 1).toString().padStart(2, '0')}-${birthday.getDate().toString().padStart(2, '0')}`;

            formData.append('menuId', values.menuId);
            formData.append('menuFullName', values.menuFullName);
            formData.append('menuName', values.menuName);
            formData.append('birthday', formattedBirthday);
            formData.append('email', values.email);
            formData.append('hp', values.hp);
            formData.append('password', values.password);
            formData.append('locationId', values.locationId);
            formData.append('positionCd', values.positionCd);
            formData.append('levelCd', values.levelCd);
            formData.append('gender', values.gender);
            formData.append('status', values.status);
            if (values.deletePhoto) {
                formData.append('deletePhoto', values.deletePhoto);
            }

            // Assuming 'photo' is a File object (e.g., from <input type="file">)
            formData.append('profileFoto', photo);

            dispatch(editMaintainMenu(formData));
        }
    })

    useEffect(() => {
        if (props.appMaintainMenuData) {
            dispatch(getMenuDataAction({
                menuId: props.appMaintainMenuData.menuId
            }))
        }
    }, [props.appMaintainMenuData])

    // useEffect(() => {
    //     if (props.appEditMaintainMenu) {
    //         appEditMaintainMenuValidInput.resetForm()
    //         setBirthdayDate('')
    //         setAppPositionSearchLov("")
    //     }
    // }, [props.appEditMaintainMenu])

    useEffect(() => {
        if (appMenuData.status === '1') {
            
            appEditMaintainMenuValidInput.setFieldValue('menuId', appMenuData.data?.result.menuId)
            appEditMaintainMenuValidInput.setFieldValue('menuName', appMenuData.data?.result.menuName)
            appEditMaintainMenuValidInput.setFieldValue('menuFullName', appMenuData.data?.result.menuFullName)
            appEditMaintainMenuValidInput.setFieldValue('birthday', appMenuData.data?.result.birthday)
            appEditMaintainMenuValidInput.setFieldValue('email', appMenuData.data?.result.email)
            appEditMaintainMenuValidInput.setFieldValue('hp', appMenuData.data?.result.hp)
            appEditMaintainMenuValidInput.setFieldValue('password', appMenuData.data?.result.password)
            appEditMaintainMenuValidInput.setFieldValue('locationId', appMenuData.data?.result.locationId)
            appEditMaintainMenuValidInput.setFieldValue('positionCd', appMenuData.data?.result.positionCd)
            appEditMaintainMenuValidInput.setFieldValue('levelCd', appMenuData.data?.result.levelCd)
            appEditMaintainMenuValidInput.setFieldValue('levelName', appMenuData.data?.result.levelName)
            appEditMaintainMenuValidInput.setFieldValue('gender', appMenuData.data?.result.gender.toString())
            appEditMaintainMenuValidInput.setFieldValue('status', appMenuData.data?.result.status.toString())
            appEditMaintainMenuValidInput.setFieldValue('positionName', appMenuData.data?.result.positionName)
            setBirthdayDate(new Date(appMenuData.data?.result.birthday))
            setPreviewPhoto(appMenuData.data?.result.profileUrl)
        } else {
            appEditMaintainMenuValidInput.setFieldValue('locationId', props.appMenuLocationListData?.data?.list[0].locationId)
        }
    }, [appMenuData])

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            setPhoto(selectedFile)
            reader.onloadend = () => {
                setPreviewPhoto(reader?.result);
            };

            reader.readAsDataURL(selectedFile);
        }
    };

    const handleDateClick = () => {
        dateRef.current.setOpen(true)
    };

    const handleDeleteClick = () => {
        setPreviewPhoto('');
        appEditMaintainMenuValidInput.setFieldValue('deletePhoto', 1)
    };

    const dateChanger = (birthdayDate) => {

        appEditMaintainMenuValidInput.setFieldValue('birthday', birthdayDate);

    };

    const appLovPositionListColumns = [
        {
            dataField: "positionCd",
            text: "Kode Posisi",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "positionName",
            text: "Nama Posisi",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "levelCd",
            text: "Kode Level",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "levelName",
            text: "Nama Level",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
    ]

    const appCallBackPosition = (row) => {
        appEditMaintainMenuValidInput.setFieldValue("positionCd", row.positionCd)
        appEditMaintainMenuValidInput.setFieldValue("levelCd", row.levelCd)
        appEditMaintainMenuValidInput.setFieldValue("levelName", row.levelName)
    }

    useEffect(() => {
        appEditMaintainMenuValidInput.setFieldValue('birthday', birthdayDate)
    }, [birthdayDate])

    useEffect(() => {
        if (appEditMaintainMenuValidInput.values.locationId) {
            setAppLovParam({
                locationId: appEditMaintainMenuValidInput.values.locationId
            })
        }
    }, [appEditMaintainMenuValidInput.values.locationId])

    useEffect(() => {
        setAppPositionSearchLov(appEditMaintainMenuValidInput.values.positionName)
    }, [appEditMaintainMenuValidInput.values.positionName])
    
    return (
        <Container
            style={{ display: props.appEditMaintainMenu ? 'block' : "none" }}
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
                                            Foto
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        {
                                            previewPhoto ? (
                                                <div style={{ position: 'relative', width: '150px', height: '150px', cursor: 'pointer' }}>
                                                    <img
                                                        src={previewPhoto}
                                                        alt="Preview"
                                                        width={'150px'}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            objectPosition: "center top",
                                                        }}
                                                        onClick={handleFileClick}
                                                    />
                                                    <button
                                                        style={{
                                                            position: 'absolute',
                                                            top: '0px',
                                                            right: '0px',
                                                            background: 'transparent',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            fontSize: '24px',
                                                        }}
                                                        onClick={handleDeleteClick}
                                                    >
                                                        <span className="mdi mdi-close text-danger" />
                                                    </button>
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileChange}
                                                        accept="image/*"
                                                        multiple={false}
                                                    />
                                                </div>
                                            ) :
                                                (
                                                    <div
                                                        style={{
                                                            width: '150px',
                                                            height: '150px',
                                                            border: '1px dotted #bbb',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}
                                                        onClick={handleFileClick}
                                                    >
                                                        <span className="mdi mdi-plus" style={{ fontSize: '32px' }} />
                                                        <div style={{ marginTop: '-8px' }}>
                                                            No items selected
                                                        </div>
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef}
                                                            style={{ display: 'none' }}
                                                            onChange={handleFileChange}
                                                            accept="image/*"
                                                            multiple={false}
                                                        />
                                                    </div>

                                                )
                                        }
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
                                            ID Pengguna (NIK) <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
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
                                            Nama Panggilan <span className="text-danger"> *</span>
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
                                            Nama Lengkap <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appEditMaintainMenuValidInput.values.menuFullName}
                                            invalid={appEditMaintainMenuValidInput.touched.menuFullName && appEditMaintainMenuValidInput.errors.menuFullName
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMaintainMenuValidInput.setFieldValue('menuFullName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.menuFullName}</FormFeedback>
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
                                            Jenis Kelamin <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px", display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <label style={{ display: 'flex', gap: '4px' }}>
                                                <Input
                                                    type="radio"
                                                    name="gender"
                                                    value="1"
                                                    checked={appEditMaintainMenuValidInput.values.gender === '1'}
                                                    onChange={() => appEditMaintainMenuValidInput.setFieldValue('gender', '1')}
                                                    invalid={appEditMaintainMenuValidInput.touched.gender && appEditMaintainMenuValidInput.errors.gender
                                                        ? true : false
                                                    }
                                                />
                                                Laki-laki
                                            </label>
                                            <label style={{ display: 'flex', gap: '4px' }}>
                                                <Input
                                                    type="radio"
                                                    name="gender"
                                                    value="2"
                                                    checked={appEditMaintainMenuValidInput.values.gender === '2'}
                                                    onChange={() => appEditMaintainMenuValidInput.setFieldValue('gender', '2')}
                                                    invalid={appEditMaintainMenuValidInput.touched.gender && appEditMaintainMenuValidInput.errors.gender
                                                        ? true : false
                                                    }
                                                />
                                                Perempuan
                                            </label>
                                        </div>
                                        {/* <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.gender}</FormFeedback> */}
                                        {appEditMaintainMenuValidInput.touched.gender && appEditMaintainMenuValidInput.errors.gender && (
                                            <div
                                                style={{
                                                    fontSize: '10.4px'
                                                }}
                                                className="text-danger"
                                            >
                                                Wajib diisi
                                            </div>
                                        )}
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
                                            Tanggal Lahir <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <div style={{ display: 'flex' }}>

                                            <DatePicker
                                                ref={dateRef}
                                                className={`form-control date-with-button ${appEditMaintainMenuValidInput.touched.birthday && appEditMaintainMenuValidInput.errors.birthday ? 'is-invalid' : ''}`}
                                                dateFormat="yyyy-MM-dd"
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
                                                        <Button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                            {"<"}
                                                        </Button>
                                                        <select
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

                                                        <Button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                            {">"}
                                                        </Button>
                                                    </div>
                                                )}
                                                selected={birthdayDate}
                                                onChange={(date) => setBirthdayDate(date)}
                                            />


                                            {/* <input
                                                ref={dateRef}
                                                type="date"
                                                className="form-control"
                                                name="datePicker"
                                                value={birthdayDate}
                                                onChange={handleDateChange}
                                                pattern="\d{4}-\d{2}-\d{2}"
                                                onFocus={(e) => e.currentTarget.type = "date"} // Ensure the input type is 'date' when focused
                                                onBlur={(e) => e.currentTarget.type = "text"}
                                            /> */}

                                            {/* <DatePicker
                                                ref={dateRef}
                                                className={`form-control date-with-button ${appEditMaintainMenuValidInput.touched.birthday && appEditMaintainMenuValidInput.errors.birthday ? 'is-invalid' : ''}`}
                                                selected={appEditMaintainMenuValidInput.values.birthday ? new Date(appEditMaintainMenuValidInput.values.birthday) : ''}
                                                onChange={(e) =>
                                                    dateChanger(e)
                                                }
                                                isClearable={appEditMaintainMenuValidInput.values.birthday ? true : false}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="yyyy-mm-dd"
                                                ariaInvalid={
                                                    appEditMaintainMenuValidInput.touched.birthday && appEditMaintainMenuValidInput.errors.birthday
                                                        ? true : false
                                                }
                                            /> */}
                                            <Button
                                                style={{
                                                    borderTopLeftRadius: '0',
                                                    borderBottomLeftRadius: '0',
                                                }}
                                                onClick={handleDateClick}
                                            >
                                                <span className="mdi mdi-calendar" />
                                            </Button>
                                        </div>
                                        {appEditMaintainMenuValidInput.touched.birthday && appEditMaintainMenuValidInput.errors.birthday && (
                                            <span
                                                style={{
                                                    fontSize: '10.4px'
                                                }}
                                                className="text-danger"
                                            >
                                                Wajib diisi
                                            </span>
                                        )}
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
                                            Email <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="email"
                                            value={appEditMaintainMenuValidInput.values.email}
                                            invalid={appEditMaintainMenuValidInput.touched.email && appEditMaintainMenuValidInput.errors.email
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMaintainMenuValidInput.setFieldValue('email', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.email}</FormFeedback>
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
                                            No. HP <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appEditMaintainMenuValidInput.values.hp}
                                            invalid={appEditMaintainMenuValidInput.touched.hp && appEditMaintainMenuValidInput.errors.hp
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMaintainMenuValidInput.setFieldValue('hp', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.hp}</FormFeedback>
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
                                            Lokasi <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="select"
                                            value={appEditMaintainMenuValidInput.values.locationId}
                                            invalid={appEditMaintainMenuValidInput.touched.locationId && appEditMaintainMenuValidInput.errors.locationId
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMaintainMenuValidInput.setFieldValue('locationId', parseInt(e.target.value))}
                                        >
                                            {
                                                props.appMenuLocationListData?.data?.list.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.locationId}
                                                        >
                                                            {item.locationName}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </Input>
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.locationId}</FormFeedback>
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
                                            Posisi <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Lovv2
                                            title="Posisi"
                                            keyFieldData="positionName"
                                            columns={appLovPositionListColumns}
                                            getData={getPositionAndLevelLov}
                                            pageSize={10}
                                            callbackFunc={appCallBackPosition}
                                            defaultSetInput="positionName"
                                            invalidData={appEditMaintainMenuValidInput}
                                            fieldValue="positionName"
                                            stateSearchInput={appPositionSearchLov}
                                            stateSearchInputSet={setAppPositionSearchLov}
                                            touchedLovField={appEditMaintainMenuValidInput.touched.positionName}
                                            errorLovField={appEditMaintainMenuValidInput.errors.positionName}
                                            pParam={appLovParam}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.positionName}</FormFeedback>
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
                                            Golongan <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            disabled
                                            value={appEditMaintainMenuValidInput.values.levelName}
                                            invalid={appEditMaintainMenuValidInput.touched.levelName && appEditMaintainMenuValidInput.errors.levelName
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMaintainMenuValidInput.setFieldValue('levelName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.levelName}</FormFeedback>
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
                                            Status <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px", display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <label style={{ display: 'flex', gap: '4px' }}>
                                                <Input
                                                    type="radio"
                                                    name="status"
                                                    value="1"
                                                    checked={appEditMaintainMenuValidInput.values.status === '1'}
                                                    onChange={() => appEditMaintainMenuValidInput.setFieldValue('status', '1')}
                                                    invalid={appEditMaintainMenuValidInput.touched.status && appEditMaintainMenuValidInput.errors.status
                                                        ? true : false
                                                    }
                                                />
                                                Kontrak
                                            </label>
                                            <label style={{ display: 'flex', gap: '4px' }}>
                                                <Input
                                                    type="radio"
                                                    name="status"
                                                    value="2"
                                                    checked={appEditMaintainMenuValidInput.values.status === '2'}
                                                    onChange={() => appEditMaintainMenuValidInput.setFieldValue('status', '2')}
                                                    invalid={appEditMaintainMenuValidInput.touched.status && appEditMaintainMenuValidInput.errors.status
                                                        ? true : false
                                                    }
                                                />
                                                Tetap
                                            </label>
                                            <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.status}</FormFeedback>
                                        </div>
                                        {appEditMaintainMenuValidInput.touched.status && appEditMaintainMenuValidInput.errors.status && (
                                            <div
                                                style={{
                                                    fontSize: '10.4px'
                                                }}
                                                className="text-danger"
                                            >
                                                Wajib diisi
                                            </div>
                                        )}
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
                                            Password
                                        </Label>
                                    </div>
                                    <div className="col-5" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="password"
                                            value={appEditMaintainMenuValidInput.values.password}
                                            invalid={appEditMaintainMenuValidInput.touched.password && appEditMaintainMenuValidInput.errors.password
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMaintainMenuValidInput.setFieldValue('password', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMaintainMenuValidInput.errors.password}</FormFeedback>
                                    </div>
                                    <div className="col-3" style={{ marginTop: "-8px" }}>
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
                &nbsp;Kembali
            </Button>
        </Container >
    );
};

EditMaintainMenu.propTypes = {
    appMenuLocationListData: PropTypes.any,
    appMaintainMenuData: PropTypes.any,
    appEditMaintainMenu: PropTypes.any,
    setAppMaintainMenu: PropTypes.any,
    setAppEditMaintainMenu: PropTypes.any,
    setAppMaintainMenuMsg: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

export default EditMaintainMenu;
