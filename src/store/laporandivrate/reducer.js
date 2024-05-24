import {
  DOWNLOAD_DIV_RATE,
  GET_DEPT_DIV_RATE,
  GET_LAPORAN_DIV_RATE,
  GET_LOCATION_DIV_RATE,
  RESET_MESSAGE,
  RESP_DOWNLOAD,
  RESP_GET_DEPT_DIV_RATE,
  RESP_GET_LAPORAN_DIV_RATE,
  RESP_GET_LOCATION_DIV_RATE
} from "./actionTypes"

const INIT_STATE = {
  respGetLaporanDivRate: {},
  respGetLocationDivRate: {},
  respGetDeptDivRate: {},
  respDownload: '',
}

const laporanDivRateReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LAPORAN_DIV_RATE:
      return {
        ...state,
      }
    case RESP_GET_LAPORAN_DIV_RATE:
      return {
        ...state,
        respGetLaporanDivRate: action.payload,
      }
    case GET_LOCATION_DIV_RATE:
      return {
        ...state,
      }
    case RESP_GET_LOCATION_DIV_RATE:
      return {
        ...state,
        respGetLocationDivRate: action.payload,
      }
    case GET_DEPT_DIV_RATE:
      return {
        ...state,
      }
    case RESP_GET_DEPT_DIV_RATE:
      return {
        ...state,
        respGetDeptDivRate: action.payload,
      }
    case DOWNLOAD_DIV_RATE:
      return {
        ...state,
      }
    case RESP_DOWNLOAD:
      return {
        ...state,
        respDownload: action.payload,
      }
    case RESET_MESSAGE:
      return {
        ...state,
        respDownload: '',
        // msgAdd: '',
        // msgEdit: '',
        // msgDelete: '',
      }
    default:
      return state
  }
}

export default laporanDivRateReducer