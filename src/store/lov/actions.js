import {
  LOV_CANDIDATE,
  LOV_DEPT_LIST_ORG,
  LOV_LEVEL,
  LOV_MEMBER_LIST,
  LOV_MENU_ROLE_LIST,
  LOV_POSITION_AND_LEVEL,
  LOV_USER_ROLE_LIST,
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

export const getMenuRoleLov = (req) => ({
  type: LOV_MENU_ROLE_LIST,
  payload: req,
})

export const getUserRoleLov = (req) => ({
  type: LOV_USER_ROLE_LIST,
  payload: req,
})

export const getMemberListLov = (req) => ({
  type: LOV_MEMBER_LIST,
  payload: req,
})

export const msgLov = (resp) => ({
  type: MSG_LOV,
  payload: resp,
})




