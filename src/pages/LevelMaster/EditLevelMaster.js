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
import { editLevelMaster, getLevelDataAction, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const EditLevelMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const appLevelData = useSelector((state) => state.levelMasterReducer.respGetLevel2);


    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appEditLevelMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            levelName: '',
            levelNameKor: '',
        },
        validationSchema: Yup.object().shape({
            levelName: Yup.string().required("Wajib diisi"),
            levelNameKor: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {

            dispatch(editLevelMaster({
                levelId: props.appLevelMasterData.levelId,
                levelName: values.levelName,
                levelNameKor: values.levelNameKor,
            }))
            props.setAppLevelMasterMsg('')
        }
    });

    useEffect(() => {
        if (props.appEditLevelMaster) {
            dispatch(getLevelDataAction({ levelId: props.appLevelMasterData.levelId }))
            setLoadingSpinner(true)
        } else {
            appEditLevelMasterValidInput.resetForm()
        }
    }, [props.appEditLevelMaster])

    useEffect(() => {
        appEditLevelMasterValidInput.setFieldValue('levelId', appLevelData?.data?.result.levelId)
        appEditLevelMasterValidInput.setFieldValue('levelName', appLevelData?.data?.result.levelName)
        appEditLevelMasterValidInput.setFieldValue('levelNameKor', appLevelData?.data?.result.levelNameKor)
        
        setLoadingSpinner(false)
    }, [appLevelData])


    return (
        <Container
            style={{ display: props.appEditLevelMaster ? 'block' : "none" }}
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
                            appEditLevelMasterValidInput.handleSubmit();
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
                                            Level Code <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            disabled
                                            value={appEditLevelMasterValidInput.values.levelId}
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
                                            Level Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appEditLevelMasterValidInput.values.levelName}
                                            onChange={(e) => appEditLevelMasterValidInput.setFieldValue('levelName', e.target.value)}
                                            invalid={appEditLevelMasterValidInput.touched.levelName && appEditLevelMasterValidInput.errors.levelName
                                                ? true : false
                                            }
                                        />
                                        <FormFeedback type="invalid">{appEditLevelMasterValidInput.errors.levelName}</FormFeedback>
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
                                            Level Name (Korean) <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="text"
                                            value={appEditLevelMasterValidInput.values.levelNameKor}
                                            onChange={(e) => appEditLevelMasterValidInput.setFieldValue('levelNameKor', e.target.value)}
                                            invalid={appEditLevelMasterValidInput.touched.levelNameKor && appEditLevelMasterValidInput.errors.levelNameKor
                                                ? true : false
                                            }
                                        />
                                        <FormFeedback type="invalid">{appEditLevelMasterValidInput.errors.levelNameKor}</FormFeedback>
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
                    props.setAppLevelMaster(true)
                    props.setAppEditLevelMaster(false)

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

EditLevelMaster.propTypes = {
    appLevelLocationListData: PropTypes.any,
    appLevelMasterData: PropTypes.any,
    appEditLevelMaster: PropTypes.any,
    setAppLevelMaster: PropTypes.any,
    setAppEditLevelMaster: PropTypes.any,
    setAppLevelMasterMsg: PropTypes.any,
}

export default EditLevelMaster;
