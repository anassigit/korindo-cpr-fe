import {
  DOWNLOAD_REKAP,
  GET_DEPT_REKAP,
  GET_LAPORAN_REKAP,
  GET_LOCATION_REKAP,
  RESET_MESSAGE,
  RESP_DOWNLOAD,
  RESP_GET_DEPT_REKAP,
  RESP_GET_LAPORAN_REKAP,
  RESP_GET_LOCATION_REKAP
} from "./actionTypes"

const INIT_STATE = {
  respGetLaporanRekap: {},
  respGetLocationRekap: {},
  respGetDeptRekap: {},
  respDownload: '',
}

const laporanRekapReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LAPORAN_REKAP:
      return {
        ...state,
      }
    case RESP_GET_LAPORAN_REKAP:
      return {
        ...state,
        respGetLaporanRekap: action.payload,
      }
    case GET_LOCATION_REKAP:
      return {
        ...state,
      }
    case RESP_GET_LOCATION_REKAP:
      return {
        ...state,
        respGetLocationRekap: action.payload,
      }
    case GET_DEPT_REKAP:
      return {
        ...state,
      }
    case RESP_GET_DEPT_REKAP:
      return {
        ...state,
        respGetDeptRekap: action.payload,
      }
    case DOWNLOAD_REKAP:
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

export default laporanRekapReducer