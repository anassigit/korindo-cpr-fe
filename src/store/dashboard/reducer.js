import { 
  ADD_PROJECT_LIST,
    ADD_SCHEDULE,
    GET_PROJECT_LIST, 
    MSGADD, 
    RESET_MESSAGE, 
    RESP_GET_PROJECT_LIST
} from "./actionTypes"

const INIT_STATE = {
  respGetProjectList: {},
  msgAdd: "",
}

const dashboardReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case MSGADD:
      return {
        ...state,
        msgAdd: action.payload,
      }
    case RESET_MESSAGE:
      return {
        ...state,
        msgAdd: "",
        // msgEdit: "",
        // msgDelete: "",
      }
    case GET_PROJECT_LIST:
      return {
        ...state,
      }
    case RESP_GET_PROJECT_LIST:
      return {
        ...state,
        respGetProjectList: action.payload,
      }
    case ADD_PROJECT_LIST:
      return {
        ...state,
      }
    case ADD_SCHEDULE:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default dashboardReducer
