import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import "../../config"
import RootPageCustom from "../../common/RootPageCustom"
import BootstrapTable from "react-bootstrap-table-next"
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
  UncontrolledAlert,
} from "reactstrap"
import TableCustom from "common/TableCustom"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import { useFormik } from "formik"
import * as Yup from "yup"
import { addProjectList, resetMessage } from "store/actions"
import { useDispatch } from "react-redux"

const AddTask = props => {
  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])


  const addTaskFormik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: "",
      description: "",
      applicant_name: "",
      applicant_email: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("description is required"),
      applicant_name: Yup.string().required("Applicant Name is required"),
      applicant_email: Yup.string().required("Applicant Email is required"),
    }),
    onSubmit: values => {
      debugger
      dispatch(
        addProjectList({
          title: values.title,
          description: values.description,
          applicant_name: values.applicant_name,
          applicant_email: values.applicant_email,
        })
      )
    },
  })

  useEffect(() => {
    if (props.appAddTask) {
      addTaskFormik.resetForm()
    }
  }, [props.appAddTask])

  return (
    <Container style={{ display: props.appAddTask ? "block" : "none" }} fluid>
      <Card>
        <CardHeader>Create New Task</CardHeader>
        <CardBody>
          <Form
            onSubmit={e => {
              e.preventDefault()
              addTaskFormik.handleSubmit()
              return false
            }}
          >
            <FormGroup>
              <div className="col-4">
                <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                  <div className="col-4">
                    <Label
                      style={{
                        marginTop: "2px",
                      }}
                    >
                      {"Title"} <span className="text-danger"> *</span>
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                        value={addTaskFormik.values.title}
                        invalid={
                          addTaskFormik.touched.title &&
                          addTaskFormik.errors.title
                            ? true
                            : false
                        }
                        onChange={e =>
                          addTaskFormik.setFieldValue("title", e.target.value)
                        }
                    />
                    <FormFeedback type="invalid">
                      {addTaskFormik.errors.title}
                    </FormFeedback>
                  </div>
                </div>
                <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                  <div className="col-4">
                    <Label
                      style={{
                        marginTop: "2px",
                      }}
                    >
                      {"Description"}
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                      value={addTaskFormik.values.description}
                      invalid={
                        addTaskFormik.touched.description &&
                        addTaskFormik.errors.description
                          ? true
                          : false
                      }
                      onChange={e =>
                        addTaskFormik.setFieldValue("description", e.target.value)
                      }
                    />
                    <FormFeedback type="invalid">
                      {addTaskFormik.errors.description}
                    </FormFeedback>
                  </div>
                </div>
                <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                  <div className="col-4">
                    <Label
                      style={{
                        marginTop: "2px",
                      }}
                    >
                      {"Applicant Name"} <span className="text-danger"> *</span>
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                        value={addTaskFormik.values.applicant_name}
                        invalid={
                          addTaskFormik.touched.applicant_name &&
                          addTaskFormik.errors.applicant_name
                            ? true
                            : false
                        }
                        onChange={e =>
                          addTaskFormik.setFieldValue("applicant_name", e.target.value)
                        }
                    />
                    <FormFeedback type="invalid">
                      {addTaskFormik.errors.applicant_name}
                    </FormFeedback>
                  </div>
                </div>
                <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                  <div className="col-4">
                    <Label
                      style={{
                        marginTop: "2px",
                      }}
                    >
                      {"Applicant Email"}{" "}
                      <span className="text-danger"> *</span>
                    </Label>
                  </div>
                  <div className="col-8" style={{ marginTop: "-8px" }}>
                    <Input
                      type="text"
                        value={addTaskFormik.values.applicant_email}
                        invalid={
                          addTaskFormik.touched.applicant_email &&
                          addTaskFormik.errors.applicant_email
                            ? true
                            : false
                        }
                        onChange={e =>
                          addTaskFormik.setFieldValue("applicant_email", e.target.value)
                        }
                    />
                    <FormFeedback type="invalid">
                      {addTaskFormik.errors.applicant_email}
                    </FormFeedback>
                  </div>
                </div>
                <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                  <div className="col-4">
                    <Label
                      style={{
                        marginTop: "4px",
                        whiteSpace: "nowrap",
                      }}
                    ></Label>
                  </div>
                  <div className="col-8">
                    <Button type="submit">{"Submit"}</Button>
                  </div>
                </div>
              </div>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>

      <Button
        className="btn btn-danger my-2"
        onClick={() => {
          props.setAppDashboard(true)
          props.setAppAddTask(false)
        }}
      >
        <span className="mdi mdi-arrow-left" />
        {"Back"}
      </Button>
    </Container>
  )
}

AddTask.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  appAddTask: PropTypes.any,
  setAppAddTask: PropTypes.any,
  setAppDashboard: PropTypes.any,
}

export default withTranslation()(AddTask)
