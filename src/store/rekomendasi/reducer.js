import {
  ADD_RECOMMEND,
  DELETE_RECOMMEND,
  EDIT_RECOMMEND,
  GET_DEPT,
  GET_MEMBER_LIST,
  GET_RECOMMEND,
  GET_RECOMMEND_LIST,
  GET_SEARCH,
  GET_STICKER_LIST,
  MSG_ADD,
  MSG_DELETE,
  MSG_EDIT,
  RESET_MESSAGE,
  RESP_GET_DEPT,
  RESP_GET_MEMBER_LIST,
  RESP_GET_RECOMMEND,
  RESP_GET_RECOMMEND_LIST,
  RESP_GET_SEARCH,
  RESP_GET_STICKER_LIST,
  SUBMIT_RECOMMEND
} from "./actionTypes"

const INIT_STATE = {
  respGetDept: {},
  respGetMemberList: {},
  respGetSearch: {},
  respGetRecommendList: {},
  respGetRecommend: {},
  respGetStickerList: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
}

const rekomendasiReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_DEPT:
      return {
        ...state,
      }
    case RESP_GET_DEPT:
      return {
        ...state,
        respGetDept: action.payload,
      }
    case GET_MEMBER_LIST:
      return {
        ...state,
      }
    case RESP_GET_MEMBER_LIST:
      return {
        ...state,
        respGetMemberList: action.payload,
      }
    case GET_SEARCH:
      return {
        ...state,
      }
    case RESP_GET_SEARCH:
      return {
        ...state,
        respGetSearch: action.payload,
      }
    case GET_RECOMMEND_LIST:
      return {
        ...state,
      }
    case RESP_GET_RECOMMEND_LIST:
      return {
        ...state,
        respGetRecommendList: action.payload,
      }
    case GET_RECOMMEND:
      return {
        ...state,
      }
    case RESP_GET_RECOMMEND:
      return {
        ...state,
        respGetRecommend: action.payload,
      }
    case GET_STICKER_LIST:
      return {
        ...state,
      }
    case RESP_GET_STICKER_LIST:
      return {
        ...state,
        respGetStickerList: action.payload,
      }
    case ADD_RECOMMEND:
      return {
        ...state,
      }
    case EDIT_RECOMMEND:
      return {
        ...state,
      }
    case DELETE_RECOMMEND:
      return {
        ...state,
      }
    case SUBMIT_RECOMMEND:
      return {
        ...state,
      }
    case MSG_ADD:
      return {
        ...state,
        msgAdd: action.payload,
      }
    case MSG_EDIT:
      return {
        ...state,
        msgEdit: action.payload,
      }
    case MSG_DELETE:
      return {
        ...state,
        msgDelete: action.payload,
      }
    case RESET_MESSAGE:
      return {
        ...state,
        respGetDept: {},
        respGetMemberList: {},
        respGetSearch: {},
        respGetRecommendList: {},
        respGetRecommend: {},
        respGetStickerList: {},
        msgAdd: '',
        msgEdit: '',
        msgDelete: '',
      }
    default:
      return state
  }
}

export default rekomendasiReducer