import {
  GET_BEST_LIST,
  GET_BEST_OF_MONTH_LIST,
  GET_BEST_OF_YEAR_LIST,
  GET_DETAIL_INFLUENCER,
  GET_REPORT_LIST,
  RESP_GET_BEST_LIST,
  RESP_GET_BEST_OF_MONTH_LIST,
  RESP_GET_BEST_OF_YEAR_LIST,
  RESP_GET_DETAIL_INFLUENCER,
  RESP_GET_REPORT_LIST
} from "./actionTypes"

const INIT_STATE = {
  respGetBestList: {},
  respGetBestOfMonthList: {},
  respGetBestOfYearList:{},
  respGetDetailInfluencer:{},
  respGetReportList:{},
}

const dashboardReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
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
    default:
      return state
  }
}

export default dashboardReducer