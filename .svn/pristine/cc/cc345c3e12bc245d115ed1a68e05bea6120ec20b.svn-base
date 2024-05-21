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
import { editDeptMaster, getDeptDataAction, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const EditDeptMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const appDeptData = useSelector((state) => state.deptMasterReducer.respGetDept2);


    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appEditDeptMasterValidInput = useFormik({
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

            dispatch(editDeptMaster({
                deptCd: props.appDeptMasterData.deptCd,
                deptName: values.deptName,
                deptNameKor: values.deptNameKor,
            }))
            props.setAppDeptMasterMsg('')
        }
    });

    useEffect(() => {
        if (props.appEditDeptMaster) {
            dispatch(getDeptDataAction({ deptCd: props.appDeptMasterData.deptCd }))
            setLoadingSpinner(true)
        } else {
            appEditDeptMasterValidInput.resetForm()
        }
    }, [props.appEditDeptMaster])

    useEffect(() => {
        appEditDeptMasterValidInput.setFieldValue('deptCd', appDeptData?.data?.result.deptCd)
        appEditDeptMasterValidInput.setFieldValue('deptName', appDeptData?.data?.result.deptName)
        appEditDeptMasterValidInput.setFieldValue('deptNameKor', appDeptData?.data?.result.deptNameKor)
        
        setLoadingSpinner(false)
    }, [appDeptData])


    return (
        <Container
            style={{ display: props.appEditDeptMaster ? 'block' : "none" }}
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
                            appEditDeptMasterValidInput.handleSubmit();
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
                                            Kode Department <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            disabled
                                            value={appEditDeptMasterValidInput.values.deptCd}
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
                                            value={appEditDeptMasterValidInput.values.deptName}
                                            onChange={(e) => appEditDeptMasterValidInput.setFieldValue('deptName', e.target.value)}
                                            invalid={appEditDeptMasterValidInput.touched.deptName && appEditDeptMasterValidInput.errors.deptName
                                                ? true : false
                                            }
                                        />
                                        <FormFeedback type="invalid">{appEditDeptMasterValidInput.errors.deptName}</FormFeedback>
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
                                            value={appEditDeptMasterValidInput.values.deptNameKor}
                                            onChange={(e) => appEditDeptMasterValidInput.setFieldValue('deptNameKor', e.target.value)}
                                            invalid={appEditDeptMasterValidInput.touched.deptNameKor && appEditDeptMasterValidInput.errors.deptNameKor
                                                ? true : false
                                            }
                                        />
                                        <FormFeedback type="invalid">{appEditDeptMasterValidInput.errors.deptNameKor}</FormFeedback>
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
                    props.setAppEditDeptMaster(false)

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

EditDeptMaster.propTypes = {
    appDeptMasterData: PropTypes.any,
    appEditDeptMaster: PropTypes.any,
    setAppDeptMaster: PropTypes.any,
    setAppEditDeptMaster: PropTypes.any,
    setAppDeptMasterMsg: PropTypes.any,
}

export default EditDeptMaster;
