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
import { editStickerMaster, getStickerDataAction, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const EditStickerMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const appStickerData = useSelector((state) => state.stickerMasterReducer.respGetSticker2);


    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appEditStickerMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            stickerName: '',
        },
        validationSchema: Yup.object().shape({
            stickerName: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {

            dispatch(editStickerMaster({
                stickerId: props.appStickerMasterData.stickerId,
                stickerName: values.stickerName,
            }))
            props.setAppStickerMasterMsg('')
        }
    });

    useEffect(() => {
        if (props.appEditStickerMaster) {
            dispatch(getStickerDataAction({ stickerId: props.appStickerMasterData.stickerId }))
            setLoadingSpinner(true)
        } else {
            appEditStickerMasterValidInput.resetForm()
        }
    }, [props.appEditStickerMaster])

    useEffect(() => {
        appEditStickerMasterValidInput.setFieldValue('stickerId', appStickerData?.data?.result.stickerId)
        appEditStickerMasterValidInput.setFieldValue('stickerName', appStickerData?.data?.result.stickerName)
        
        setLoadingSpinner(false)
    }, [appStickerData])


    return (
        <Container
            style={{ display: props.appEditStickerMaster ? 'block' : "none" }}
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
                            appEditStickerMasterValidInput.handleSubmit();
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
                                            Sticker ID <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            disabled
                                            value={appEditStickerMasterValidInput.values.stickerId}
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
                                            Sticker Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appEditStickerMasterValidInput.values.stickerName}
                                            onChange={(e) => appEditStickerMasterValidInput.setFieldValue('stickerName', e.target.value)}
                                            invalid={appEditStickerMasterValidInput.touched.stickerName && appEditStickerMasterValidInput.errors.stickerName
                                                ? true : false
                                            }
                                        />
                                        <FormFeedback type="invalid">{appEditStickerMasterValidInput.errors.stickerName}</FormFeedback>
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
                    props.setAppStickerMaster(true)
                    props.setAppEditStickerMaster(false)

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

EditStickerMaster.propTypes = {
    appStickerMasterData: PropTypes.any,
    appEditStickerMaster: PropTypes.any,
    setAppStickerMaster: PropTypes.any,
    setAppEditStickerMaster: PropTypes.any,
    setAppStickerMasterMsg: PropTypes.any,
}

export default EditStickerMaster;
