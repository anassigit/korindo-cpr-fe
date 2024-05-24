<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react"
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
import DatePicker from "react-datepicker";
import Select, { components } from "react-select"
import { useFormik } from "formik"
import { format } from "prettier"
import { AddScheduleAction } from "store/actions"
import { useDispatch } from "react-redux"
import * as Yup from "yup"

const AddSchedule = props => {
  const datepickerRef = useRef(null)
  const dispatch = useDispatch()

  const [selectedMulti2, setSelectedMulti2] = useState([])
  const [selectedMultiInterviewer, setSelectedMultiInterviewer] = useState([])

  function handleMulti2(s) {
    const currentSelection = selectedMulti2.map(item => item.value)

    const addedValues = s.filter(item => !currentSelection.includes(item.value))
    const deletedValues = currentSelection.filter(
      item => !s.some(selectedItem => selectedItem.value === item)
    )

    addedValues.forEach(addedItem => {
      setAddUser(current => [...current, addedItem.value])
    })

    deletedValues.forEach(deletedItem => {
      setRemoveUser(current => [...current, deletedItem])
    })

    setselectedMulti2(s)
  }

  const colourStyles2 = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? "white" : "white",
      borderColor: state.isSelected ? "white" : "white",
      borderColor: state.isFocused ? "white" : "white",
      borderColor: state.isDisabled ? "white" : "white",
      border: 0,
      boxShadow: "none",
    }),

    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = data.bgColor
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? "#e6e6e6"
          : undefined,
        color: isDisabled ? "#ccc" : isSelected ? "white" : "black", // <-- Updated line here
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color
            : undefined,
        },
      }
    },

    multiValue: (styles, { data }) => {
      const color = data.bgColor
      return {
        ...styles,
        backgroundColor: "#579DFF",
      }
    },

    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "white",
      fontSize: "13px",
      paddingLeft: "12px",
      paddingRight: "12px",
      paddingTop: "7.5px",
      paddingBottom: "7.5px",
      borderRadius: "4px",
    }),

    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "white",
      ":hover": {
        backgroundColor: data.bgColor,
        color: "white",
      },
    }),
  }

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <i className="mdi mdi-plus-thick" />
      </components.DropdownIndicator>
    )
  }

  //   useEffect(() => {
  //     const inputElement = datepickerRef.current.input
  //     inputElement.addEventListener("keydown", handleDateInputKeyDown)
  //     inputElement.addEventListener("paste", handleDateInputPaste)

  //     return () => {
  //       inputElement.removeEventListener("keydown", handleDateInputKeyDown)
  //       inputElement.removeEventListener("paste", handleDateInputPaste)
  //     }
  //   }, [])

  const handleDateInputKeyDown = event => {
    event.preventDefault()
  }

  const handleDateInputPaste = event => {
    event.preventDefault()
  }

  const AddScheduleValidInputFormik = useFormik({
    enableReinitialize: true,

    initialValues: {
      interview_date: "",
      interview_hour: "",
      interview_url: "",
      interviewer_list: "", // ini bakal list ato map
    },
    validationSchema: Yup.object().shape({
      interview_date: Yup.date().required("Interview date is required"),
      interview_hour: Yup.string().required("Interview hour is required"),
      interview_url: Yup.string().required("Interview url is required"),
      interview_list: Yup.date().required("Interview date is required"),
    }),
    onSubmit: values => {
      dispatch(
        AddScheduleAction({
          interview_date: values.interview_date,
          interview_hour: values.interview_hour,
          interview_url: values.interview_url,
          interviewer_list: values.interview_date,
        })
      )
    },
  })

  useEffect(() => {
    if (props.appAddSchedule) {
      AddScheduleValidInputFormik.resetForm()
    }
  }, [props.appAddSchedule])

  return (
    <Container
      style={{ display: props.appAddSchedule ? "block" : "none" }}
      fluid
    >
      <Card>
        <CardHeader>
        <span className="mdi mdi-calendar-outline" style={{marginRight:"3px"}}/>
            Create New Schedule
            </CardHeader>
        <CardBody>
          <FormGroup>
            <div className="col-4">
              <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                <div className="col-4">
                  <Label
                    style={{
                      marginTop: "2px",
                    }}
                  >
                    {"Date"} <span className="text-danger"> *</span>
                  </Label>
                </div>
                <div className="col-8" style={{ marginTop: "-8px" }}>
                  <DatePicker
                    name="insDate"
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    ref={datepickerRef}
                    onChange={date => {
                      handleChangeDate(date)
                      AddScheduleValidInputFormik.handleChange("insDate", date)
                      AddScheduleValidInputFormik.setFieldTouched("insDate", true)
                    }}
                    selected={
                      AddScheduleValidInputFormik.values.insDate
                        ? new Date(AddScheduleValidInputFormik.values.insDate)
                        : null
                    }
                    isClearable={false}
                    invalid={
                      AddScheduleValidInputFormik.touched.insDate &&
                      AddScheduleValidInputFormik.errors.insDate
                        ? true
                        : false
                    }
                  />
                  {AddScheduleValidInputFormik.touched.insDate &&
                  AddScheduleValidInputFormik.errors.insDate ? (
                    <FormFeedback type="invalid">
                      {AddScheduleValidInputFormik.errors.insDate}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>
              <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                <div className="col-4">
                  <Label
                    style={{
                      marginTop: "2px",
                    }}
                  >
                    {"Time"} <span className="text-danger"> *</span>
                  </Label>
                </div>
                <div className="col-8" style={{ marginTop: "-8px" }}>
                  <Input
                    type="text"
                    //   value={AddScheduleValidInputFormik.values.roleName}
                    //   invalid={
                    //     AddScheduleValidInputFormik.touched.roleName &&
                    //     AddScheduleValidInputFormik.errors.roleName
                    //       ? true
                    //       : false
                    //   }
                    //   onChange={e =>
                    //     AddScheduleValidInputFormik.setFieldValue("roleName", e.target.value)
                    //   }
                  />
                  <FormFeedback type="invalid">
                    {AddScheduleValidInputFormik.errors.insDate}
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
                    {"Interview Link"} <span className="text-danger"> *</span>
                  </Label>
                </div>
                <div className="col-8" style={{ marginTop: "-8px" }}>
                  <Input
                    type="text"
                    //   value={AddScheduleValidInputFormik.values.roleName}
                    //   invalid={
                    //     AddScheduleValidInputFormik.touched.roleName &&
                    //     AddScheduleValidInputFormik.errors.roleName
                    //       ? true
                    //       : false
                    //   }
                    //   onChange={e =>
                    //     AddScheduleValidInputFormik.setFieldValue("roleName", e.target.value)
                    //   }
                  />
                  <FormFeedback type="invalid">
                    {AddScheduleValidInputFormik.errors.insDate}
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
                    {"Interviewer"} <span className="text-danger"> *</span>
                  </Label>
                </div>
                <div className="col-8" style={{ marginTop: "-8px" }}>
                  <Select
                    value={selectedMulti2}
                    isMulti={true}
                    onChange={e => handleMulti2(e)}
                    styles={colourStyles2}
                    components={{ DropdownIndicator: DropdownIndicator }}
                    placholder={"Select or Type"}
                  />
                  <FormFeedback type="invalid">
                    {AddScheduleValidInputFormik.errors.insDate}
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
        </CardBody>
      </Card>
      <Button
        className="btn btn-danger my-2"
        onClick={() => {
          props.setAppDashboard(true)
          props.setAppAddSchedule(false)
        }}
      >
        <span className="mdi mdi-arrow-left" />
        {"Back"}
      </Button>
    </Container>
  )
}

AddSchedule.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  appAddSchedule: PropTypes.any,
  setAppAddSchedule: PropTypes.any,
  setAppDashboard: PropTypes.any,
}

export default withTranslation()(AddSchedule)
=======
import React, { useState, useEffect, useRef } from "react"
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
import DatePicker from "react-datepicker";
import Select, { components } from "react-select"
import { useFormik } from "formik"
import { format } from "prettier"
import { AddScheduleAction } from "store/actions"
import { useDispatch } from "react-redux"
import * as Yup from "yup"

const AddSchedule = props => {
  const datepickerRef = useRef(null)
  const dispatch = useDispatch()

  const [selectedMulti2, setSelectedMulti2] = useState([])
  const [selectedMultiInterviewer, setSelectedMultiInterviewer] = useState([])

  function handleMulti2(s) {
    const currentSelection = selectedMulti2.map(item => item.value)

    const addedValues = s.filter(item => !currentSelection.includes(item.value))
    const deletedValues = currentSelection.filter(
      item => !s.some(selectedItem => selectedItem.value === item)
    )

    addedValues.forEach(addedItem => {
      setAddUser(current => [...current, addedItem.value])
    })

    deletedValues.forEach(deletedItem => {
      setRemoveUser(current => [...current, deletedItem])
    })

    setselectedMulti2(s)
  }

  const colourStyles2 = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? "white" : "white",
      borderColor: state.isSelected ? "white" : "white",
      borderColor: state.isFocused ? "white" : "white",
      borderColor: state.isDisabled ? "white" : "white",
      border: 0,
      boxShadow: "none",
    }),

    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = data.bgColor
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? "#e6e6e6"
          : undefined,
        color: isDisabled ? "#ccc" : isSelected ? "white" : "black", // <-- Updated line here
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color
            : undefined,
        },
      }
    },

    multiValue: (styles, { data }) => {
      const color = data.bgColor
      return {
        ...styles,
        backgroundColor: "#579DFF",
      }
    },

    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "white",
      fontSize: "13px",
      paddingLeft: "12px",
      paddingRight: "12px",
      paddingTop: "7.5px",
      paddingBottom: "7.5px",
      borderRadius: "4px",
    }),

    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "white",
      ":hover": {
        backgroundColor: data.bgColor,
        color: "white",
      },
    }),
  }

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <i className="mdi mdi-plus-thick" />
      </components.DropdownIndicator>
    )
  }

  //   useEffect(() => {
  //     const inputElement = datepickerRef.current.input
  //     inputElement.addEventListener("keydown", handleDateInputKeyDown)
  //     inputElement.addEventListener("paste", handleDateInputPaste)

  //     return () => {
  //       inputElement.removeEventListener("keydown", handleDateInputKeyDown)
  //       inputElement.removeEventListener("paste", handleDateInputPaste)
  //     }
  //   }, [])

  const handleDateInputKeyDown = event => {
    event.preventDefault()
  }

  const handleDateInputPaste = event => {
    event.preventDefault()
  }

  const AddScheduleValidInputFormik = useFormik({
    enableReinitialize: true,

    initialValues: {
      interview_date: "",
      interview_hour: "",
      interview_url: "",
      interviewer_list: "", // ini bakal list ato map
    },
    validationSchema: Yup.object().shape({
      interview_date: Yup.date().required("Interview date is required"),
      interview_hour: Yup.string().required("Interview hour is required"),
      interview_url: Yup.string().required("Interview url is required"),
      interview_list: Yup.date().required("Interview date is required"),
    }),
    onSubmit: values => {
      dispatch(
        AddScheduleAction({
          interview_date: values.interview_date,
          interview_hour: values.interview_hour,
          interview_url: values.interview_url,
          interviewer_list: values.interview_date,
        })
      )
    },
  })

  useEffect(() => {
    if (props.appAddSchedule) {
      AddScheduleValidInputFormik.resetForm()
    }
  }, [props.appAddSchedule])

  return (
    <Container
      style={{ display: props.appAddSchedule ? "block" : "none" }}
      fluid
    >
      <Card>
        <CardHeader>
        <span className="mdi mdi-calendar-outline" style={{marginRight:"3px"}}/>
            Create New Schedule
            </CardHeader>
        <CardBody>
          <FormGroup>
            <div className="col-4">
              <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                <div className="col-4">
                  <Label
                    style={{
                      marginTop: "2px",
                    }}
                  >
                    {"Date"} <span className="text-danger"> *</span>
                  </Label>
                </div>
                <div className="col-8" style={{ marginTop: "-8px" }}>
                  <DatePicker
                    name="insDate"
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    ref={datepickerRef}
                    onChange={date => {
                      handleChangeDate(date)
                      AddScheduleValidInputFormik.handleChange("insDate", date)
                      AddScheduleValidInputFormik.setFieldTouched("insDate", true)
                    }}
                    selected={
                      AddScheduleValidInputFormik.values.insDate
                        ? new Date(AddScheduleValidInputFormik.values.insDate)
                        : null
                    }
                    isClearable={false}
                    invalid={
                      AddScheduleValidInputFormik.touched.insDate &&
                      AddScheduleValidInputFormik.errors.insDate
                        ? true
                        : false
                    }
                  />
                  {AddScheduleValidInputFormik.touched.insDate &&
                  AddScheduleValidInputFormik.errors.insDate ? (
                    <FormFeedback type="invalid">
                      {AddScheduleValidInputFormik.errors.insDate}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>
              <div className="d-flex flex-row col-10 align-items-center py-2 justify-content-between">
                <div className="col-4">
                  <Label
                    style={{
                      marginTop: "2px",
                    }}
                  >
                    {"Time"} <span className="text-danger"> *</span>
                  </Label>
                </div>
                <div className="col-8" style={{ marginTop: "-8px" }}>
                  <Input
                    type="text"
                    //   value={AddScheduleValidInputFormik.values.roleName}
                    //   invalid={
                    //     AddScheduleValidInputFormik.touched.roleName &&
                    //     AddScheduleValidInputFormik.errors.roleName
                    //       ? true
                    //       : false
                    //   }
                    //   onChange={e =>
                    //     AddScheduleValidInputFormik.setFieldValue("roleName", e.target.value)
                    //   }
                  />
                  <FormFeedback type="invalid">
                    {AddScheduleValidInputFormik.errors.insDate}
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
                    {"Interview Link"} <span className="text-danger"> *</span>
                  </Label>
                </div>
                <div className="col-8" style={{ marginTop: "-8px" }}>
                  <Input
                    type="text"
                    //   value={AddScheduleValidInputFormik.values.roleName}
                    //   invalid={
                    //     AddScheduleValidInputFormik.touched.roleName &&
                    //     AddScheduleValidInputFormik.errors.roleName
                    //       ? true
                    //       : false
                    //   }
                    //   onChange={e =>
                    //     AddScheduleValidInputFormik.setFieldValue("roleName", e.target.value)
                    //   }
                  />
                  <FormFeedback type="invalid">
                    {AddScheduleValidInputFormik.errors.insDate}
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
                    {"Interviewer"} <span className="text-danger"> *</span>
                  </Label>
                </div>
                <div className="col-8" style={{ marginTop: "-8px" }}>
                  <Select
                    value={selectedMulti2}
                    isMulti={true}
                    onChange={e => handleMulti2(e)}
                    styles={colourStyles2}
                    components={{ DropdownIndicator: DropdownIndicator }}
                    placholder={"Select or Type"}
                  />
                  <FormFeedback type="invalid">
                    {AddScheduleValidInputFormik.errors.insDate}
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
        </CardBody>
      </Card>
      <Button
        className="btn btn-danger my-2"
        onClick={() => {
          props.setAppDashboard(true)
          props.setAppAddSchedule(false)
        }}
      >
        <span className="mdi mdi-arrow-left" />
        {"Back"}
      </Button>
    </Container>
  )
}

AddSchedule.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  appAddSchedule: PropTypes.any,
  setAppAddSchedule: PropTypes.any,
  setAppDashboard: PropTypes.any,
}

export default withTranslation()(AddSchedule)
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
