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
import { addRole, resetMessage } from "store/actions";
import * as Yup from "yup";
import '../../assets/scss/custom.scss';
import '../../config';

const AddMaintainRole = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const appAddRoleValidInput = useFormik({
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

            dispatch(addRole({
                roleName: values.roleName,
                roleId: values.roleId,
            }))

        }
    });

    useEffect(() => {
        if (props.appAddMaintainRole) {
            appAddRoleValidInput.resetForm()
        }
    }, [props.appAddMaintainRole])

    return (
        <Container
            style={{ display: props.appAddMaintainRole ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-plus"></span> Tambah Role
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            appAddRoleValidInput.handleSubmit();
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
                                            type="text"
                                            value={appAddRoleValidInput.values.roleId}
                                            invalid={appAddRoleValidInput.touched.roleId && appAddRoleValidInput.errors.roleId
                                                ? true : false
                                            }
                                            onChange={(e) => appAddRoleValidInput.setFieldValue('roleId', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddRoleValidInput.errors.roleId}</FormFeedback>
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
                                            value={appAddRoleValidInput.values.roleName}
                                            invalid={appAddRoleValidInput.touched.roleName && appAddRoleValidInput.errors.roleName
                                                ? true : false
                                            }
                                            onChange={(e) => appAddRoleValidInput.setFieldValue('roleName', e.target.value)}
                                        />
                                        <FormFeedback type="invalid">{appAddRoleValidInput.errors.roleName}</FormFeedback>
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
                    props.setAppAddMaintainRole(false)

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

AddMaintainRole.propTypes = {
    appAddMaintainRole: PropTypes.any,
    setAppMaintainRole: PropTypes.any,
    setAppAddMaintainRole: PropTypes.any,
    setAppMaintainRoleMsg: PropTypes.any,
}

export default AddMaintainRole;
