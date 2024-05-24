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
import { editRole, resetMessage, getRoleDataAction } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const EditMaintainRole = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const appDetailMaintainRoleData = useSelector((state) => {
        return state.maintainRoleReducer.respGetRole
    })

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appEditRoleValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            roleName: '',
            roleId: '',
        },
        validationSchema: Yup.object().shape({
            roleId: Yup.string().required("Wajib diisi"),
            roleName: Yup.string().required("Wajib diisi"),
        }),

        onSubmit: (values) => {
            props.setAppMaintainRoleMsg('')

            dispatch(editRole({
                roleName: values.roleName,
                roleId: values.roleId,
            }))

        }
    });

    useEffect(() => {
        if (!props.appEditMaintainRole) {
            appEditRoleValidInput.resetForm()
        } else {
            dispatch(getRoleDataAction({
                roleId: props.appMaintainRoleData.roleId
            }))
        }
    }, [props.appEditMaintainRole, props.appMaintainRoleData])

    useEffect(() => {
        appEditRoleValidInput.setFieldValue('roleId', appDetailMaintainRoleData?.data?.result?.roleId)
        appEditRoleValidInput.setFieldValue('roleName', appDetailMaintainRoleData?.data?.result?.roleName)
    }, [appDetailMaintainRoleData])

    return (
        <Container
            style={{ display: props.appEditMaintainRole ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-pencil"></span> Ubah Role
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appEditRoleValidInput.handleSubmit();
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
                                            Kode Role <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            disabled
                                            type="text"
                                            value={appEditRoleValidInput.values.roleId}
                                            invalid={appEditRoleValidInput.touched.roleId && appEditRoleValidInput.errors.roleId
                                                ? true : false
                                            }
                                            onChange={(e) => appEditRoleValidInput.setFieldValue('roleId', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditRoleValidInput.errors.roleId}</FormFeedback>
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
                                            Role Name <span className="text-danger"> *</span>
                                        </Label>
                                    </div>
                                    <div className="col-8">
                                        <Input
                                            type="text"
                                            value={appEditRoleValidInput.values.roleName}
                                            invalid={appEditRoleValidInput.touched.roleName && appEditRoleValidInput.errors.roleName
                                                ? true : false
                                            }
                                            onChange={(e) => appEditRoleValidInput.setFieldValue('roleName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appEditRoleValidInput.errors.roleName}</FormFeedback>
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
                    props.setAppMaintainRole(true)
                    props.setAppEditMaintainRole(false)

                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
            <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
            </div>
        </Container>
    );
};

EditMaintainRole.propTypes = {
    appMaintainRoleData: PropTypes.any,
    appEditMaintainRole: PropTypes.any,
    setAppMaintainRole: PropTypes.any,
    setAppEditMaintainRole: PropTypes.any,
    setAppMaintainRoleMsg: PropTypes.any,
}

export default EditMaintainRole;
