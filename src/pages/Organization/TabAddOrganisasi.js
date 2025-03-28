import Lovv2 from 'common/Lovv2';
import MsgModal from 'components/Common/MsgModal';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, FormGroup, Input, Row, UncontrolledTooltip } from 'reactstrap';
import { deleteMappingDept, getDeptListOrgLov, getOrganizationListData, resetMessage, saveMappingDept } from 'store/actions';
import * as Yup from 'yup';

const TabAddOrganisasi = (props) => {

  const dispatch = useDispatch()
  const [onlyTabAdd, setOnlyTabAdd] = useState(false)
  
  const [modal, setModal] = useState(false)

  const appMsgAdd = useSelector((state) => {
    return state.organizationReducer.msgAdd
  })

  const appMsgDelete = useSelector((state) => {
    return state.organizationReducer.msgDelete
  })

  const appAddOrganizationMasterValidInput = useFormik({
    enableReinitialize: true,

    initialValues: {
      orgCd: '',
      deptCd: '',
      deptName: '',
    },
    validationSchema: Yup.object().shape({
      deptCd: Yup.string().required("Wajib diisi"),
    }),

    onSubmit: (values) => {
      props.setAppOrganizationMsg('')
      props.setLoadingSpinner(true)
      dispatch(saveMappingDept({
        orgCd: values.orgCd,
        deptCd: values.deptCd,
      }))
    }
  });

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  const [appDepartmentLovSearch, setAppDepartmentLovSearch] = useState('');

  const appDepartmentColumnLov = [
    {
      dataField: "deptCd",
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
    appAddOrganizationMasterValidInput.setFieldValue('deptCd', e.deptCd)
    appAddOrganizationMasterValidInput.setFieldValue('deptName', e.deptName)
  }

  useEffect(() => {
    if (props.selectedDeptData) {
      appAddOrganizationMasterValidInput.setFieldValue('orgCd', props.selectedDeptData.orgCd)
    }
  }, [props.selectedDeptData])

  const findDeptById = (orgCd, orgStructure) => {
    for (const department of orgStructure) {
      if (department.orgCd === orgCd) {
        if (department.childList.length === 1) {
          props.setCollapser((prevCollapser) => {
            return {
              ...prevCollapser,
              [props.selectedDeptData.orgParentCd]: false,
            }
          })
        }
      } else if (department.childList && department.childList.length > 0) {
        const result = findDeptById(orgCd, department.childList);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    if (appMsgAdd) {
      props.setAppOrganizationMsg(appMsgAdd)
      dispatch(getOrganizationListData())
      props.setCollapser((prevCollapser) => {
        return {
          ...prevCollapser,
          [props.selectedDeptData.orgCd]: true,
        }
      })
    }
  }, [appMsgAdd])

  useEffect(() => {
    if (appMsgDelete) {
      props.setAppOrganizationMsg(appMsgDelete)
      if (onlyTabAdd) {
        props.setSelectedDeptData({})
        setOnlyTabAdd(false)
      }
      dispatch(getOrganizationListData())
      findDeptById(props.selectedDeptData.orgParentCd, props.appOrganizationListData?.data?.result?.childList)

    }
  }, [appMsgDelete])

  const toggleDeleteModal = (str) => {
    setModal(!modal)
  }

  const toggleApply = () => {
    props.setLoadingSpinner(true)
    props.setAppOrganizationMsg('')
    setOnlyTabAdd(true)
    dispatch(deleteMappingDept({
      orgCd: props.selectedDeptData.orgCd
    }))
    setModal(!modal)
    // setLoadingSpinner(true)
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
                        getData={getDeptListOrgLov}
                        pageSize={10}
                        callbackFunc={appCallBackDepartment}
                        defaultSetInput="deptCd"
                        invalidData={appAddOrganizationMasterValidInput}
                        fieldValue="deptCd"
                        stateSearchInput={appDepartmentLovSearch}
                        stateSearchInputSet={setAppDepartmentLovSearch}
                        touchedLovField={appAddOrganizationMasterValidInput.touched.deptCd}
                        errorLovField={appAddOrganizationMasterValidInput.errors.deptCd}
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
                        value={appAddOrganizationMasterValidInput.values.deptName || ''}
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
                        value={props.selectedDeptData.orgParentCd || ''}
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
                        value={props.selectedDeptData.orgCd || ''}
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
                        value={props.selectedDeptData.deptLevelCd || ''}
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
                <Button className='btn-danger'
                  onClick={() => {
                    toggleDeleteModal('delete')
                  }}
                >
                  Delete
                </Button>
              </Col>
            </div>
          </FormGroup>
        </Form>)
      }

      <MsgModal
        toggle={toggleDeleteModal}
        toggleApply={toggleApply}
        modal={modal}
        message={'Apakah anda yakin untuk menghapus ini?'}
      />
    </React.Fragment>

  )
}

TabAddOrganisasi.propTypes = {
  appOrganizationListData: PropTypes.any,
  selectedDeptData: PropTypes.any,
  setSelectedDeptData: PropTypes.any,
  appTabAdd: PropTypes.any,
  setAppOrganizationMsg: PropTypes.any,
  setLoadingSpinner: PropTypes.any,
  setCollapser: PropTypes.any,
}

export default TabAddOrganisasi
