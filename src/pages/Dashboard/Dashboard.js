import React, { useState, useEffect } from "react";
import MetaTags from 'react-meta-tags';
import '../../config';
import BootstrapTable from "react-bootstrap-table-next";
import {
  Button,
  Container, UncontrolledAlert,
} from "reactstrap";
import TableCustom from "common/TableCustom";
import AddTask from "./AddTask";
import PropTypes from "prop-types"
import RootPageCustom from "common/RootPageCustom";
import { withTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import AddSchedule from "./AddSchedule";
import TableCustom2 from "common/TableCustom2";
import InformationDetail from "./InformationDetail";
import { getProjectListData } from "store/actions";
import "../../assets/scss/custom/table/TableCustom.css";

function Dashboard() {

  const dispatch = useDispatch()

  let role_id = localStorage.getItem('role_id')

  const [appDashboard, setAppDashboard] = useState(true);
  const [appDashboardMsg, setAppDashboardMsg] = useState("")
  const [appAddTask, setAppAddTask] = useState(false)
  const [appAddSchedule, setAppAddSchedule] = useState(false)
  const [appInformationDetail, setAppInformationDetail] = useState(false)
  const [searchVal, setSearchVal] = useState("")


  const appMessageAdd = useSelector(state => {
    return state.dashboardReducer.msgAdd
  })

  const appProjectListData = useSelector(state => {
    return state.dashboardReducer.respGetProjectList
  })

  useEffect(() => {
    console.log(appProjectListData?.data)
  }, [appProjectListData])

  const [appProjectTableSearch, setAppProjectTableSearch] = useState({
    page: 1,
    limit: 10,
    offset: 0,
    sort: "",
    order: "",
    search:
    {
        // roleId: role_id,
        search: searchVal,
    }
});

  const preAddAppTask = () => {
    setAppAddTask(true)
    setAppDashboard(false)
  }

  const preAddAppSchedule = () => {
    setAppAddSchedule(true)
    setAppDashboard(false)
  }

  const preInformationDetail = () => {
    setAppInformationDetail(true)
    setAppDashboard(false)
  }

  useEffect(() => {
    let messageToUpdate
    if (appMessageAdd.status === "1" || appMessageAdd.status === "0") {
      messageToUpdate = appMessageAdd
      if (appMessageAdd.status === "1") {
          setAppDashboard(true)
          setAppAddTask(false)
      }
      dispatch(getProjectListData(appProjectTableSearch))
      setAppDashboardMsg(messageToUpdate)
    }
    // if (messageToUpdate) {
    //   setLoadingSpinner(false)
    // }
  }, [appMessageAdd])

  const appDashboardColumn = [
    {
      dataField: "project_id",
      text: "No",
      sort: true,
      style: {textAlign: "center"},
      headerStyle: {textAlign: "center"},
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
      style: {textAlign: "center"},
      headerStyle: {textAlign: "center"},
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      style: {textAlign: "center"},
      headerStyle: {textAlign: "center"},
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      style: {textAlign: "center"},
      headerStyle: {textAlign: "center"},
    },
    {
      text: "Detail",
      style: { textAlign: "center", fontSize: "18px" },
      headerStyle: { textAlign: "center" },
      formatter: (cellContent, cellData) => {
        return (
          <span
            onClick={() => preInformationDetail(cellData)}
            className={"mdi mdi-text-box-outline text-primary"}
          />
        )
      },
    },
    {
      text: "Schedule",
      style: { textAlign: "center", fontSize: "18px" },
      headerStyle: { textAlign: "center" },
      formatter: (cellContent, cellData) => {
        return (
          <span
            onClick={() => preAddAppSchedule(cellData)}
            className={"mdi mdi-calendar-outline text-primary"}
          />
        )
      },
    },
    {
      text: "Result",
      style: { textAlign: "center", fontSize: "18px" },
      headerStyle: { textAlign: "center" },
      formatter: (cellContent, cellData) => {
        return (
          <Button onClick={() => preAddAppSchedule()}>Result</Button>
        )
      },
    },
  ]

  return (
    <RootPageCustom
      componentJsx={
        <>
          {appDashboardMsg !== "" ? (
            <UncontrolledAlert
              toggle={() => {
                setAppDashboardMsg("")
                setIsClosed(true)
              }}
              color={appDashboardMsg.status == "1" ? "success" : "danger"}
            >
              {typeof appDashboardMsg == "string"
                ? null
                : appDashboardMsg.message}
            </UncontrolledAlert>
          ) : null}
          <Container style={{display: appDashboard ? "block" : "none"}} fluid="true">
            <div>
              <TableCustom2
                keyField={"titleId"}
                columns={appDashboardColumn}
                redukResponse={appProjectListData}
                appdata={ appProjectListData?.data != null && appProjectListData?.data.list ? appProjectListData?.data.list : [] }
                appdataTotal={appProjectListData?.data != null ? appProjectListData?.data.count : 0}
                searchSet={setAppProjectTableSearch}
                searchGet={appProjectTableSearch}
                redukCall={getProjectListData}
              />
            </div>
              <div 
                className="col-12 pb-2" 
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "12px",
                  justifyContent: "right",
                  alignItems: "center"
                }}
              >
                {appProjectListData?.data?.rolemap?.create_task === true ? 
                <Button onClick={() => preAddAppTask()}>
                <span className="mdi mdi-plus"/>
                {"Create New Task"} 
              </Button>
              : null
              }
              
              </div>
          </Container>
          <AddTask
            appAddTask = {appAddTask}
            setAppAddTask = {setAppAddTask}
            setAppDashboard= {setAppDashboard}
          />
          <AddSchedule 
            appAddSchedule={appAddSchedule}
            setAppAddSchedule={setAppAddSchedule}
            setAppDashboard= {setAppDashboard}
          />
          <InformationDetail
            appInformationDetail={appInformationDetail}
            setAppInformationDetail={setAppInformationDetail}
            setAppDashboard= {setAppDashboard}
          />
        </>
      }
    />
  );
}

Dashboard.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  setAppAddTask: PropTypes.any,
  setAppDashboard: PropTypes.any,
  setAppAddSchedule: PropTypes.any,
  setAppInformationDetail: PropTypes.any,
}

export default withTranslation()(Dashboard);
