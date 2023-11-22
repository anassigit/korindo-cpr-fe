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
import { editLocationMaster, getDeptDataAction, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const EditLocationMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const appDeptData = useSelector((state) => state.locationMasterReducer.respGetDept2);


    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appEditLocationMasterValidInput = useFormik({
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

            dispatch(editLocationMaster({
                deptId: props.appLocationMasterData.deptId,
                deptName: values.deptName,
                deptNameKor: values.deptNameKor,
            }))
            props.setAppLocationMasterMsg('')
        }
    });

    useEffect(() => {
        if (props.appEditLocationMaster) {
            dispatch(getDeptDataAction({ deptId: props.appLocationMasterData.deptId }))
            setLoadingSpinner(true)
        } else {
            appEditLocationMasterValidInput.resetForm()
        }
    }, [props.appEditLocationMaster])

    useEffect(() => {
        appEditLocationMasterValidInput.setFieldValue('deptId', appDeptData?.data?.result.deptId)
        appEditLocationMasterValidInput.setFieldValue('deptName', appDeptData?.data?.result.deptName)
        appEditLocationMasterValidInput.setFieldValue('deptNameKor', appDeptData?.data?.result.deptNameKor)
        
        setLoadingSpinner(false)
    }, [appDeptData])


    return (
        <Container
            style={{ display: props.appEditLocationMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-account-plus"></span> Ubah Penghargaan Karyawan
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appEditLocationMasterValidInput.handleSubmit();
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
                                            Department Code <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            disabled
                                            value={appEditLocationMasterValidInput.values.deptId}
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
                                            Department Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appEditLocationMasterValidInput.values.deptName}
                                            onChange={(e) => appEditLocationMasterValidInput.setFieldValue('deptName', e.target.value)}
                                            invalid={appEditLocationMasterValidInput.touched.deptName && appEditLocationMasterValidInput.errors.deptName
                                                ? true : false
                                            }
                                        />
                                        <FormFeedback type="invalid">{appEditLocationMasterValidInput.errors.deptName}</FormFeedback>
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
                                            value={appEditLocationMasterValidInput.values.deptNameKor}
                                            onChange={(e) => appEditLocationMasterValidInput.setFieldValue('deptNameKor', e.target.value)}
                                            invalid={appEditLocationMasterValidInput.touched.deptNameKor && appEditLocationMasterValidInput.errors.deptNameKor
                                                ? true : false
                                            }
                                        />
                                        <FormFeedback type="invalid">{appEditLocationMasterValidInput.errors.deptNameKor}</FormFeedback>
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
                    props.setAppEditLocationMaster(false)

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

EditLocationMaster.propTypes = {
    appLocationMasterData: PropTypes.any,
    appEditLocationMaster: PropTypes.any,
    setAppLocationMaster: PropTypes.any,
    setAppEditLocationMaster: PropTypes.any,
    setAppLocationMasterMsg: PropTypes.any,
}

export default EditLocationMaster;
