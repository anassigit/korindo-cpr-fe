import {
  GET_COMBO,
  MSG_COMBO_GYS_AREA_TYPE,
  MSG_COMBO_ROLE_AKSES_TYPE,
  MSG_COMBO_SATUAN,
  MSG_COMBO_SATUAN_MATERIAL,
  MSG_COMBO_TYPE,
  MSG_COMBO_JENIS_APPROVAL,
  MSG_COMBO_FREM,
  MSG_COMBO_JENIS_FREM,
  MSG_COMBO_PACKINGAN,
  MSG_COMBO_JENIS_PACKINGAN,
  MSG_COMBO_ADJUST_BIBIT,
  MSG_COMBO_KATEGORI_RUMUS_TEGAKAN,
  MSG_COMBO_SEND_EMAIL

} from "./actionTypes"

const INIT_STATE = {
  respGysAreaType: {},
  respRoleAksesType: {},
  respSatuan: {},
  respSatuanMaterial: {},
  respType: {},
  respJenisApproval: {},
  respFrem: {},
  respJenisFrem: {},
  respPackingan: {},
  respJenisPackingan: {},
  respAdjustBibit: {},
  respKategoriRumusTegakan: {},
  respJenisEmail: {},
}

const getComboData = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_COMBO:
      return {
        ...state,
      }
    case MSG_COMBO_GYS_AREA_TYPE:
      return {
        ...state,
        respGysAreaType: action.payload,
      }
    case MSG_COMBO_ROLE_AKSES_TYPE:
      return {
        ...state,
        respRoleAksesType: action.payload,
      }
    case MSG_COMBO_SATUAN:
      return {
        ...state,
        respSatuan: action.payload,
      }
    case MSG_COMBO_SATUAN_MATERIAL:
      return {
        ...state,
        respSatuanMaterial: action.payload,
      }
    case MSG_COMBO_TYPE:
      return {
        ...state,
        respType: action.payload,
      }
    case MSG_COMBO_JENIS_APPROVAL:
      return {
        ...state,
        respJenisApproval: action.payload,
      }
    case MSG_COMBO_FREM:
      return {
        ...state,
        respFrem: action.payload,
      }
    case MSG_COMBO_JENIS_FREM:
      return {
        ...state,
        respJenisFrem: action.payload,
      }
    case MSG_COMBO_PACKINGAN:
      return {
        ...state,
        respPackingan: action.payload,
      }
    case MSG_COMBO_JENIS_PACKINGAN:
      return {
        ...state,
        respJenisPackingan: action.payload,
      }
    case MSG_COMBO_ADJUST_BIBIT:
      return {
        ...state,
        respAdjustBibit: action.payload,
      }
      case MSG_COMBO_KATEGORI_RUMUS_TEGAKAN:
      return {
        ...state,
        respKategoriRumusTegakan: action.payload,
      }
      case MSG_COMBO_SEND_EMAIL:
        return {
          ...state,
          respJenisEmail: action.payload,
        }
    default:
      return state
  }
}

export default getComboData