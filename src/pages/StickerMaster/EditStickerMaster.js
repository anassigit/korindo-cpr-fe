import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
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
import { editStickerMaster, getStickerDataAction, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const EditStickerMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const [file, setFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null);
    const [prevFile, setPrevFile] = useState()

    const appStickerData = useSelector((state) => state.stickerMasterReducer.respGetSticker);

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appEditStickerMasterValidInput = useFormik({
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
            formData.append('stickerId', props.appStickerMasterData.stickerId)
            formData.append('stickerName', values.stickerName)
            formData.append('file', file)

            dispatch(editStickerMaster(formData))

        }
    });

    useEffect(() => {
        if (props.appEditStickerMaster) {
            dispatch(getStickerDataAction({ stickerId: props.appStickerMasterData.stickerId }))
            setLoadingSpinner(true)
        } else {
            appEditStickerMasterValidInput.resetForm()
        }
    }, [props.appEditStickerMaster])

    useEffect(() => {
        appEditStickerMasterValidInput.setFieldValue('stickerId', appStickerData?.data?.result.stickerId)
        appEditStickerMasterValidInput.setFieldValue('stickerName', appStickerData?.data?.result.stickerName)
        setImagePreview(appStickerData?.data?.result.stickerUrl)

        setLoadingSpinner(false)
    }, [appStickerData])

    const handleFileChange = (e) => {

        const fileTemp = e.target.files[0];
        const fileName = fileTemp ? fileTemp.name : '';
        
        if (fileTemp) {
            appEditStickerMasterValidInput.setFieldValue('file', fileName);
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/svg+xml"];
            if (allowedTypes.includes(fileTemp.type)) {
                setFile(fileTemp);
                setImagePreview(URL.createObjectURL(fileTemp));
                setPrevFile(e.target.value)
                console.log("Valid file selected:", fileTemp);
            } else {
                console.error("Please select a valid file (PNG, JPEG, JPG, GIF, SVG).");
            }
        } 
    };

    return (
        <Container
            style={{ display: props.appEditStickerMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-account-plus"></span> Ubah Level Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appEditStickerMasterValidInput.handleSubmit();
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
                                            Sticker ID <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            disabled
                                            value={appEditStickerMasterValidInput.values.stickerId}
                                        />
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
                                            Sticker Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appEditStickerMasterValidInput.values.stickerName}
                                            onChange={(e) => appEditStickerMasterValidInput.setFieldValue('stickerName', e.target.value)}
                                            invalid={appEditStickerMasterValidInput.touched.stickerName && appEditStickerMasterValidInput.errors.stickerName
                                                ? true : false
                                            }
                                        />
                                        <FormFeedback type="invalid">{appEditStickerMasterValidInput.errors.stickerName}</FormFeedback>
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
                                            invalid={appEditStickerMasterValidInput.touched.file && appEditStickerMasterValidInput.errors.file
                                                ? true : false
                                            }
                                            onChange={(e) => handleFileChange(e)}
                                            multiple={false}
                                        />
                                        <FormFeedback type="invalid">{appEditStickerMasterValidInput.errors.file}</FormFeedback>
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
                    props.setAppEditStickerMaster(false)

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

EditStickerMaster.propTypes = {
    appStickerMasterData: PropTypes.any,
    appEditStickerMaster: PropTypes.any,
    setAppStickerMaster: PropTypes.any,
    setAppEditStickerMaster: PropTypes.any,
    setAppStickerMasterMsg: PropTypes.any,
}

export default EditStickerMaster;
