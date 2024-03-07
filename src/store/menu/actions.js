import {
  GET_MENU,
  GET_PROJECT_LIST,
  MSGADD,
  RESET_MESSAGE,
  RESP_GET_MENU,
  RESP_GET_PROJECT_LIST
} from "./actionTypes"

export const getMenuData = (req) => ({
  type: GET_MENU,
  payload: req,
})

export const respGetMenu = resp => ({
  type: RESP_GET_MENU,
  payload: resp,

})
export const msgAdd = resp => ({
  type: MSGADD,
  payload: resp,
})

// export const resetMessage = (resp) => ({
//   type: RESET_MESSAGE,
//   payload: resp,
// })

export const getRankListData = (req) => ({
  type: GET_PROJECT_LIST,
  payload: req,
})

export const respGetRankList = resp => ({
  type: RESP_GET_PROJECT_LIST,
  payload: resp,
})