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
import { addPositionMaster, getLevelLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import Lovv2 from "common/Lovv2";

const AddPositionMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appLevelSearchLov, setAppLevelSearchLov] = useState("");
    const [appLovParam, setAppLovParam] = useState({});

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appAddPositionMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            positionName: '',
            locationId: '',
            levelCd: '',
        },
        validationSchema: Yup.object().shape({
            positionName: Yup.string().required("Wajib diisi"),
            locationId: Yup.string().required("Wajib diisi"),
            levelCd: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppPositionMasterMsg('')

            dispatch(addPositionMaster({
                positionName: values.positionName,
                locationId: values.locationId,
                levelCd: values.levelCd,
            }))

        }
    });

    useEffect(() => {
        if (props.appAddPositionMaster) {
            appAddPositionMasterValidInput.resetForm()
            appAddPositionMasterValidInput.setFieldValue('locationId', props.appLocationListData?.data?.list[0].locationId)
        }
    }, [props.appAddPositionMaster])

    useEffect(() => {
        if (appAddPositionMasterValidInput.values.locationId) {
            setAppLovParam({
                locationId: appAddPositionMasterValidInput.values.locationId
            })
        }
    }, [appAddPositionMasterValidInput.values.locationId])

    const appLovLevelListColumns = [
        {
            dataField: "levelCd",
            text: "Level No",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "levelName",
            text: "Level Name",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
    ]

    const appCallBackLevel = (row) => {
        appAddPositionMasterValidInput.setFieldValue("levelCd", row.levelCd)
    }

    return (
        <Container
            style={{ display: props.appAddPositionMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Tambah Position Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appAddPositionMasterValidInput.handleSubmit();
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
                                            value={appAddPositionMasterValidInput.values.positionName}
                                            invalid={appAddPositionMasterValidInput.touched.positionName && appAddPositionMasterValidInput.errors.positionName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddPositionMasterValidInput.setFieldValue('positionName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddPositionMasterValidInput.errors.positionName}</FormFeedback>
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
                                            value={appAddPositionMasterValidInput.values.locationId}
                                            invalid={appAddPositionMasterValidInput.touched.locationId && appAddPositionMasterValidInput.errors.locationId
                                                ? true : false
                                            }
                                            onChange={(e) => appAddPositionMasterValidInput.setFieldValue('locationId', e.target.value)}
                                        >
                                            {
                                                props.appLocationListData?.data?.list.map((item, index) => {
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
                                        <FormFeedback type="invalid">{appAddPositionMasterValidInput.errors.locationId}</FormFeedback>
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
                                            Level <span className="text-danger"> *</span>
                                        </Label>
                                    </div>

                                    <div className="col-8">
                                        <Lovv2
                                            title="Level"
                                            keyFieldData="levelCd"
                                            columns={appLovLevelListColumns}
                                            getData={getLevelLov}
                                            pageSize={10}
                                            callbackFunc={appCallBackLevel}
                                            defaultSetInput="levelName"
                                            invalidData={appAddPositionMasterValidInput}
                                            fieldValue="levelName"
                                            stateSearchInput={appLevelSearchLov}
                                            stateSearchInputSet={setAppLevelSearchLov}
                                            touchedLovField={appAddPositionMasterValidInput.touched.levelCd}
                                            errorLovField={appAddPositionMasterValidInput.errors.levelCd}
                                            pParam={appLovParam}
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
                    props.setAppAddPositionMaster(false)

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

AddPositionMaster.propTypes = {
    appLocationListData: PropTypes.any,
    appAddPositionMaster: PropTypes.any,
    setAppPositionMaster: PropTypes.any,
    setAppAddPositionMaster: PropTypes.any,
    setAppPositionMasterMsg: PropTypes.any,
}

export default AddPositionMaster;
