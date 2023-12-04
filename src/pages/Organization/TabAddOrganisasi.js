import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getDepartmentListDataAction, getDeptListOrgData } from 'store/actions';
import { UncontrolledTooltip } from 'reactstrap';
import TableCustom from 'common/TableCustom';
import { useSelector } from 'react-redux';
import TableCustomNoPage from 'common/TableCustomNoPage';

const TabAddOrganisasi = (props) => {

  const appDepartmentListData = useSelector((state) => {
    return state.organizationReducer.respGetDeptListOrg
  });

  const [appDepartmentTabelSearch, setAppDepartmentTabelSearch] = useState({
    page: 1,
    limit: 15,
    offset: 0,
    sort: "",
    order: "",
    search:
    {
      search: "",
    }
  });

  const appDepartmentColumn = [
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

  return (
    <div
      hidden={!props.appTabAdd}
    >

      <TableCustomNoPage
        keyField={"departmentCd"}
        columns={appDepartmentColumn}
        redukResponse={appDepartmentListData}
        appdata={appDepartmentListData?.data != null && appDepartmentListData?.data.list ? appDepartmentListData?.data.list : []}
        appdataTotal={appDepartmentListData?.data != null ? appDepartmentListData?.data.count : 0}
        searchSet={setAppDepartmentTabelSearch}
        searchGet={appDepartmentTabelSearch}
        redukCall={getDeptListOrgData}

      />
    </div>
  )
}

TabAddOrganisasi.propTypes = {
  appTabAdd: PropTypes.any,
}

export default TabAddOrganisasi
