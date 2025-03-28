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
            locationId: '',
        },
        validationSchema: Yup.object().shape({
            levelName: Yup.string().required("Wajib diisi"),
            locationId: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {

            dispatch(editLevelMaster({
                levelCd: props.appLevelMasterData.levelCd,
                levelName: values.levelName,
                locationId: values.locationId,
            }))
            props.setAppLevelMasterMsg('')
        }
    });

    useEffect(() => {
        if (props.appEditLevelMaster) {
            dispatch(getLevelDataAction({ levelCd: props.appLevelMasterData.levelCd }))
            setLoadingSpinner(true)
        } else {
            appEditLevelMasterValidInput.resetForm()
        }
    }, [props.appEditLevelMaster])

    useEffect(() => {
        appEditLevelMasterValidInput.setFieldValue('levelCd', appLevelData?.data?.result.levelCd)
        appEditLevelMasterValidInput.setFieldValue('levelName', appLevelData?.data?.result.levelName)
        appEditLevelMasterValidInput.setFieldValue('locationId', appLevelData?.data?.result.locationId)

        setLoadingSpinner(false)
    }, [appLevelData])


    return (
        <Container
            style={{ display: props.appEditLevelMaster ? 'block' : "none" }}
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
                                            Kode Level <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            disabled
                                            value={appEditLevelMasterValidInput.values.levelCd}
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
                                            Lokasi <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8" style={{ marginTop: "-8px" }}>
                                        <Input
                                            type="select"
                                            value={appEditLevelMasterValidInput.values.locationId}
                                            invalid={appEditLevelMasterValidInput.touched.locationId && appEditLevelMasterValidInput.errors.locationId
                                                ? true : false
                                            }
                                            onChange={(e) => appEditLevelMasterValidInput.setFieldValue('locationId', e.target.value)}
                                        >
                                            {
                                                props.appLevelLocationListData?.data?.list.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.locationId}
                                                            selected={item.locationId === appEditLevelMasterValidInput.values.locationId}
                                                        >
                                                            {item.locationName}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </Input>
                                        <FormFeedback type="invalid">{appEditLevelMasterValidInput.errors.locationId}</FormFeedback>
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
