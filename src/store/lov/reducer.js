<<<<<<< HEAD
import {
  LOV_CANDIDATE,
  LOV_DEPT_LIST_ORG,
  LOV_LEVEL,
  LOV_MEMBER_LIST,
  LOV_MENU_PARENT_LIST,
  LOV_MENU_ROLE_LIST,
  LOV_POSITION_AND_LEVEL,
  LOV_USER_ROLE_LIST,
  MSG_LOV
} from "./actionTypes"

const INIT_STATE = {
  resp: { data: [] },
}

const getLovData = (state = INIT_STATE, action) => {

  switch (action.type) {
    case LOV_CANDIDATE:
      return {
        ...state,
      }
    case LOV_LEVEL:
      return {
        ...state,
      }
    case LOV_DEPT_LIST_ORG:
      return {
        ...state,
      }
    case LOV_POSITION_AND_LEVEL:
      return {
        ...state,
      }
    case LOV_MENU_ROLE_LIST:
      return {
        ...state,
      }
    case LOV_USER_ROLE_LIST:
      return {
        ...state,
      }
    case LOV_MEMBER_LIST:
      return {
        ...state,
      }
    case LOV_MENU_PARENT_LIST:
      return {
        ...state,
      }
    case MSG_LOV:
      return {
        ...state,
        resp: action.payload,
      }
    default:
      return state
  }
}

=======
import {
  LOV_CANDIDATE,
  LOV_DEPT_LIST_ORG,
  LOV_LEVEL,
  LOV_MEMBER_LIST,
  LOV_MENU_PARENT_LIST,
  LOV_MENU_ROLE_LIST,
  LOV_POSITION_AND_LEVEL,
  LOV_USER_ROLE_LIST,
  MSG_LOV
} from "./actionTypes"

const INIT_STATE = {
  resp: { data: [] },
}

const getLovData = (state = INIT_STATE, action) => {

  switch (action.type) {
    case LOV_CANDIDATE:
      return {
        ...state,
      }
    case LOV_LEVEL:
      return {
        ...state,
      }
    case LOV_DEPT_LIST_ORG:
      return {
        ...state,
      }
    case LOV_POSITION_AND_LEVEL:
      return {
        ...state,
      }
    case LOV_MENU_ROLE_LIST:
      return {
        ...state,
      }
    case LOV_USER_ROLE_LIST:
      return {
        ...state,
      }
    case LOV_MEMBER_LIST:
      return {
        ...state,
      }
    case LOV_MENU_PARENT_LIST:
      return {
        ...state,
      }
    case MSG_LOV:
      return {
        ...state,
        resp: action.payload,
      }
    default:
      return state
  }
}

>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
export default getLovData