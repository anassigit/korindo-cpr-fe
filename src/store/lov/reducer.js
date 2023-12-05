import {
  LOV_CANDIDATE,
  LOV_DEPT_LIST_ORG,
  LOV_LEVEL,
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
    case MSG_LOV:
      return {
        ...state,
        resp: action.payload,
      }
    default:
      return state
  }
}

export default getLovData