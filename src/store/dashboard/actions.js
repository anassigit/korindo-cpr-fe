import { 
  ADD_PROJECT_LIST,
    ADD_SCHEDULE,
    GET_PROJECT_LIST, 
    MSGADD, 
    RESET_MESSAGE, 
    RESP_GET_PROJECT_LIST 
} from "./actionTypes"

export const msgAdd = resp => ({
    type: MSGADD,
    payload: resp,
  })

  export const resetMessage = (resp) => ({
    type: RESET_MESSAGE,
    payload: resp,
  })

export const getProjectListData = (req) => ({
    type: GET_PROJECT_LIST,
    payload: req,
})
  
export const respGetProjectList = resp => ({
  type: RESP_GET_PROJECT_LIST,
  payload: resp,
})

  export const addProjectList = (req) => ({
    type: ADD_PROJECT_LIST,
    payload: req,
  })

  export const AddScheduleAction = (req) => ({
    type: ADD_SCHEDULE,
    payload: req,
  })

