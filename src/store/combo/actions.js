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


export const getCombo = req => ({
  type: GET_COMBO,
  payload: req,
})

export const msgComboGysAreaType = (resp) => ({
  type: MSG_COMBO_GYS_AREA_TYPE,
  payload: resp,
})

export const msgComboRoleAksesType = (resp) => ({
  type: MSG_COMBO_ROLE_AKSES_TYPE,
  payload: resp,
})

export const msgComboSatuan = (resp) => ({
  type: MSG_COMBO_SATUAN,
  payload: resp,
})

export const msgComboSatMaterial = (resp) => ({
  type: MSG_COMBO_SATUAN_MATERIAL,
  payload: resp,
})

export const msgComboType = (resp) => ({
  type: MSG_COMBO_TYPE,
  payload: resp,
})

export const msgComboJenisApproval = (resp) => ({
  type: MSG_COMBO_JENIS_APPROVAL,
  payload: resp,
})

export const msgComboFrem = (resp) => ({
  type: MSG_COMBO_FREM,
  payload: resp,
})

export const msgComboJenisFrem = (resp) => ({
  type: MSG_COMBO_JENIS_FREM,
  payload: resp,
})

export const msgComboPackingan = (resp) => ({
  type: MSG_COMBO_PACKINGAN,
  payload: resp,
})

export const msgComboJenisPackingan = (resp) => ({
  type: MSG_COMBO_JENIS_PACKINGAN,
  payload: resp,
})

export const msgComboAdjustBibit = (resp) => ({
  type: MSG_COMBO_ADJUST_BIBIT,
  payload: resp,
})

export const msgComboKategoriRumusTegakan = (resp) => ({
  type: MSG_COMBO_KATEGORI_RUMUS_TEGAKAN,
  payload: resp,
})

export const msgComboJenisEmail = (resp) => ({
  type: MSG_COMBO_SEND_EMAIL,
  payload: resp,
})


