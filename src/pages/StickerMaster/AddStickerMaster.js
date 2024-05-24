<<<<<<< HEAD
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
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
import { addStickerMaster, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const AddStickerMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [file, setFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appAddStickerMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            stickerName: '',
            file: '',
        },
        validationSchema: Yup.object().shape({
            stickerName: Yup.string().required("Wajib diisi"),
            file: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppStickerMasterMsg('')

            const formData = new FormData()

            formData.append('stickerName', values.stickerName)
            formData.append('file', file)

            dispatch(addStickerMaster(formData))

        }
    });

    useEffect(() => {
        if (props.appAddStickerMaster) {
            appAddStickerMasterValidInput.resetForm()
            setFile(null)
        }
    }, [props.appAddStickerMaster])

    const handleFileChange = (e) => {
        const fileTemp = e.target.files[0];

        appAddStickerMasterValidInput.setFieldValue('file', fileTemp ? fileTemp.name : '');

        if (fileTemp) {
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/svg+xml"];
            if (allowedTypes.includes(fileTemp.type)) {
                setFile(fileTemp);
                setImagePreview(URL.createObjectURL(fileTemp));
                console.log("Valid file selected:", fileTemp)
            } else {
                console.error("Please select a valid file (PNG, JPEG, JPG, GIF, SVG).");
            }
        }
    };

    return (
        <Container
            style={{ display: props.appAddStickerMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Tambah Sticker Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appAddStickerMasterValidInput.handleSubmit();
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
                                            Sticker Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appAddStickerMasterValidInput.values.stickerName}
                                            invalid={appAddStickerMasterValidInput.touched.stickerName && appAddStickerMasterValidInput.errors.stickerName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddStickerMasterValidInput.setFieldValue('stickerName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddStickerMasterValidInput.errors.stickerName}</FormFeedback>
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
                                            Upload Sticker <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="file"
                                            accept=".png, .jpeg, .jpg, .gif, .svg"
                                            invalid={appAddStickerMasterValidInput.touched.file && appAddStickerMasterValidInput.errors.file
                                                ? true : false
                                            }
                                            onChange={(e) => handleFileChange(e)}
                                            multiple={false}
                                        />
                                        <FormFeedback type="invalid">{appAddStickerMasterValidInput.errors.file}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                            }}
                                        >
                                            Preview <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        {imagePreview ? (

                                            <img
                                                src={imagePreview}
                                                alt="Image Preview"
                                                style={{ maxWidth: "50px", marginTop: "10px" }}
                                            />
                                        ) :
                                            (
                                                <span style={{ paddingLeft: '1rem' }}>
                                                    -
                                                </span>
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
                className="btn btn-danger my-3"
                onClick={() => {
                    props.setAppStickerMaster(true)
                    props.setAppAddStickerMaster(false)

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

AddStickerMaster.propTypes = {
    appAddStickerMaster: PropTypes.any,
    setAppStickerMaster: PropTypes.any,
    setAppAddStickerMaster: PropTypes.any,
    setAppStickerMasterMsg: PropTypes.any,
}

export default AddStickerMaster;
=======
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
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
import { addStickerMaster, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const AddStickerMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [file, setFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appAddStickerMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            stickerName: '',
            file: '',
        },
        validationSchema: Yup.object().shape({
            stickerName: Yup.string().required("Wajib diisi"),
            file: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppStickerMasterMsg('')

            const formData = new FormData()

            formData.append('stickerName', values.stickerName)
            formData.append('file', file)

            dispatch(addStickerMaster(formData))

        }
    });

    useEffect(() => {
        if (props.appAddStickerMaster) {
            appAddStickerMasterValidInput.resetForm()
            setFile(null)
        }
    }, [props.appAddStickerMaster])

    const handleFileChange = (e) => {
        const fileTemp = e.target.files[0];

        appAddStickerMasterValidInput.setFieldValue('file', fileTemp ? fileTemp.name : '');

        if (fileTemp) {
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/svg+xml"];
            if (allowedTypes.includes(fileTemp.type)) {
                setFile(fileTemp);
                setImagePreview(URL.createObjectURL(fileTemp));
                console.log("Valid file selected:", fileTemp)
            } else {
                console.error("Please select a valid file (PNG, JPEG, JPG, GIF, SVG).");
            }
        }
    };

    return (
        <Container
            style={{ display: props.appAddStickerMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Tambah Sticker Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appAddStickerMasterValidInput.handleSubmit();
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
                                            Sticker Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appAddStickerMasterValidInput.values.stickerName}
                                            invalid={appAddStickerMasterValidInput.touched.stickerName && appAddStickerMasterValidInput.errors.stickerName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddStickerMasterValidInput.setFieldValue('stickerName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddStickerMasterValidInput.errors.stickerName}</FormFeedback>
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
                                            Upload Sticker <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="file"
                                            accept=".png, .jpeg, .jpg, .gif, .svg"
                                            invalid={appAddStickerMasterValidInput.touched.file && appAddStickerMasterValidInput.errors.file
                                                ? true : false
                                            }
                                            onChange={(e) => handleFileChange(e)}
                                            multiple={false}
                                        />
                                        <FormFeedback type="invalid">{appAddStickerMasterValidInput.errors.file}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 py-2 justify-content-between"
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                            }}
                                        >
                                            Preview <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        {imagePreview ? (

                                            <img
                                                src={imagePreview}
                                                alt="Image Preview"
                                                style={{ maxWidth: "50px", marginTop: "10px" }}
                                            />
                                        ) :
                                            (
                                                <span style={{ paddingLeft: '1rem' }}>
                                                    -
                                                </span>
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
                className="btn btn-danger my-3"
                onClick={() => {
                    props.setAppStickerMaster(true)
                    props.setAppAddStickerMaster(false)

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

AddStickerMaster.propTypes = {
    appAddStickerMaster: PropTypes.any,
    setAppStickerMaster: PropTypes.any,
    setAppAddStickerMaster: PropTypes.any,
    setAppStickerMasterMsg: PropTypes.any,
}

export default AddStickerMaster;
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
