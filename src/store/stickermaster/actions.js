<<<<<<< HEAD
import {
  DELETE_STICKER,
  EDIT_STICKER,
  GET_STICKER,
  GET_LIST_STICKER2,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_STICKER,
  RESP_GET_STICKER_LIST2,
  SAVE_STICKER
} from "./actionTypes"

export const getStickerListDataAction2 = (req) => ({
  type: GET_LIST_STICKER2,
  payload: req,
})

export const respGetStickerList2 = resp => ({
  type: RESP_GET_STICKER_LIST2,
  payload: resp,
})

export const getStickerDataAction = (req) => ({
  type: GET_STICKER,
  payload: req,
})

export const respGetSticker = resp => ({
  type: RESP_GET_STICKER,
  payload: resp,
})

export const addStickerMaster = (req) => ({
  type: SAVE_STICKER,
  payload: req,
})

export const editStickerMaster = (req) => ({
  type: EDIT_STICKER,
  payload: req,
})

export const deleteStickerMaster = (req) => ({
  type: DELETE_STICKER,
  payload: req,
})

export const msgAdd = resp => ({
  type: MSG_ADD,
  payload: resp,
})

export const msgEdit = resp => ({
  type: MSG_EDIT,
  payload: resp,
})

export const msgDelete = resp => ({
  type: MSG_DELETE,
  payload: resp,
})

export const resetMessage = resp => ({
  type: RESET_MESSAGE,
  payload: resp,
=======
import {
  DELETE_STICKER,
  EDIT_STICKER,
  GET_STICKER,
  GET_LIST_STICKER2,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_STICKER,
  RESP_GET_STICKER_LIST2,
  SAVE_STICKER
} from "./actionTypes"

export const getStickerListDataAction2 = (req) => ({
  type: GET_LIST_STICKER2,
  payload: req,
})

export const respGetStickerList2 = resp => ({
  type: RESP_GET_STICKER_LIST2,
  payload: resp,
})

export const getStickerDataAction = (req) => ({
  type: GET_STICKER,
  payload: req,
})

export const respGetSticker = resp => ({
  type: RESP_GET_STICKER,
  payload: resp,
})

export const addStickerMaster = (req) => ({
  type: SAVE_STICKER,
  payload: req,
})

export const editStickerMaster = (req) => ({
  type: EDIT_STICKER,
  payload: req,
})

export const deleteStickerMaster = (req) => ({
  type: DELETE_STICKER,
  payload: req,
})

export const msgAdd = resp => ({
  type: MSG_ADD,
  payload: resp,
})

export const msgEdit = resp => ({
  type: MSG_EDIT,
  payload: resp,
})

export const msgDelete = resp => ({
  type: MSG_DELETE,
  payload: resp,
})

export const resetMessage = resp => ({
  type: RESET_MESSAGE,
  payload: resp,
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
})