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
import { editMemberMaster, getMemberDataAction, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const EditMemberMaster = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const appMemberData = useSelector((state) => state.memberMasterReducer.respGetMember2);


    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appEditMemberMasterValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            memberName: '',
            memberId: '',
        },
        validationSchema: Yup.object().shape({
            memberName: Yup.string().required("Wajib diisi"),
            memberId: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {

            dispatch(editMemberMaster({
                memberId: props.appMemberMasterData.memberId,
                memberName: values.memberName,
                memberId: values.memberId,
            }))
            props.setAppMemberMasterMsg('')
        }
    });

    useEffect(() => {
        if (props.appEditMemberMaster) {
            dispatch(getMemberDataAction({ memberId: props.appMemberMasterData.memberId }))
            setLoadingSpinner(true)
        } else {
            appEditMemberMasterValidInput.resetForm()
        }
    }, [props.appEditMemberMaster])

    useEffect(() => {
        appEditMemberMasterValidInput.setFieldValue('memberId', appMemberData?.data?.result.memberId)
        appEditMemberMasterValidInput.setFieldValue('memberName', appMemberData?.data?.result.memberName)
        appEditMemberMasterValidInput.setFieldValue('memberId', appMemberData?.data?.result.memberId)

        setLoadingSpinner(false)
    }, [appMemberData])


    return (
        <Container
            style={{ display: props.appEditMemberMaster ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-account-plus"></span> Ubah Member Master
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appEditMemberMasterValidInput.handleSubmit();
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
                                            Kode Member <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            disabled
                                            value={appEditMemberMasterValidInput.values.memberId}
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
                                            Member Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appEditMemberMasterValidInput.values.memberName}
                                            onChange={(e) => appEditMemberMasterValidInput.setFieldValue('memberName', e.target.value)}
                                            invalid={appEditMemberMasterValidInput.touched.memberName && appEditMemberMasterValidInput.errors.memberName
                                                ? true : false
                                            }
                                        />
                                        <FormFeedback type="invalid">{appEditMemberMasterValidInput.errors.memberName}</FormFeedback>
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
                                            value={appEditMemberMasterValidInput.values.memberId}
                                            invalid={appEditMemberMasterValidInput.touched.memberId && appEditMemberMasterValidInput.errors.memberId
                                                ? true : false
                                            }
                                            onChange={(e) => appEditMemberMasterValidInput.setFieldValue('memberId', e.target.value)}
                                        >
                                            {
                                                props.appMemberLocationListData?.data?.list.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.memberId}
                                                            selected={item.memberId === appEditMemberMasterValidInput.values.memberId}
                                                        >
                                                            {item.locationName}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </Input>
                                        <FormFeedback type="invalid">{appEditMemberMasterValidInput.errors.memberId}</FormFeedback>
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
                className="btn btn-danger my-5"
                onClick={() => {
                    props.setAppMemberMaster(true)
                    props.setAppEditMemberMaster(false)

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

EditMemberMaster.propTypes = {
    appMemberLocationListData: PropTypes.any,
    appMemberMasterData: PropTypes.any,
    appEditMemberMaster: PropTypes.any,
    setAppMemberMaster: PropTypes.any,
    setAppEditMemberMaster: PropTypes.any,
    setAppMemberMasterMsg: PropTypes.any,
}

export default EditMemberMaster;
