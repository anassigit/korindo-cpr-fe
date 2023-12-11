import {
  LOV_CANDIDATE,
  LOV_DEPT_LIST_ORG,
  LOV_LEVEL,
  LOV_POSITION_AND_LEVEL,
  MSG_LOV
} from "./actionTypes"

export const getCandidateLov = (resp) => ({
  type: LOV_CANDIDATE,
  payload: resp,
})

export const getLevelLov = (resp) => ({
  type: LOV_LEVEL,
  payload: resp,
})

export const getDeptListOrgLov = (req) => ({
  type: LOV_DEPT_LIST_ORG,
  payload: req,
})

export const getPositionAndLevelLov = (req) => ({
  type: LOV_POSITION_AND_LEVEL,
  payload: req,
})

export const msgLov = (resp) => ({
  type: MSG_LOV,
  payload: resp,
})




