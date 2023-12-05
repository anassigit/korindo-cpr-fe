import {
  GET_DEPT_LIST_ORG,
  GET_ORGANIZATION_LIST,
  MSG_ADD,
  RESET_MESSAGE,
  RESP_GET_DEPT_LIST_ORG,
  RESP_GET_ORGANIZATION_LIST,
  SAVE_MAPPING_DEPT
} from "./actionTypes"

export const getDeptListOrg = resp => ({
  type: GET_DEPT_LIST_ORG,
  payload: resp,
})

export const respGetDeptListOrg = resp => ({
  type: RESP_GET_DEPT_LIST_ORG,
  payload: resp,
})

export const getOrganizationListData = (req) => ({
  type: GET_ORGANIZATION_LIST,
  payload: req,
})

export const respGetOrganizationList = resp => ({
  type: RESP_GET_ORGANIZATION_LIST,
  payload: resp,
})

export const saveMappingDept = (req) => ({
  type: SAVE_MAPPING_DEPT,
  payload: req,
})

// export const respGetSearch = resp => ({
//   type: RESP_GET_SEARCH,
//   payload: resp,
// })

// export const getRecommendListData = (req) => ({
//   type: GET_RECOMMEND_LIST,
//   payload: req,
// })

// export const respGetRecommendList = resp => ({
//   type: RESP_GET_RECOMMEND_LIST,
//   payload: resp,
// })

// export const getRecommendData = (req) => ({
//   type: GET_RECOMMEND,
//   payload: req,
// })

// export const respGetRecommend = resp => ({
//   type: RESP_GET_RECOMMEND,
//   payload: resp,
// })

// export const getStickerListData = (req) => ({
//   type: GET_STICKER_LIST,
//   payload: req,
// })

// export const respGetStickerList = resp => ({
//   type: RESP_GET_STICKER_LIST,
//   payload: resp,
// })

// export const addRecommend = resp => ({
//   type: ADD_RECOMMEND,
//   payload: resp,
// })

// export const editRecommend = resp => ({
//   type: EDIT_RECOMMEND,
//   payload: resp,
// })

// export const deleteRecommend = resp => ({
//   type: DELETE_RECOMMEND,
//   payload: resp,
// })

// export const submitRecommend = resp => ({
//   type: SUBMIT_RECOMMEND,
//   payload: resp,
// })

export const msgAdd = resp => ({
  type: MSG_ADD,
  payload: resp,
})

// export const msgEdit = resp => ({
//   type: MSG_EDIT,
//   payload: resp,
// })

// export const msgDelete = resp => ({
//   type: MSG_DELETE,
//   payload: resp,
// })

export const resetMessage = (resp) => ({
  type: RESET_MESSAGE,
  payload: resp,
})