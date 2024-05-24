<<<<<<< HEAD
import {
  DELETE_MAPPING_DEPT,
  DELETE_MAPPING_MEMBER,
  EDIT_MAPPING_DEPT,
  EDIT_MAPPING_MEMBER,
  GET_DEPT_LIST_ORG,
  GET_MEMBER_LIST_FOR_ADD,
  GET_MEMBER_LIST_ORG,
  GET_ORGANIZATION_LIST,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_DEPT_LIST_ORG,
  RESP_GET_MEMBER_LIST_FOR_ADD,
  RESP_GET_MEMBER_LIST_ORG,
  RESP_GET_ORGANIZATION_LIST,
  SAVE_MAPPING_DEPT,
  SAVE_MAPPING_MEMBER,
  RESET_SCORE_ORGANIZATION,
  RESP_RESET_SCORE_ORGANIZATION
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

export const getMemberListOrgData = (req) => ({
  type: GET_MEMBER_LIST_ORG,
  payload: req,
})

export const respGetMemberListOrg = resp => ({
  type: RESP_GET_MEMBER_LIST_ORG,
  payload: resp,
})

export const getMemberListForAdd = (req) => ({
  type: GET_MEMBER_LIST_FOR_ADD,
  payload: req,
})

export const respGetMemberListForAdd = resp => ({
  type: RESP_GET_MEMBER_LIST_FOR_ADD,
  payload: resp,
})

export const resetScoreOrganization = (req) => ({
  type: RESET_SCORE_ORGANIZATION,
  payload: req,
})

export const respResetScoreOrganization = resp => ({
  type: RESP_RESET_SCORE_ORGANIZATION,
  payload: resp,
})

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

export const saveMappingDept = (req) => ({
  type: SAVE_MAPPING_DEPT,
  payload: req,
})

export const saveMappingMember = (req) => ({
  type: SAVE_MAPPING_MEMBER,
  payload: req,
})

export const editMappingDept = resp => ({
  type: EDIT_MAPPING_DEPT,
  payload: resp,
})

export const editMappingMember = resp => ({
  type: EDIT_MAPPING_MEMBER,
  payload: resp,
})

export const deleteMappingDept = resp => ({
  type: DELETE_MAPPING_DEPT,
  payload: resp,
})

export const deleteMappingMember = resp => ({
  type: DELETE_MAPPING_MEMBER,
  payload: resp,
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

export const resetMessage = (resp) => ({
  type: RESET_MESSAGE,
  payload: resp,
=======
import {
  DELETE_MAPPING_DEPT,
  DELETE_MAPPING_MEMBER,
  EDIT_MAPPING_DEPT,
  EDIT_MAPPING_MEMBER,
  GET_DEPT_LIST_ORG,
  GET_MEMBER_LIST_FOR_ADD,
  GET_MEMBER_LIST_ORG,
  GET_ORGANIZATION_LIST,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_DEPT_LIST_ORG,
  RESP_GET_MEMBER_LIST_FOR_ADD,
  RESP_GET_MEMBER_LIST_ORG,
  RESP_GET_ORGANIZATION_LIST,
  SAVE_MAPPING_DEPT,
  SAVE_MAPPING_MEMBER,
  RESET_SCORE_ORGANIZATION,
  RESP_RESET_SCORE_ORGANIZATION
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

export const getMemberListOrgData = (req) => ({
  type: GET_MEMBER_LIST_ORG,
  payload: req,
})

export const respGetMemberListOrg = resp => ({
  type: RESP_GET_MEMBER_LIST_ORG,
  payload: resp,
})

export const getMemberListForAdd = (req) => ({
  type: GET_MEMBER_LIST_FOR_ADD,
  payload: req,
})

export const respGetMemberListForAdd = resp => ({
  type: RESP_GET_MEMBER_LIST_FOR_ADD,
  payload: resp,
})

export const resetScoreOrganization = (req) => ({
  type: RESET_SCORE_ORGANIZATION,
  payload: req,
})

export const respResetScoreOrganization = resp => ({
  type: RESP_RESET_SCORE_ORGANIZATION,
  payload: resp,
})

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

export const saveMappingDept = (req) => ({
  type: SAVE_MAPPING_DEPT,
  payload: req,
})

export const saveMappingMember = (req) => ({
  type: SAVE_MAPPING_MEMBER,
  payload: req,
})

export const editMappingDept = resp => ({
  type: EDIT_MAPPING_DEPT,
  payload: resp,
})

export const editMappingMember = resp => ({
  type: EDIT_MAPPING_MEMBER,
  payload: resp,
})

export const deleteMappingDept = resp => ({
  type: DELETE_MAPPING_DEPT,
  payload: resp,
})

export const deleteMappingMember = resp => ({
  type: DELETE_MAPPING_MEMBER,
  payload: resp,
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

export const resetMessage = (resp) => ({
  type: RESET_MESSAGE,
  payload: resp,
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
})