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
import { addSettingMaster, getLevelLov, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';
import Lovv2 from "common/Lovv2";

const AddSettingMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appAddSettingMasterValidInput = useFormik({
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
            props.setAppSettingMasterMsg('')

            dispatch(addSettingMaster({
                itemCd: values.itemCd,
                itemName: values.itemName,
                itemDesc: values.itemDesc,
                active: values.active,
                level: values.level,
            }))

        }
    });

    useEffect(() => {
        if (props.appAddSettingMaster) {
            appAddSettingMasterValidInput.resetForm()
        }
    }, [props.appAddSettingMaster])

    console.log(appAddSettingMasterValidInput)

    return (
        <Container
            style={{ display: props.appAddSettingMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Tambah Setting Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appAddSettingMasterValidInput.handleSubmit();
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
                                            Kode Setting <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appAddSettingMasterValidInput.values.itemCd}
                                            invalid={appAddSettingMasterValidInput.touched.itemCd && appAddSettingMasterValidInput.errors.itemCd
                                                ? true : false
                                            }
                                            onChange={(e) => appAddSettingMasterValidInput.setFieldValue('itemCd', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddSettingMasterValidInput.errors.itemCd}</FormFeedback>
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
                                            value={appAddSettingMasterValidInput.values.itemName}
                                            invalid={appAddSettingMasterValidInput.touched.itemName && appAddSettingMasterValidInput.errors.itemName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddSettingMasterValidInput.setFieldValue('itemName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddSettingMasterValidInput.errors.itemName}</FormFeedback>
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
                                            value={appAddSettingMasterValidInput.values.itemDesc}
                                            invalid={appAddSettingMasterValidInput.touched.itemDesc && appAddSettingMasterValidInput.errors.itemDesc
                                                ? true : false
                                            }
                                            onChange={(e) => appAddSettingMasterValidInput.setFieldValue('itemDesc', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddSettingMasterValidInput.errors.itemDesc}</FormFeedback>
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
                                            value={appAddSettingMasterValidInput.values.level}
                                            invalid={appAddSettingMasterValidInput.touched.level && appAddSettingMasterValidInput.errors.level
                                                ? true : false
                                            }
                                            onChange={(e) => {
                                                // Validate input to allow only numeric characters
                                                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                                appAddSettingMasterValidInput.setFieldValue('level', numericValue);
                                            }}
                                        />
                                        <FormFeedback type="invalid">{appAddSettingMasterValidInput.errors.level}</FormFeedback>
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
                                                    checked={appAddSettingMasterValidInput.values.active === 'T'}
                                                    onChange={() => appAddSettingMasterValidInput.setFieldValue('active', 'T')}
                                                />
                                                True
                                            </label>

                                            <label style={{ display: 'flex', gap: '4px' }}>
                                                <Input
                                                    type="radio"
                                                    name="active"
                                                    value="F"
                                                    checked={appAddSettingMasterValidInput.values.active === 'F'}
                                                    onChange={() => appAddSettingMasterValidInput.setFieldValue('active', 'F')}
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
                    props.setAppAddSettingMaster(false)

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

AddSettingMaster.propTypes = {
    appLocationListData: PropTypes.any,
    appAddSettingMaster: PropTypes.any,
    setAppSettingMaster: PropTypes.any,
    setAppAddSettingMaster: PropTypes.any,
    setAppSettingMasterMsg: PropTypes.any,
}

export default AddSettingMaster;
