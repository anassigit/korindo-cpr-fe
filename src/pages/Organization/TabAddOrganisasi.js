import Lovv2 from 'common/Lovv2';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, FormGroup, Input, Row, UncontrolledTooltip } from 'reactstrap';
import { getDeptListOrgLov, getOrganizationListData, resetMessage, saveMappingDept } from 'store/actions';
import * as Yup from 'yup';

const TabAddOrganisasi = (props) => {

  const dispatch = useDispatch()

  const appMsgAdd = useSelector((state) => {
    return state.organizationReducer.msgAdd
  })

  const appAddOrganizationMasterValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
      org_cd: '',
      deptId: '',
      deptName: '',
    },
    validationSchema: Yup.object().shape({
      deptId: Yup.string().required("Wajib diisi"),
    }),

    onSubmit: (values) => {
      props.setAppOrganizationMsg('')
      dispatch(saveMappingDept({
        org_cd: values.org_cd,
        deptId: values.deptId,
      }))
    }
  });

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  const [appDepartmentLovSearch, setAppDepartmentLovSearch] = useState('');

  const appDepartmentColumnLov = [
    {
      dataField: "deptId",
      text: "Department ID",
      sort: true,
      style: { textAlign: 'center' },
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "deptName",
      text: "Nama Department",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "deptNameKor",
      text: "Nama Department (Korean)",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
  ]

  const appCallBackDepartment = (e) => {
    appAddOrganizationMasterValidInput.setFieldValue('deptId', e.deptId)
    appAddOrganizationMasterValidInput.setFieldValue('deptName', e.deptName)
  }

  useEffect(() => {
    if (props.selectedDeptData) {
      appAddOrganizationMasterValidInput.setFieldValue('org_cd', props.selectedDeptData.org_id)
    }
  }, [props.selectedDeptData])

  useEffect(() => {
    if (appMsgAdd) {
      props.setAppOrganizationMsg(appMsgAdd)
      dispatch(getOrganizationListData())
    }
  }, [appMsgAdd])

  return (
    <React.Fragment>
      {
        props.appTabAdd &&
        (<Form
          onSubmit={(e) => {
            e.preventDefault();
            appAddOrganizationMasterValidInput.handleSubmit();
            return false
          }}
        >
          <FormGroup>
            <div
              className='m-3'
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25em',
              }}

            >
              <Row
                style={{
                  width: '450px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    Kode Department <span className='text-danger'>*</span>
                  </div>
                  <div style={{ width: '250px' }}>
                    <div style={{ width: '185px' }}>
                      <Lovv2
                        title="Kode Department"
                        keyFieldData="deptId"
                        columns={appDepartmentColumnLov}
                        getData={getDeptListOrgLov}
                        pageSize={10}
                        callbackFunc={appCallBackDepartment}
                        defaultSetInput="deptId"
                        invalidData={appAddOrganizationMasterValidInput}
                        fieldValue="deptId"
                        stateSearchInput={appDepartmentLovSearch}
                        stateSearchInputSet={setAppDepartmentLovSearch}
                        touchedLovField={appAddOrganizationMasterValidInput.touched.deptId}
                        errorLovField={appAddOrganizationMasterValidInput.errors.deptId}
                      />
                    </div>
                  </div>
                </div>
              </Row>
              <Row
                style={{
                  width: '450px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    Nama Department <span className='text-danger'>*</span>
                  </div>
                  <div style={{ width: '250px' }}>
                    <div style={{ width: '250px' }}>
                      <Input
                        value={appAddOrganizationMasterValidInput.values.deptName}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </Row>
              <Row
                style={{
                  width: '450px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    Kode Induk <span className='text-danger'>*</span>
                  </div>
                  <div style={{ width: '250px' }}>
                    <div style={{ width: '185px' }}>
                      <Input
                        value={props.selectedDeptData.org_parent_id}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </Row>
              <Row
                style={{
                  width: '450px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    Kode Organisasi <span className='text-danger'>*</span>
                  </div>
                  <div style={{ width: '250px' }}>
                    <div style={{ width: '185px' }}>
                      <Input
                        value={props.selectedDeptData.org_id}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </Row>
              <Row
                style={{
                  width: '450px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    Level <span className='text-danger'>*</span>
                  </div>
                  <div style={{ width: '250px' }}>
                    <div style={{ width: '100px' }}>
                      <Input
                        value={props.selectedDeptData.dept_level_cd}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </Row>
              <Col style={{
                display: 'flex',
                gap: '8px',
              }}>
                <Button
                  type='submit'
                >
                  Submit
                </Button>
                <Button className='btn-danger'>
                  Delete
                </Button>
              </Col>
            </div>
          </FormGroup>
        </Form>)
      }
    </React.Fragment>

  )
}

TabAddOrganisasi.propTypes = {
  selectedDeptData: PropTypes.any,
  appTabAdd: PropTypes.any,
  setAppOrganizationMsg: PropTypes.any,
}

export default TabAddOrganisasi
