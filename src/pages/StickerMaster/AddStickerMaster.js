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

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appAddStickerMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            stickerName: '',
        },
        validationSchema: Yup.object().shape({
            stickerName: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            debugger
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
        const file = e.target.files[0];
      
        if (file && file.type === "image/png") {
          // Valid PNG file selected
          // Perform your desired actions with the file
          setFile(file)
          console.log("Valid PNG file selected:", file);
        } else {
          // Invalid file type selected
          // Notify the user or take appropriate action
          console.error("Please select a valid PNG file.");
        }
      }

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
                                            Sticker ID <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            disabled
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
                                            accept=".png"
                                            value={appAddStickerMasterValidInput.values.file}
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
