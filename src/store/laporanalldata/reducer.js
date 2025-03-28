import {
  DOWNLOAD_ALL_DATA,
  GET_DEPT_ALL_DATA,
  GET_LAPORAN_ALL_DATA,
  GET_LOCATION_ALL_DATA,
  RESET_MESSAGE,
  RESP_DOWNLOAD,
  RESP_GET_DEPT_ALL_DATA,
  RESP_GET_LAPORAN_ALL_DATA,
  RESP_GET_LOCATION_ALL_DATA
} from "./actionTypes"

const INIT_STATE = {
  respGetLaporanAllData: {},
  respGetLocationAllData: {},
  respGetDeptAllData: {},
  respDownload: '',
}

const laporanAllDataReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LAPORAN_ALL_DATA:
      return {
        ...state,
      }
    case RESP_GET_LAPORAN_ALL_DATA:
      return {
        ...state,
        respGetLaporanAllData: action.payload,
      }
    case GET_LOCATION_ALL_DATA:
      return {
        ...state,
      }
    case RESP_GET_LOCATION_ALL_DATA:
      return {
        ...state,
        respGetLocationAllData: action.payload,
      }
    case GET_DEPT_ALL_DATA:
      return {
        ...state,
      }
    case RESP_GET_DEPT_ALL_DATA:
      return {
        ...state,
        respGetDeptAllData: action.payload,
      }
    case DOWNLOAD_ALL_DATA:
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

export default laporanAllDataReducer