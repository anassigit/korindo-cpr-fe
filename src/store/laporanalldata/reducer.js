import {
  GET_LAPORAN_ALL_DATA,
  GET_LOCATION_ALL_DATA,
  RESET_MESSAGE,
  RESP_GET_LAPORAN_ALL_DATA,
  RESP_GET_LOCATION_ALL_DATA
} from "./actionTypes"

const INIT_STATE = {
  respGetLaporanAllData: {},
  respGetLocationAllData: {},
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
    case RESET_MESSAGE:
      return {
        ...state,
        // msgAdd: '',
        // msgEdit: '',
        // msgDelete: '',
      }
    default:
      return state
  }
}

export default laporanAllDataReducer