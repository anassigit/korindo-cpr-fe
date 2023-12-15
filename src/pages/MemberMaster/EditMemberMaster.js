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
import { editMemberMaster, getMemberDataAction, getPositionAndLevelLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import DatePicker from "react-datepicker";
import Lovv2 from "common/Lovv2";

const EditMemberMaster = (props) => {

    const dispatch = useDispatch()
    const fileInputRef = useRef(null);
    const dateRef = useRef(null);

    const [photo, setPhoto] = useState(null)
    const [previewPhoto, setPreviewPhoto] = useState('')

    const appMemberData = useSelector((state) => {
        return state.memberMasterReducer.respGetMember2
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

    const appEditMemberMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            memberId: '',
            memberName: '',
            memberFullName: '',
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
            memberId: Yup.string().required("Wajib diisi"),
            memberName: Yup.string().required("Wajib diisi"),
            memberFullName: Yup.string().required("Wajib diisi"),
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
            props.setAppMemberMasterMsg('')
            props.setLoadingSpinner(true)
            
            const formData = new FormData();
            const birthday = new Date(values.birthday);
            const formattedBirthday = `${birthday.getFullYear()}-${(birthday.getMonth() + 1).toString().padStart(2, '0')}-${birthday.getDate().toString().padStart(2, '0')}`;

            formData.append('memberId', values.memberId);
            formData.append('memberFullName', values.memberFullName);
            formData.append('memberName', values.memberName);
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

            dispatch(editMemberMaster(formData));
        }
    })

    useEffect(() => {
        if (props.appMemberMasterData) {
            dispatch(getMemberDataAction({
                memberId: props.appMemberMasterData.memberId
            }))
        }
    }, [props.appMemberMasterData])

    // useEffect(() => {
    //     if (props.appEditMemberMaster) {
    //         appEditMemberMasterValidInput.resetForm()
    //         setBirthdayDate('')
    //         setAppPositionSearchLov("")
    //     }
    // }, [props.appEditMemberMaster])

    useEffect(() => {
        if (appMemberData.status === '1') {
            
            appEditMemberMasterValidInput.setFieldValue('memberId', appMemberData.data?.result.memberId)
            appEditMemberMasterValidInput.setFieldValue('memberName', appMemberData.data?.result.memberName)
            appEditMemberMasterValidInput.setFieldValue('memberFullName', appMemberData.data?.result.memberFullName)
            appEditMemberMasterValidInput.setFieldValue('birthday', appMemberData.data?.result.birthday)
            appEditMemberMasterValidInput.setFieldValue('email', appMemberData.data?.result.email)
            appEditMemberMasterValidInput.setFieldValue('hp', appMemberData.data?.result.hp)
            appEditMemberMasterValidInput.setFieldValue('password', appMemberData.data?.result.password)
            appEditMemberMasterValidInput.setFieldValue('locationId', appMemberData.data?.result.locationId)
            appEditMemberMasterValidInput.setFieldValue('positionCd', appMemberData.data?.result.positionCd)
            appEditMemberMasterValidInput.setFieldValue('levelCd', appMemberData.data?.result.levelCd)
            appEditMemberMasterValidInput.setFieldValue('levelName', appMemberData.data?.result.levelName)
            appEditMemberMasterValidInput.setFieldValue('gender', appMemberData.data?.result.gender.toString())
            appEditMemberMasterValidInput.setFieldValue('status', appMemberData.data?.result.status.toString())
            appEditMemberMasterValidInput.setFieldValue('positionName', appMemberData.data?.result.positionName)
            setBirthdayDate(new Date(appMemberData.data?.result.birthday))
            setPreviewPhoto(appMemberData.data?.result.profileUrl)
        } else {
            appEditMemberMasterValidInput.setFieldValue('locationId', props.appMemberLocationListData?.data?.list[0].locationId)
        }
    }, [appMemberData])

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
        appEditMemberMasterValidInput.setFieldValue('deletePhoto', 1)
    };

    const dateChanger = (birthdayDate) => {

        appEditMemberMasterValidInput.setFieldValue('birthday', birthdayDate);

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
        appEditMemberMasterValidInput.setFieldValue("positionCd", row.positionCd)
        appEditMemberMasterValidInput.setFieldValue("levelCd", row.levelCd)
        appEditMemberMasterValidInput.setFieldValue("levelName", row.levelName)
    }

    useEffect(() => {
        appEditMemberMasterValidInput.setFieldValue('birthday', birthdayDate)
    }, [birthdayDate])

    useEffect(() => {
        if (appEditMemberMasterValidInput.values.locationId) {
            setAppLovParam({
                locationId: appEditMemberMasterValidInput.values.locationId
            })
        }
    }, [appEditMemberMasterValidInput.values.locationId])

    useEffect(() => {
        setAppPositionSearchLov(appEditMemberMasterValidInput.values.positionName)
    }, [appEditMemberMasterValidInput.values.positionName])
    
    return (
        <Container
            style={{ display: props.appEditMemberMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Tambah Member Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appEditMemberMasterValidInput.handleSubmit();
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
                                            value={appEditMemberMasterValidInput.values.memberId}
                                            invalid={appEditMemberMasterValidInput.touched.memberId && appEditMemberMasterValidInput.errors.memberId
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMemberMasterValidInput.setFieldValue('memberId', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMemberMasterValidInput.errors.memberId}</FormFeedback>
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
                                            value={appEditMemberMasterValidInput.values.memberName}
                                            invalid={appEditMemberMasterValidInput.touched.memberName && appEditMemberMasterValidInput.errors.memberName
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMemberMasterValidInput.setFieldValue('memberName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMemberMasterValidInput.errors.memberName}</FormFeedback>
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
                                            value={appEditMemberMasterValidInput.values.memberFullName}
                                            invalid={appEditMemberMasterValidInput.touched.memberFullName && appEditMemberMasterValidInput.errors.memberFullName
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMemberMasterValidInput.setFieldValue('memberFullName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMemberMasterValidInput.errors.memberFullName}</FormFeedback>
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
                                                    checked={appEditMemberMasterValidInput.values.gender === '1'}
                                                    onChange={() => appEditMemberMasterValidInput.setFieldValue('gender', '1')}
                                                    invalid={appEditMemberMasterValidInput.touched.gender && appEditMemberMasterValidInput.errors.gender
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
                                                    checked={appEditMemberMasterValidInput.values.gender === '2'}
                                                    onChange={() => appEditMemberMasterValidInput.setFieldValue('gender', '2')}
                                                    invalid={appEditMemberMasterValidInput.touched.gender && appEditMemberMasterValidInput.errors.gender
                                                        ? true : false
                                                    }
                                                />
                                                Perempuan
                                            </label>
                                        </div>
                                        {/* <FormFeedback type="invalid">{appEditMemberMasterValidInput.errors.gender}</FormFeedback> */}
                                        {appEditMemberMasterValidInput.touched.gender && appEditMemberMasterValidInput.errors.gender && (
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
                                                className={`form-control date-with-button ${appEditMemberMasterValidInput.touched.birthday && appEditMemberMasterValidInput.errors.birthday ? 'is-invalid' : ''}`}
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
                                                className={`form-control date-with-button ${appEditMemberMasterValidInput.touched.birthday && appEditMemberMasterValidInput.errors.birthday ? 'is-invalid' : ''}`}
                                                selected={appEditMemberMasterValidInput.values.birthday ? new Date(appEditMemberMasterValidInput.values.birthday) : ''}
                                                onChange={(e) =>
                                                    dateChanger(e)
                                                }
                                                isClearable={appEditMemberMasterValidInput.values.birthday ? true : false}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="yyyy-mm-dd"
                                                ariaInvalid={
                                                    appEditMemberMasterValidInput.touched.birthday && appEditMemberMasterValidInput.errors.birthday
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
                                        {appEditMemberMasterValidInput.touched.birthday && appEditMemberMasterValidInput.errors.birthday && (
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
                                            value={appEditMemberMasterValidInput.values.email}
                                            invalid={appEditMemberMasterValidInput.touched.email && appEditMemberMasterValidInput.errors.email
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMemberMasterValidInput.setFieldValue('email', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMemberMasterValidInput.errors.email}</FormFeedback>
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
                                            value={appEditMemberMasterValidInput.values.hp}
                                            invalid={appEditMemberMasterValidInput.touched.hp && appEditMemberMasterValidInput.errors.hp
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMemberMasterValidInput.setFieldValue('hp', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMemberMasterValidInput.errors.hp}</FormFeedback>
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
                                            value={appEditMemberMasterValidInput.values.locationId}
                                            invalid={appEditMemberMasterValidInput.touched.locationId && appEditMemberMasterValidInput.errors.locationId
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMemberMasterValidInput.setFieldValue('locationId', parseInt(e.target.value))}
                                        >
                                            {
                                                props.appMemberLocationListData?.data?.list.map((item, index) => {
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
                                        <FormFeedback type="invalid">{appEditMemberMasterValidInput.errors.locationId}</FormFeedback>
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
                                            invalidData={appEditMemberMasterValidInput}
                                            fieldValue="positionName"
                                            stateSearchInput={appPositionSearchLov}
                                            stateSearchInputSet={setAppPositionSearchLov}
                                            touchedLovField={appEditMemberMasterValidInput.touched.positionName}
                                            errorLovField={appEditMemberMasterValidInput.errors.positionName}
                                            pParam={appLovParam}
                                        />
                                        <FormFeedback type="invalid">{appEditMemberMasterValidInput.errors.positionName}</FormFeedback>
                                    </div>
                                    {console.log(appEditMemberMasterValidInput.errors.positionName)}
                                    {console.log(appEditMemberMasterValidInput.values.positionName)}
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
                                            value={appEditMemberMasterValidInput.values.levelName}
                                            invalid={appEditMemberMasterValidInput.touched.levelName && appEditMemberMasterValidInput.errors.levelName
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMemberMasterValidInput.setFieldValue('levelName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMemberMasterValidInput.errors.levelName}</FormFeedback>
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
                                                    checked={appEditMemberMasterValidInput.values.status === '1'}
                                                    onChange={() => appEditMemberMasterValidInput.setFieldValue('status', '1')}
                                                    invalid={appEditMemberMasterValidInput.touched.status && appEditMemberMasterValidInput.errors.status
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
                                                    checked={appEditMemberMasterValidInput.values.status === '2'}
                                                    onChange={() => appEditMemberMasterValidInput.setFieldValue('status', '2')}
                                                    invalid={appEditMemberMasterValidInput.touched.status && appEditMemberMasterValidInput.errors.status
                                                        ? true : false
                                                    }
                                                />
                                                Tetap
                                            </label>
                                            <FormFeedback type="invalid">{appEditMemberMasterValidInput.errors.status}</FormFeedback>
                                        </div>
                                        {appEditMemberMasterValidInput.touched.status && appEditMemberMasterValidInput.errors.status && (
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
                                            value={appEditMemberMasterValidInput.values.password}
                                            invalid={appEditMemberMasterValidInput.touched.password && appEditMemberMasterValidInput.errors.password
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMemberMasterValidInput.setFieldValue('password', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditMemberMasterValidInput.errors.password}</FormFeedback>
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
                    props.setAppMemberMaster(true)
                    props.setAppEditMemberMaster(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
        </Container >
    );
};

EditMemberMaster.propTypes = {
    appMemberLocationListData: PropTypes.any,
    appMemberMasterData: PropTypes.any,
    appEditMemberMaster: PropTypes.any,
    setAppMemberMaster: PropTypes.any,
    setAppEditMemberMaster: PropTypes.any,
    setAppMemberMasterMsg: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

export default EditMemberMaster;
