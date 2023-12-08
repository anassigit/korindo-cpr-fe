import TableCustomNoPage from 'common/TableCustomNoPage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, UncontrolledTooltip } from 'reactstrap';
import { deleteMappingMember, getMemberListOrgData } from 'store/actions';
import ModalKaryawan from './ModalKaryawan';
import MsgModal from 'components/Common/MsgModal';

const TabAddKaryawan = (props) => {

  const dispatch = useDispatch()

  const [modal, setModal] = useState()
  const [modalDelete, setModalDelete] = useState()
  const [isAdd, setIsAdd] = useState(false)

  const [memberId, setMemberId] = useState()
  const [searchVal, setSearchVal] = useState()

  const appMemberListData = useSelector((state) => {
    return state.organizationReducer.respGetMemberListOrg
  });

  const appMsgDelete = useSelector((state) => {
    return state.organizationReducer.msgDelete
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
      search: searchVal,
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
            <a id={`edit-${cellData.memberId}`} className="mdi mdi-pencil text-primary" onClick={() => {
              setIsAdd(false)
              toggle(cellData)
            }} />
            <a id={`delete-${cellData.memberId}`} className="mdi mdi-delete text-danger" onClick={() => {
              toggleDeleteModal(cellData)
            }} />
            <UncontrolledTooltip target={`edit-${cellData.memberId}`}>Edit</UncontrolledTooltip>
            <UncontrolledTooltip target={`delete-${cellData.memberId}`}>Delete</UncontrolledTooltip>
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
            ...prevState.search,
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
    setModalDelete(!modalDelete)
    dispatch(deleteMappingMember({
      memberId: memberId
    }))
  }

  const toggleDeleteModal = (data) => {
    if (data.memberId) {
      setMemberId(data.memberId)
    }
    setModalDelete(!modalDelete)
  }

  useEffect(() => {
    if (appMemberListData) {
      props.setLoadingSpinner(false)
    }
  }, [appMemberListData])

  useEffect(() => {
    if (appMsgDelete.status) {
      dispatch(getMemberListOrgData(
        setAppMemberTabelSearch((prevState) => {
          return {
            ...prevState,
            search: {
              ...prevState.search,
              search: searchVal,
            },
          };
        })
      ))
    }
  }, [appMsgDelete])

  const handleSearch = () => {
    dispatch(getMemberListOrgData(
      setAppMemberTabelSearch((prevState) => {
        return {
          ...prevState,
          search: {
            ...prevState.search,
            search: searchVal,
          },
        };
      })
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
                  <Input
                    type='search'
                    value={searchVal}
                    onChange={(e) => {
                      setSearchVal(e.target.value)
                    }}
                    onKeyDown={handleKeyPress}
                  />
                </div>
                <div>
                  <Button onClick={handleSearch}>Search</Button>
                </div>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setIsAdd(true)
                    toggle()
                  }}
                >
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
              isAdd={isAdd}
              selectedDeptData={props.selectedDeptData}
              setAppOrganizationMsg={props.setAppOrganizationMsg}
              setLoadingSpinner={props.setLoadingSpinner}
              appMemberTabelSearch={appMemberTabelSearch}
            />
            <MsgModal
              toggle={toggleDeleteModal}
              toggleApply={toggleApply}
              modal={modalDelete}
              message={'Apakah anda yakin untuk menghapus ini?'}
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
