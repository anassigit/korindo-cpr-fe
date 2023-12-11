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
import { addMemberMaster, getPositionAndLevelLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import DatePicker from "react-datepicker";
import Lovv2 from "common/Lovv2";

const AddMemberMaster = (props) => {

    const dispatch = useDispatch()
    const fileInputRef = useRef(null);
    const dateRef = useRef(null);

    const [photo, setPhoto] = useState(null)
    const [previewPhoto, setPreviewPhoto] = useState('')
    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const [appPositionSearchLov, setAppPositionSearchLov] = useState("");

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appAddMemberMasterValidInput = useFormik({
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
            levelCd: '',
            levelName: '',
            gender: '',
            status: '',
            profileFoto: '',
        },
        validationSchema: Yup.object().shape({
            memberId: Yup.string().required("Wajib diisi"),
            memberName: Yup.string().required("Wajib diisi"),
            memberFullName: Yup.string().required("Wajib diisi"),
            birthday: Yup.string().required("Wajib diisi"),
            email: Yup.string().required("Wajib diisi"),
            hp: Yup.string().required("Wajib diisi"),
            password: Yup.string().required("Wajib diisi"),
            locationId: Yup.string().required("Wajib diisi"),
            positionCd: Yup.string().required("Wajib diisi"),
            levelCd: Yup.string().required("Wajib diisi"),
            gender: Yup.string().required("Wajib diisi"),
            status: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppMemberMasterMsg('')
            debugger
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

            // Assuming 'photo' is a File object (e.g., from <input type="file">)
            formData.append('profileFoto', photo);

            dispatch(addMemberMaster(formData));
        }
    });

    useEffect(() => {
        if (props.appAddMemberMaster) {
            appAddMemberMasterValidInput.resetForm()
            appAddMemberMasterValidInput.setFieldValue('locationId', props.appMemberLocationListData?.data?.list[0].locationId)
            appPositionSearchLov("")
        }
    }, [props.appAddMemberMaster])

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            setPhoto(selectedFile)
            reader.onloadend = () => {
                setPreviewPhoto(reader.result);
            };

            reader.readAsDataURL(selectedFile);
        }
    };

    const handleDateClick = () => {
        dateRef.current.setOpen(true)
    };

    const handleDeleteClick = () => {
        setPreviewPhoto('');
    };

    const dateChanger = (selectedDate) => {

        appAddMemberMasterValidInput.setFieldValue('birthday', selectedDate);

    };

    const appLovPositionListColumns = [
        {
            dataField: "positionCd",
            text: "Level Name",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "positionName",
            text: "Level No",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "levelCd",
            text: "Level No",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "levelName",
            text: "Level Name",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
    ]

    const appCallBackPosition = (row) => {
        appAddMemberMasterValidInput.setFieldValue("positionCd", row.positionCd)
        appAddMemberMasterValidInput.setFieldValue("levelCd", row.levelCd)
        appAddMemberMasterValidInput.setFieldValue("levelName", row.levelName)
    }

    return (
        <Container
            style={{ display: props.appAddMemberMaster ? 'block' : "none" }}
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
                            appAddMemberMasterValidInput.handleSubmit();
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
                                            value={appAddMemberMasterValidInput.values.memberId}
                                            invalid={appAddMemberMasterValidInput.touched.memberId && appAddMemberMasterValidInput.errors.memberId
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMemberMasterValidInput.setFieldValue('memberId', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMemberMasterValidInput.errors.memberId}</FormFeedback>
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
                                            value={appAddMemberMasterValidInput.values.memberName}
                                            invalid={appAddMemberMasterValidInput.touched.memberName && appAddMemberMasterValidInput.errors.memberName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMemberMasterValidInput.setFieldValue('memberName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMemberMasterValidInput.errors.memberName}</FormFeedback>
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
                                            value={appAddMemberMasterValidInput.values.memberFullName}
                                            invalid={appAddMemberMasterValidInput.touched.memberFullName && appAddMemberMasterValidInput.errors.memberFullName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMemberMasterValidInput.setFieldValue('memberFullName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMemberMasterValidInput.errors.memberFullName}</FormFeedback>
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
                                    <div className="col-8" style={{ marginTop: "-8px", display: 'flex', gap: '12px' }}>
                                        <label style={{ display: 'flex', gap: '4px' }}>
                                            <Input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={appAddMemberMasterValidInput.values.gender === 'male'}
                                                onChange={() => appAddMemberMasterValidInput.setFieldValue('gender', 'male')}
                                            />
                                            Laki-laki
                                        </label>
                                        <label style={{ display: 'flex', gap: '4px' }}>
                                            <Input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={appAddMemberMasterValidInput.values.gender === 'female'}
                                                onChange={() => appAddMemberMasterValidInput.setFieldValue('gender', 'female')}
                                            />
                                            Perempuan
                                        </label>
                                        <FormFeedback type="invalid">{appAddMemberMasterValidInput.errors.gender}</FormFeedback>
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
                                                className={`form-control date-with-button ${appAddMemberMasterValidInput.touched.birthday && appAddMemberMasterValidInput.errors.birthday ? 'is-invalid' : ''}`}
                                                selected={appAddMemberMasterValidInput.values.birthday ? new Date(appAddMemberMasterValidInput.values.birthday) : ''}
                                                onChange={(e) =>
                                                    dateChanger(e)
                                                }
                                                isClearable={appAddMemberMasterValidInput.values.birthday ? true : false}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="yyyy-mm-dd"
                                                ariaInvalid={
                                                    appAddMemberMasterValidInput.touched.birthday && appAddMemberMasterValidInput.errors.birthday
                                                        ? true : false
                                                }
                                            />
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
                                        <FormFeedback type="invalid">{appAddMemberMasterValidInput.errors.birthday}</FormFeedback>
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
                                            value={appAddMemberMasterValidInput.values.email}
                                            invalid={appAddMemberMasterValidInput.touched.email && appAddMemberMasterValidInput.errors.email
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMemberMasterValidInput.setFieldValue('email', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMemberMasterValidInput.errors.email}</FormFeedback>
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
                                            value={appAddMemberMasterValidInput.values.hp}
                                            invalid={appAddMemberMasterValidInput.touched.hp && appAddMemberMasterValidInput.errors.hp
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMemberMasterValidInput.setFieldValue('hp', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMemberMasterValidInput.errors.hp}</FormFeedback>
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
                                            value={appAddMemberMasterValidInput.values.locationId}
                                            invalid={appAddMemberMasterValidInput.touched.locationId && appAddMemberMasterValidInput.errors.locationId
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMemberMasterValidInput.setFieldValue('locationId', e.target.value)}
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
                                        <FormFeedback type="invalid">{appAddMemberMasterValidInput.errors.locationId}</FormFeedback>
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
                                            keyFieldData="positionCd"
                                            columns={appLovPositionListColumns}
                                            getData={getPositionAndLevelLov}
                                            pageSize={10}
                                            callbackFunc={appCallBackPosition}
                                            defaultSetInput="positionName"
                                            invalidData={appAddMemberMasterValidInput}
                                            fieldValue="positionName"
                                            stateSearchInput={appPositionSearchLov}
                                            stateSearchInputSet={setAppPositionSearchLov}
                                            touchedLovField={appAddMemberMasterValidInput.touched.positionCd}
                                            errorLovField={appAddMemberMasterValidInput.errors.positionCd}
                                        />
                                        <FormFeedback type="invalid">{appAddMemberMasterValidInput.errors.positionCd}</FormFeedback>
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
                                            value={appAddMemberMasterValidInput.values.levelName}
                                            invalid={appAddMemberMasterValidInput.touched.levelName && appAddMemberMasterValidInput.errors.levelName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMemberMasterValidInput.setFieldValue('levelName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMemberMasterValidInput.errors.levelName}</FormFeedback>
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
                                    <div className="col-8" style={{ marginTop: "-8px", display: 'flex', gap: '12px' }}>
                                        <label style={{ display: 'flex', gap: '4px' }}>
                                            <Input
                                                type="radio"
                                                name="status"
                                                value="1"
                                                checked={appAddMemberMasterValidInput.values.status === '1'}
                                                onChange={() => appAddMemberMasterValidInput.setFieldValue('status', '1')}
                                            />
                                            Kontrak
                                        </label>
                                        <label style={{ display: 'flex', gap: '4px' }}>
                                            <Input
                                                type="radio"
                                                name="status"
                                                value="2"
                                                checked={appAddMemberMasterValidInput.values.status === '2'}
                                                onChange={() => appAddMemberMasterValidInput.setFieldValue('status', '2')}
                                            />
                                            Tetap
                                        </label>
                                        <FormFeedback type="invalid">{appAddMemberMasterValidInput.errors.status}</FormFeedback>
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
                                            Password <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-5" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="password"
                                            value={appAddMemberMasterValidInput.values.password}
                                            invalid={appAddMemberMasterValidInput.touched.password && appAddMemberMasterValidInput.errors.password
                                                ? true : false
                                            }
                                            onChange={(e) => appAddMemberMasterValidInput.setFieldValue('password', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddMemberMasterValidInput.errors.password}</FormFeedback>
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
                className="btn btn-danger my-5"
                onClick={() => {
                    props.setAppMemberMaster(true)
                    props.setAppAddMemberMaster(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
            <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
            </div>
        </Container >
    );
};

AddMemberMaster.propTypes = {
    appMemberLocationListData: PropTypes.any,
    appAddMemberMaster: PropTypes.any,
    setAppMemberMaster: PropTypes.any,
    setAppAddMemberMaster: PropTypes.any,
    setAppMemberMasterMsg: PropTypes.any,
}

export default AddMemberMaster;
