import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { UncontrolledTooltip } from 'reactstrap';
import TableCustomNoPage from 'common/TableCustomNoPage';
import { useSelector } from 'react-redux';
import { getPositionListDataAction } from 'store/actions';

const TabEditOrganisasi = (props) => {

  const appPositionListData = useSelector((state) => {
    return state.positionMasterReducer.respGetPositionList
  });

  const [appPositionTabelSearch, setAppPositionTabelSearch] = useState({
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

  const appPositionColumn = [
    {
      dataField: "positionCd",
      text: "Position Code",
      sort: true,
      style: { textAlign: 'center' },
      headerStyle: { textAlign: 'center' },
    },
    {
      dataField: "positionName",
      text: "Nama Position",
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
            <a id={`edit-${cellData.positionCd}`} className="mdi mdi-pencil text-primary" onClick={() => preEditEmployeeOf(cellData)} />
            <a id={`delete-${cellData.positionCd}`} className="mdi mdi-delete text-danger" onClick={() => toggleDeleteModal(cellData)} />
            <UncontrolledTooltip target={`edit-${cellData.positionCd}`}>Edit</UncontrolledTooltip>
            <UncontrolledTooltip target={`delete-${cellData.positionCd}`}>Delete</UncontrolledTooltip>
          </React.Fragment>
        )
      }
    },
  ]

  return (
    <div
      hidden={!props.appTabEdit}
    >

      <TableCustomNoPage
        keyField={"positionCd"}
        columns={appPositionColumn}
        redukResponse={appPositionListData}
        appdata={appPositionListData?.data != null && appPositionListData?.data.list ? appPositionListData?.data.list : []}
        appdataTotal={appPositionListData?.data != null ? appPositionListData?.data.count : 0}
        searchSet={setAppPositionTabelSearch}
        searchGet={appPositionTabelSearch}
        redukCall={getPositionListDataAction}
      />
    </div>
  )
}

TabEditOrganisasi.propTypes = {
  appTabEdit: PropTypes.any,
}

export default TabEditOrganisasi
