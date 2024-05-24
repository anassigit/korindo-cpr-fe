<<<<<<< HEAD
import {
  GET_MANUAL_PDF,
  GET_MANUAL_VIDEO,
  RESP_GET_MANUAL_PDF,
  RESP_GET_MANUAL_VIDEO
} from "./actionTypes"

export const getManualPDFData = (req) => ({
  type: GET_MANUAL_PDF,
  payload: req,
})

export const respGetManualPDF = resp => ({
  type: RESP_GET_MANUAL_PDF,
  payload: resp,
})

export const getManualVideoData = (req) => ({
  type: GET_MANUAL_VIDEO,
  payload: req,
})

export const respGetManualVideo = resp => ({
  type: RESP_GET_MANUAL_VIDEO,
  payload: resp,
})
=======
import {
  GET_MANUAL_PDF,
  GET_MANUAL_VIDEO,
  RESP_GET_MANUAL_PDF,
  RESP_GET_MANUAL_VIDEO
} from "./actionTypes"

export const getManualPDFData = (req) => ({
  type: GET_MANUAL_PDF,
  payload: req,
})

export const respGetManualPDF = resp => ({
  type: RESP_GET_MANUAL_PDF,
  payload: resp,
})

export const getManualVideoData = (req) => ({
  type: GET_MANUAL_VIDEO,
  payload: req,
})

export const respGetManualVideo = resp => ({
  type: RESP_GET_MANUAL_VIDEO,
  payload: resp,
})
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
