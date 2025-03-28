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
import { addLevelMaster, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const AddLevelMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appAddLevelMasterValidInput = useFormik({
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
            props.setAppLevelMasterMsg('')

            dispatch(addLevelMaster({
                levelName: values.levelName,
                locationId: values.locationId,
            }))

        }
    });

    useEffect(() => {
        if (props.appAddLevelMaster) {
            appAddLevelMasterValidInput.resetForm()
            appAddLevelMasterValidInput.setFieldValue('locationId', props.appLevelLocationListData?.data?.list[0].locationId)
        }
    }, [props.appAddLevelMaster])

    return (
        <Container
            style={{ display: props.appAddLevelMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Tambah Level Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appAddLevelMasterValidInput.handleSubmit();
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
                                            Level Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appAddLevelMasterValidInput.values.levelName}
                                            invalid={appAddLevelMasterValidInput.touched.levelName && appAddLevelMasterValidInput.errors.levelName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddLevelMasterValidInput.setFieldValue('levelName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddLevelMasterValidInput.errors.levelName}</FormFeedback>
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
                                            value={appAddLevelMasterValidInput.values.locationId}
                                            invalid={appAddLevelMasterValidInput.touched.locationId && appAddLevelMasterValidInput.errors.locationId
                                                ? true : false
                                            }
                                            onChange={(e) => appAddLevelMasterValidInput.setFieldValue('locationId', e.target.value)}
                                        >
                                            {
                                                props.appLevelLocationListData?.data?.list.map((item, index) => {
                                                    return (
                                                        <option
                                                        key={index}
                                                        value={item.locationId}
                                                        >
                                                            {item.locationName}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </Input>
                                        <FormFeedback type="invalid">{appAddLevelMasterValidInput.errors.locationId}</FormFeedback>
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
                    props.setAppAddLevelMaster(false)

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

AddLevelMaster.propTypes = {
    appLevelLocationListData: PropTypes.any,
    appAddLevelMaster: PropTypes.any,
    setAppLevelMaster: PropTypes.any,
    setAppAddLevelMaster: PropTypes.any,
    setAppLevelMasterMsg: PropTypes.any,
}

export default AddLevelMaster;
