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

const INIT_STATE = {
  respGetStickerList2: {},
  respGetSticker: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
}

const stickerMasterReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LIST_STICKER2:
      return {
        ...state,
      }
    case RESP_GET_STICKER_LIST2:
      return {
        ...state,
        respGetStickerList2: action.payload,
      }
    case GET_STICKER:
      return {
        ...state,
      }
    case RESP_GET_STICKER:
      return {
        ...state,
        respGetSticker: action.payload,
      }
    case SAVE_STICKER:
      return {
        ...state,
      }
    case EDIT_STICKER:
      return {
        ...state,
      }
    case DELETE_STICKER:
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
        msgAdd: '',
        msgEdit: '',
        msgDelete: '',
      }
    default:
      return state
  }
}

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

const INIT_STATE = {
  respGetStickerList2: {},
  respGetSticker: {},
  msgAdd: '',
  msgEdit: '',
  msgDelete: '',
}

const stickerMasterReducer = (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_LIST_STICKER2:
      return {
        ...state,
      }
    case RESP_GET_STICKER_LIST2:
      return {
        ...state,
        respGetStickerList2: action.payload,
      }
    case GET_STICKER:
      return {
        ...state,
      }
    case RESP_GET_STICKER:
      return {
        ...state,
        respGetSticker: action.payload,
      }
    case SAVE_STICKER:
      return {
        ...state,
      }
    case EDIT_STICKER:
      return {
        ...state,
      }
    case DELETE_STICKER:
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
        msgAdd: '',
        msgEdit: '',
        msgDelete: '',
      }
    default:
      return state
  }
}

>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
export default stickerMasterReducer