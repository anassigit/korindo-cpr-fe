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
import { editPositionMaster, getPositionDataAction, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const EditPositionMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const appPositionData = useSelector((state) => state.positionMasterReducer.respGetPosition2);


    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appEditPositionMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            positionName: '',
            locationId: '',
        },
        validationSchema: Yup.object().shape({
            positionName: Yup.string().required("Wajib diisi"),
            locationId: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {

            dispatch(editPositionMaster({
                positionCd: props.appPositionMasterData.positionCd,
                positionName: values.positionName,
                locationId: values.locationId,
            }))
            props.setAppPositionMasterMsg('')
        }
    });

    useEffect(() => {
        if (props.appEditPositionMaster) {
            dispatch(getPositionDataAction({ positionCd: props.appPositionMasterData.positionCd }))
            setLoadingSpinner(true)
        } else {
            appEditPositionMasterValidInput.resetForm()
        }
    }, [props.appEditPositionMaster])

    useEffect(() => {
        appEditPositionMasterValidInput.setFieldValue('positionCd', appPositionData?.data?.result.positionCd)
        appEditPositionMasterValidInput.setFieldValue('positionName', appPositionData?.data?.result.positionName)
        appEditPositionMasterValidInput.setFieldValue('locationId', appPositionData?.data?.result.locationId)

        setLoadingSpinner(false)
    }, [appPositionData])


    return (
        <Container
            style={{ display: props.appEditPositionMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-account-plus"></span> Ubah Position Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appEditPositionMasterValidInput.handleSubmit();
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
                                            Position Code <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            disabled
                                            value={appEditPositionMasterValidInput.values.positionCd}
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
                                            Position Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appEditPositionMasterValidInput.values.positionName}
                                            onChange={(e) => appEditPositionMasterValidInput.setFieldValue('positionName', e.target.value)}
                                            invalid={appEditPositionMasterValidInput.touched.positionName && appEditPositionMasterValidInput.errors.positionName
                                                ? true : false
                                            }
                                        />
                                        <FormFeedback type="invalid">{appEditPositionMasterValidInput.errors.positionName}</FormFeedback>
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
                                            value={appEditPositionMasterValidInput.values.locationId}
                                            invalid={appEditPositionMasterValidInput.touched.locationId && appEditPositionMasterValidInput.errors.locationId
                                                ? true : false
                                            }
                                            onChange={(e) => appEditPositionMasterValidInput.setFieldValue('locationId', e.target.value)}
                                        >
                                            {
                                                props.appPositionLocationListData?.data?.list.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.locationId}
                                                            selected={item.locationId === appEditPositionMasterValidInput.values.locationId}
                                                        >
                                                            {item.locationName}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </Input>
                                        <FormFeedback type="invalid">{appEditPositionMasterValidInput.errors.locationId}</FormFeedback>
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
                    props.setAppPositionMaster(true)
                    props.setAppEditPositionMaster(false)

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

EditPositionMaster.propTypes = {
    appPositionLocationListData: PropTypes.any,
    appPositionMasterData: PropTypes.any,
    appEditPositionMaster: PropTypes.any,
    setAppPositionMaster: PropTypes.any,
    setAppEditPositionMaster: PropTypes.any,
    setAppPositionMasterMsg: PropTypes.any,
}

export default EditPositionMaster;
