import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { UncontrolledTooltip } from 'reactstrap';
import TableCustomNoPage from 'common/TableCustomNoPage';
import { useSelector } from 'react-redux';
import { getMemberListDataAction, getMemberListOrgData } from 'store/actions';

const TabAddKaryawan = (props) => {

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
      orgCd: "",
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
            <a id={`edit-${cellData.memberCd}`} className="mdi mdi-pencil text-primary" onClick={() => preEditEmployeeOf(cellData)} />
            <a id={`delete-${cellData.memberCd}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
            <UncontrolledTooltip target={`edit-${cellData.memberCd}`}>Edit</UncontrolledTooltip>
            <UncontrolledTooltip target={`delete-${cellData.memberCd}`}>Delete</UncontrolledTooltip>
          </React.Fragment>
        )
      }
    },
  ]

  return (
    <div style={{ height: '100%', margin: '0 1px 0 1px' }}>
      {
        props.appAddKaryawan && (
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
        )
      }
    </div>
  )
}

TabAddKaryawan.propTypes = {
  appAddKaryawan: PropTypes.any,
}

export default TabAddKaryawan
