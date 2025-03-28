import {
  ADD_REPORT,
  GET_BEST_LIST,
  GET_BEST_OF_MONTH_LIST,
  GET_BEST_OF_YEAR_LIST,
  GET_DETAIL_INFLUENCER,
  GET_INFO,
  GET_INFO_PROFILE,
  GET_LIST1,
  GET_REPORT_LIST,
  MSG_ADD,
  RESET_MESSAGE,
  RESP_GET_BEST_LIST,
  RESP_GET_BEST_OF_MONTH_LIST,
  RESP_GET_BEST_OF_YEAR_LIST,
  RESP_GET_DETAIL_INFLUENCER,
  RESP_GET_INFO,
  RESP_GET_INFO_PROFILE,
  RESP_GET_LIST,
  RESP_GET_REPORT_LIST
} from "./actionTypes"

const INIT_STATE = {
  respGetInfoProfile: {},
  respGetList1: {},
  respGetBestList: {},
  respGetBestOfMonthList: {},
  respGetBestOfYearList: {},
  respGetDetailInfluencer: {},
  respGetReportList: {},
  msgAdd: "",
}

const dashboardReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    
    case GET_INFO_PROFILE:
      return {
        ...state,
      }
    case RESP_GET_INFO_PROFILE:
      return {
        ...state,
        respGetInfoProfile: action.payload,
      }

    case GET_LIST1:
      return {
        ...state,
      }
    case RESP_GET_LIST:
      return {
        ...state,
        respGetList1: action.payload,
      }
    case GET_INFO:
      return {
        ...state,
      }
    case RESP_GET_INFO:
      return {
        ...state,
        respGetInfo: action.payload,
      }
    case GET_BEST_LIST:
      return {
        ...state,
      }
    case RESP_GET_BEST_LIST:
      return {
        ...state,
        respGetBestList: action.payload,
      }
    case GET_BEST_OF_MONTH_LIST:
      return {
        ...state,
      }
    case RESP_GET_BEST_OF_MONTH_LIST:
      return {
        ...state,
        respGetBestOfMonthList: action.payload,
      }
    case GET_BEST_OF_YEAR_LIST:
      return {
        ...state,
      }
    case RESP_GET_BEST_OF_YEAR_LIST:
      return {
        ...state,
        respGetBestOfYearList: action.payload,
      }
    case GET_DETAIL_INFLUENCER:
      return {
        ...state,
      }
    case RESP_GET_DETAIL_INFLUENCER:
      return {
        ...state,
        respGetDetailInfluencer: action.payload,
      }
    case GET_REPORT_LIST:
      return {
        ...state,
      }
    case RESP_GET_REPORT_LIST:
      return {
        ...state,
        respGetReportList: action.payload,
      }
    case ADD_REPORT:
      return {
        ...state,
      }
    case MSG_ADD:
      return {
        ...state,
        msgAdd: action.payload,
      }
    case RESET_MESSAGE:
      return {
        ...state,
        respGetList1: {},
        respGetBestList: {},
        respGetBestOfMonthList: {},
        respGetBestOfYearList: {},
        respGetDetailInfluencer: {},
        respGetReportList: {},
        msgAdd: "",
      }
    default:
      return state
  }
}

export default dashboardReducer