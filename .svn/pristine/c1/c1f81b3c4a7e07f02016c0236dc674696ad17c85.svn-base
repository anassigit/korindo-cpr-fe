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
import { editSettingMaster, getSettingDataAction, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import Lovv2 from "common/Lovv2";

const EditSettingMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [appLevelSearchLov, setAppLevelSearchLov] = useState("");
    const [appLovParam, setAppLovParam] = useState({});

    const appSettingData = useSelector((state) => {
        return state.settingMasterReducer.respGetSetting2
    });

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appEditSettingMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            itemCd: '',
            itemName: '',
            itemDesc: '',
            active: 'T',
            level: '',
        },
        validationSchema: Yup.object().shape({
            itemCd: Yup.string().required("Wajib diisi"),
            itemName: Yup.string().required("Wajib diisi"),
            itemDesc: Yup.string().required("Wajib diisi"),
            active: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {

            dispatch(editSettingMaster({
                settingId: props.appSettingMasterData.settingId,
                itemCd: values.itemCd,
                itemName: values.itemName,
                itemDesc: values.itemDesc,
                level: values.level,
                active: values.active,
            }))
            props.setAppSettingMasterMsg('')
        }
    });

    useEffect(() => {
        if (props.appEditSettingMaster) {
            dispatch(getSettingDataAction({ settingId: props.appSettingMasterData.settingId }))
            setLoadingSpinner(true)
        } else {
            appEditSettingMasterValidInput.resetForm()
            setAppLevelSearchLov("")
        }
    }, [props.appEditSettingMaster])

    useEffect(() => {
        appEditSettingMasterValidInput.setFieldValue('itemCd', appSettingData?.data?.result.itemCd)
        appEditSettingMasterValidInput.setFieldValue('itemName', appSettingData?.data?.result.itemName)
        appEditSettingMasterValidInput.setFieldValue('itemDesc', appSettingData?.data?.result.itemDesc)
        appEditSettingMasterValidInput.setFieldValue('active', appSettingData?.data?.result.active)
        appEditSettingMasterValidInput.setFieldValue('level', appSettingData?.data?.result.level)
        setAppLevelSearchLov(appSettingData?.data?.result.levelName)
        setLoadingSpinner(false)
    }, [appSettingData])

    useEffect(() => {
        if (appEditSettingMasterValidInput.values.locationId) {
            setAppLovParam({
                locationId: appEditSettingMasterValidInput.values.locationId
            })
        }
    }, [appEditSettingMasterValidInput.values.locationId])

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
        appEditSettingMasterValidInput.setFieldValue("levelCd", row.levelCd)
    }

    return (
        <Container
            style={{ display: props.appEditSettingMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-account-plus"></span> Ubah Setting Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appEditSettingMasterValidInput.handleSubmit();
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
                                            Code <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appEditSettingMasterValidInput.values.itemCd}
                                            invalid={appEditSettingMasterValidInput.touched.itemCd && appEditSettingMasterValidInput.errors.itemCd
                                                ? true : false
                                            }
                                            onChange={(e) => appEditSettingMasterValidInput.setFieldValue('itemCd', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditSettingMasterValidInput.errors.itemCd}</FormFeedback>
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
                                            Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appEditSettingMasterValidInput.values.itemName}
                                            invalid={appEditSettingMasterValidInput.touched.itemName && appEditSettingMasterValidInput.errors.itemName
                                                ? true : false
                                            }
                                            onChange={(e) => appEditSettingMasterValidInput.setFieldValue('itemName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditSettingMasterValidInput.errors.itemName}</FormFeedback>
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
                                            Description <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appEditSettingMasterValidInput.values.itemDesc}
                                            invalid={appEditSettingMasterValidInput.touched.itemDesc && appEditSettingMasterValidInput.errors.itemDesc
                                                ? true : false
                                            }
                                            onChange={(e) => appEditSettingMasterValidInput.setFieldValue('itemDesc', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditSettingMasterValidInput.errors.itemDesc}</FormFeedback>
                                    </div>
                                </div>
                                <div
                                    className="d-flex flex-row col-10 align-items-center py-2 "
                                >

                                    <div className="col-4">
                                        <Label
                                            style={{
                                                marginTop: "4px",
                                            }}
                                        >
                                            Level
                                        </Label>
                                    </div>
                                    <div className="col-4">
                                        <Input
                                            type="text"
                                            value={appEditSettingMasterValidInput.values.level}
                                            invalid={appEditSettingMasterValidInput.touched.level && appEditSettingMasterValidInput.errors.level
                                                ? true : false
                                            }
                                            onChange={(e) => {
                                                // Validate input to allow only numeric characters
                                                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                                appEditSettingMasterValidInput.setFieldValue('level', numericValue);
                                            }}
                                        />
                                        <FormFeedback type="invalid">{appEditSettingMasterValidInput.errors.level}</FormFeedback>
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
                                            Active <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <label style={{ display: 'flex', gap: '4px' }}>
                                                <Input
                                                    type="radio"
                                                    name="active"
                                                    value="T"
                                                    checked={appEditSettingMasterValidInput.values.active === 'T'}
                                                    onChange={() => appEditSettingMasterValidInput.setFieldValue('active', 'T')}
                                                />
                                                True
                                            </label>

                                            <label style={{ display: 'flex', gap: '4px' }}>
                                                <Input
                                                    type="radio"
                                                    name="active"
                                                    value="F"
                                                    checked={appEditSettingMasterValidInput.values.active === 'F'}
                                                    onChange={() => appEditSettingMasterValidInput.setFieldValue('active', 'F')}
                                                />
                                                False
                                            </label>
                                        </div>

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
                    props.setAppSettingMaster(true)
                    props.setAppEditSettingMaster(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
            <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", setting: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                <Spinner style={{ padding: "24px", display: "block", setting: "fixed", top: "42.5%", right: "50%" }} color="primary" />
            </div>
        </Container >
    );
};

EditSettingMaster.propTypes = {
    appLocationListData: PropTypes.any,
    appSettingMasterData: PropTypes.any,
    appEditSettingMaster: PropTypes.any,
    setAppSettingMaster: PropTypes.any,
    setAppEditSettingMaster: PropTypes.any,
    setAppSettingMasterMsg: PropTypes.any,
}

export default EditSettingMaster;
