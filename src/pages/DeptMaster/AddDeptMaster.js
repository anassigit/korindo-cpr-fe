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
import { addDeptMaster, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const AddDeptMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appAddDeptMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            deptName: '',
            deptNameKor: '',
        },
        validationSchema: Yup.object().shape({
            deptName: Yup.string().required("Wajib diisi"),
            deptNameKor: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppDeptMasterMsg('')

            dispatch(addDeptMaster({
                deptName: values.deptName,
                deptNameKor: values.deptNameKor,
            }))

        }
    });

    useEffect(() => {
        if (props.appAddDeptMaster) {
            appAddDeptMasterValidInput.resetForm()
        }
    }, [props.appAddDeptMaster])

    return (
        <Container
            style={{ display: props.appAddDeptMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Tambah Department Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appAddDeptMasterValidInput.handleSubmit();
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
                                            Department Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appAddDeptMasterValidInput.values.deptName}
                                            invalid={appAddDeptMasterValidInput.touched.deptName && appAddDeptMasterValidInput.errors.deptName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddDeptMasterValidInput.setFieldValue('deptName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddDeptMasterValidInput.errors.deptName}</FormFeedback>
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
                                            Department Name (Korean) <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appAddDeptMasterValidInput.values.deptNameKor}
                                            invalid={appAddDeptMasterValidInput.touched.deptNameKor && appAddDeptMasterValidInput.errors.deptNameKor
                                                ? true : false
                                            }
                                            onChange={(e) => appAddDeptMasterValidInput.setFieldValue('deptNameKor', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddDeptMasterValidInput.errors.deptNameKor}</FormFeedback>
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
                    props.setAppDeptMaster(true)
                    props.setAppAddDeptMaster(false)

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

AddDeptMaster.propTypes = {
    appAddDeptMaster: PropTypes.any,
    setAppDeptMaster: PropTypes.any,
    setAppAddDeptMaster: PropTypes.any,
    setAppDeptMasterMsg: PropTypes.any,
}

export default AddDeptMaster;
