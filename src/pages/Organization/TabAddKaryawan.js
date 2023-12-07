import TableCustomNoPage from 'common/TableCustomNoPage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, UncontrolledTooltip } from 'reactstrap';
import { getMemberListOrgData } from 'store/actions';
import ModalKaryawan from './ModalKaryawan';

const TabAddKaryawan = (props) => {

  const [modal, setModal] = useState()

  const appMemberListData = useSelector((state) => {
    return state.organizationReducer.respGetMemberListOrg
  });

  const [appMemberTabelSearch, setAppMemberTabelSearch] = useState({
    page: 1,
    limit: 10,
    offset: 0,
    sort: "",
    order: "",
    search:
    {
      orgCd: props.selectedDeptData.orgCd,
    }
  });

  const appMemberColumn = [
    {
      dataField: "memberId",
      text: "Member ID",
      sort: true,
      style: { textAlign: 'center' },
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "memberName",
      text: "Nama",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "deptName",
      text: "Department",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "memberName",
      text: "Jabatan",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    // {
    //   dataField: "locationName",
    //   text: "Handphone",
    //   sort: true,
    //   headerStyle: { textAlign: 'center' },
    // },
    {
      text: "Actions",
      headerStyle: { textAlign: 'center' },
      style: { justifyContent: 'center', display: 'flex', gap: '1vw', fontSize: '16px' },
      formatter: (cellContent, cellData) => {
        return (
          <React.Fragment>
            <a id={`edit-${cellData.memberCd}`} className="mdi mdi-pencil text-primary" onClick={() => toggle(cellData)} />
            <a id={`delete-${cellData.memberCd}`} className="mdi mdi-delete text-danger" onClick={() => toggle(cellData)} />
            <UncontrolledTooltip target={`edit-${cellData.memberCd}`}>Edit</UncontrolledTooltip>
            <UncontrolledTooltip target={`delete-${cellData.memberCd}`}>Delete</UncontrolledTooltip>
          </React.Fragment>
        )
      }
    },
  ]

  useEffect(() => {
    if (props.selectedDeptData) {
      setAppMemberTabelSearch((prevState) => {
        return {
          ...prevState,
          search: {
            orgCd: props.selectedDeptData.orgCd,
          },
        };
      })
    }
  }, [props.selectedDeptData])

  const toggle = () => {
    setModal(!modal)
  }

  const toggleApply = () => {
    setModal(!modal)
  }

  return (
    <div style={{ height: '100%', margin: '0 1px 0 1px' }}>
      {
        props.appTabAddKaryawan && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
              className='m-3'
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                className='col-lg-5 col-10'
              >
                <Input
                  type='select'
                >
                  <option>
                    Name
                  </option>
                </Input>
                <div
                  className='col-lg-7 col-6 mx-3'
                >
                  <Input />
                </div>
                <div>
                  <Button>
                    Search
                  </Button>
                </div>
              </div>
              <div>
                <Button>
                  <span className='mdi mdi-plus' />Add
                </Button>
              </div>
            </div>
            <TableCustomNoPage
              keyField={"memberId"}
              columns={appMemberColumn}
              redukResponse={appMemberListData}
              appdata={appMemberListData?.data != null && appMemberListData?.data.list ? appMemberListData?.data.list : []}
              appdataTotal={appMemberListData?.data != null ? appMemberListData?.data.count : 0}
              searchSet={setAppMemberTabelSearch}
              searchGet={appMemberTabelSearch}
              redukCall={getMemberListOrgData}
            />
            <ModalKaryawan
              modal={modal}
              toggle={toggle}
              toggleApply={toggleApply}
            />
          </>
        )
      }
    </div >
  )
}

TabAddKaryawan.propTypes = {
  selectedDeptData: PropTypes.any,
  appTabAddKaryawan: PropTypes.any,
  setAppOrganizationMsg: PropTypes.any,
  setLoadingSpinner: PropTypes.any,
}

export default TabAddKaryawan
