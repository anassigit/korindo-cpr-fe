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
import { editLocationMaster, getLocationDataAction, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const EditLocationMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const appLocationData = useSelector((state) => state.locationMasterReducer.respGetLocation2);


    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appEditLocationMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            locationName: '',
        },
        validationSchema: Yup.object().shape({
            locationName: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {

            dispatch(editLocationMaster({
                locationId: props.appLocationMasterData.locationId,
                locationName: values.locationName,
            }))
            props.setAppLocationMasterMsg('')
        }
    });

    useEffect(() => {
        if (props.appEditLocationMaster) {
            dispatch(getLocationDataAction({ locationId: props.appLocationMasterData.locationId }))
            setLoadingSpinner(true)
        } else {
            appEditLocationMasterValidInput.resetForm()
        }
    }, [props.appEditLocationMaster])

    useEffect(() => {
        appEditLocationMasterValidInput.setFieldValue('locationId', appLocationData?.data?.result.locationId)
        appEditLocationMasterValidInput.setFieldValue('locationName', appLocationData?.data?.result.locationName)
        
        setLoadingSpinner(false)
    }, [appLocationData])


    return (
        <Container
            style={{ display: props.appEditLocationMaster ? 'block' : "none" }}
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
                                            Lokasi Code <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            disabled
                                            value={appEditLocationMasterValidInput.values.locationId}
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
                                            Lokasi Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appEditLocationMasterValidInput.values.locationName}
                                            onChange={(e) => appEditLocationMasterValidInput.setFieldValue('locationName', e.target.value)}
                                            invalid={appEditLocationMasterValidInput.touched.locationName && appEditLocationMasterValidInput.errors.locationName
                                                ? true : false
                                            }
                                        />
                                        <FormFeedback type="invalid">{appEditLocationMasterValidInput.errors.locationName}</FormFeedback>
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
