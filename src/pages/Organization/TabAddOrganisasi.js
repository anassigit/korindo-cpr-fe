import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getDepartmentListDataAction, getDeptListOrgData } from 'store/actions';
import { Button, Col, Container, Form, FormGroup, Input, Row, UncontrolledTooltip } from 'reactstrap';
import TableCustom from 'common/TableCustom';
import { useSelector } from 'react-redux';
import TableCustomNoPage from 'common/TableCustomNoPage';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Lovv2 from 'common/Lovv2';

const TabAddOrganisasi = (props) => {

  const appDepartmentListData = useSelector((state) => {
    return state.organizationReducer.respGetDeptListOrg
  });

  const appAddOrganizationMasterValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
      org_cd: '',
      deptId: '',
    },
    validationSchema: Yup.object().shape({
      org_cd: Yup.string().required("Wajib diisi"),
      deptId: Yup.string().required("Wajib diisi"),
    }),

    onSubmit: (values) => {

    }
  });

  const [appDepartmentTabelSearch, setAppDepartmentTabelSearch] = useState('');

  const appDepartmentColumnLov = [
    {
      dataField: "departmentCd",
      text: "Department Code",
      sort: true,
      style: { textAlign: 'center' },
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "departmentName",
      text: "Nama Department",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "levelCd",
      text: "Level Code",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "levelName",
      text: "Nama Level",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "locationName",
      text: "Lokasi",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      text: "Actions",
      headerStyle: { textAlign: 'center' },
      style: { justifyContent: 'center', display: 'flex', gap: '1vw', fontSize: '16px' },
      formatter: (cellContent, cellData) => {
        return (
          <React.Fragment>
            <a id={`edit-${cellData.departmentCd}`} className="mdi mdi-pencil text-primary" onClick={() => preEditEmployeeOf(cellData)} />
            <a id={`delete-${cellData.departmentCd}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
            <UncontrolledTooltip target={`edit-${cellData.departmentCd}`}>Edit</UncontrolledTooltip>
            <UncontrolledTooltip target={`delete-${cellData.departmentCd}`}>Delete</UncontrolledTooltip>
          </React.Fragment>
        )
      }
    },
  ]

  const appCallBackDepartment = (e) => {
    appAddOrganizationMasterValidInput.setValues('deptId', e.deptId)
  }

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
                        keyFieldData="deptCd"
                        columns={appDepartmentColumnLov}
                        getData={getDeptListOrgData}
                        pageSize={10}
                        callbackFunc={appCallBackDepartment}
                        defaultSetInput="deptCd"
                        invalidData={appAddOrganizationMasterValidInput}
                        fieldValue="deptCd"
                        stateSearchInput={appDepartmentTabelSearch}
                        stateSearchInputSet={setAppDepartmentTabelSearch}
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
                      <Input />
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
                      <Input />
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
                      <Input />
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
                      <Input />
                    </div>
                  </div>
                </div>
              </Row>
              <Col style={{
                display: 'flex',
                gap: '8px',
              }}>
                <Button>
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
  appTabAdd: PropTypes.any,
}

export default TabAddOrganisasi
