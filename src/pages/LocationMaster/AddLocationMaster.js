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
import { addLocationMaster, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const AddLocationMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appAddLocationMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            locationName: '',
        },
        validationSchema: Yup.object().shape({
            locationName: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppLocationMasterMsg('')

            dispatch(addLocationMaster({
                locationName: values.locationName,
            }))

        }
    });

    useEffect(() => {
        if (props.appAddLocationMaster) {
            appAddLocationMasterValidInput.resetForm()
        }
    }, [props.appAddLocationMaster])

    return (
        <Container
            style={{ display: props.appAddLocationMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Tambah Lokasi Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appAddLocationMasterValidInput.handleSubmit();
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
                                            Lokasi Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appAddLocationMasterValidInput.values.locationName}
                                            invalid={appAddLocationMasterValidInput.touched.locationName && appAddLocationMasterValidInput.errors.locationName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddLocationMasterValidInput.setFieldValue('locationName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddLocationMasterValidInput.errors.locationName}</FormFeedback>
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
                    props.setAppLocationMaster(true)
                    props.setAppAddLocationMaster(false)

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

AddLocationMaster.propTypes = {
    appAddLocationMaster: PropTypes.any,
    setAppLocationMaster: PropTypes.any,
    setAppAddLocationMaster: PropTypes.any,
    setAppLocationMasterMsg: PropTypes.any,
}

export default AddLocationMaster;
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
import { addLocationMaster, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const AddLocationMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appAddLocationMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            locationName: '',
        },
        validationSchema: Yup.object().shape({
            locationName: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppLocationMasterMsg('')

            dispatch(addLocationMaster({
                locationName: values.locationName,
            }))

        }
    });

    useEffect(() => {
        if (props.appAddLocationMaster) {
            appAddLocationMasterValidInput.resetForm()
        }
    }, [props.appAddLocationMaster])

    return (
        <Container
            style={{ display: props.appAddLocationMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Tambah Lokasi Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appAddLocationMasterValidInput.handleSubmit();
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
                                            Lokasi Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appAddLocationMasterValidInput.values.locationName}
                                            invalid={appAddLocationMasterValidInput.touched.locationName && appAddLocationMasterValidInput.errors.locationName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddLocationMasterValidInput.setFieldValue('locationName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddLocationMasterValidInput.errors.locationName}</FormFeedback>
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
                    props.setAppLocationMaster(true)
                    props.setAppAddLocationMaster(false)

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

AddLocationMaster.propTypes = {
    appAddLocationMaster: PropTypes.any,
    setAppLocationMaster: PropTypes.any,
    setAppAddLocationMaster: PropTypes.any,
    setAppLocationMasterMsg: PropTypes.any,
}

export default AddLocationMaster;
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
