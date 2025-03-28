import TableCustomNoPage from 'common/TableCustomNoPage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, UncontrolledTooltip } from 'reactstrap';
import { deleteMappingMember, editMappingMember, getMemberListOrgData } from 'store/actions';
import ModalKaryawan from './ModalKaryawan';
import MsgModal from 'components/Common/MsgModal';

const TabAddKaryawan = (props) => {

  const dispatch = useDispatch()

  const [modal, setModal] = useState()
  const [modalDelete, setModalDelete] = useState()
  const [isAdd, setIsAdd] = useState(false)

  const [selectedDeptData2, setSelectedDeptData2] = useState({})
  const [memberId, setMemberId] = useState()
  const [searchVal, setSearchVal] = useState()

  const appMemberListData = useSelector((state) => {
    return state.organizationReducer.respGetMemberListOrg
  });

  const appMsgEdit = useSelector((state) => {
    return state.organizationReducer.msgEdit
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
      text: "Karyawan ID",
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
      dataField: "positionName",
      text: "Jabatan",
      sort: true,
      headerStyle: { textAlign: 'center' },
    },
    {
      text: "Actions",
      headerStyle: { textAlign: 'center' },
      style: { justifyContent: 'center', alignItems: 'center', display: 'flex', gap: '1vw', fontSize: '16px' },
      formatter: (cellContent, cellData) => {
        return (
          <React.Fragment>
            <svg id={`move-${cellData.memberId.toString().replace(/\t/g, '')}`} onClick={() => {
              setIsAdd(false)
              toggle(cellData)
            }}
              xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="18px" fill="#A084DC"><g><rect fill="none" height="24" width="24" /></g><g><g><path d="M3,13c0-2.45,1.76-4.47,4.08-4.91L5.59,9.59L7,11l4-4.01L7,3L5.59,4.41l1.58,1.58l0,0.06C3.7,6.46,1,9.42,1,13 c0,3.87,3.13,7,7,7h3v-2H8C5.24,18,3,15.76,3,13z" /><path d="M13,13v7h9v-7H13z M20,18h-5v-3h5V18z" /><rect height="7" width="9" x="13" y="4" /></g></g></svg>
            <a id={`delete-${cellData.memberId.toString().replace(/\t/g, '')}`} className="mdi mdi-delete text-danger" onClick={() => {
              toggleDeleteModal(cellData)
            }} />
            <UncontrolledTooltip target={`move-${cellData.memberId.toString().replace(/\t/g, '')}`}>Move</UncontrolledTooltip>
            <UncontrolledTooltip target={`delete-${cellData.memberId.toString().replace(/\t/g, '')}`}>Delete</UncontrolledTooltip>
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

  const toggle = (data) => {
    if (data?.memberId) {
      setMemberId(data.memberId)
    } else {
      setMemberId(null)
      setSelectedDeptData2({})
    }
    setModal(!modal)
  }

  const toggleApply = () => {
    setModal(!modal)
    dispatch(editMappingMember({
      orgCd: selectedDeptData2.orgCd,
      memberId: memberId
    }))
  }

  const toggleApplyDelete = () => {
    setModalDelete(!modalDelete)
    dispatch(deleteMappingMember({
      memberId: memberId
    }))
  }

  const toggleDeleteModal = (data) => {
    if (data?.memberId) {
      setMemberId(data.memberId)
    } else {
      setMemberId(null)
      setSelectedDeptData2({})
    }
    setModalDelete(!modalDelete)
  }

  useEffect(() => {
    if (appMemberListData) {
      props.setLoadingSpinner(false)
    }
  }, [appMemberListData])

  useEffect(() => {
    if (appMsgEdit.status) {
      props.setLoadingSpinner(true)
      setAppMemberTabelSearch((prevState) => {
        return {
          ...prevState,
          search: {
            ...prevState.search,
            search: searchVal,
          },
        };
      })
    }
  }, [appMsgEdit])

  useEffect(() => {
    if (appMsgDelete.status) {
      props.setLoadingSpinner(true)
      setAppMemberTabelSearch((prevState) => {
        return {
          ...prevState,
          search: {
            ...prevState.search,
            search: searchVal,
          },
        };
      })
    }
  }, [appMsgDelete])

  const handleSearch = () => {
    setAppMemberTabelSearch((prevState) => {
      return {
        ...prevState,
        search: {
          ...prevState.search,
          search: searchVal,
        },
      };
    })
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
                  disabled={props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? false : true}
                  style={{
                    backgroundColor: props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? '' : '#A9A9A9',
                    borderColor: props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? '' : '#A9A9A9',
                    marginRight: '.5rem'
                  }}
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
              selectedDeptData2={selectedDeptData2}
              setSelectedDeptData2={setSelectedDeptData2}
            />
            <MsgModal
              toggle={toggleDeleteModal}
              toggleApply={toggleApplyDelete}
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
